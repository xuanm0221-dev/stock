import yahooFinance from 'yahoo-finance2';
import { TICKERS, toYahooSymbol } from './tickers';

// 야후 검증/설문 알림 억제 (개별 종목은 try/catch 로 폴백)
try {
  yahooFinance.suppressNotices(['yahooSurvey', 'ripHistorical']);
} catch (e) {}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}
function labelKo(d) {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 종가`;
}
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * chart 는 crumb 이 필요 없어 429(rate-limit)에 강함.
 * 가장 최근 거래일(전일) 종가 + 최근 1년 배당합계를 한 번에 얻는다.
 */
async function chartOnce(symbol) {
  const period2 = new Date();
  const period1 = new Date();
  period1.setDate(period1.getDate() - 380); // 배당 TTM 용 1년치 이상

  const res = await yahooFinance.chart(symbol, {
    period1,
    period2,
    interval: '1d',
    events: 'dividends',
  });

  // 가장 최근 거래일(전일) 종가
  const quotes = (res && res.quotes) || [];
  const valid = quotes.filter((q) => q && q.close != null && q.close > 0);
  const last = valid.length ? valid[valid.length - 1] : null;
  const price = last ? last.close : null;
  const priceDate = last && last.date ? new Date(last.date) : null;

  // 최근 1년 배당 합계 (연 배당금 근사)
  let divArr = [];
  const ev = res && res.events && res.events.dividends;
  if (Array.isArray(ev)) divArr = ev;
  else if (ev && typeof ev === 'object') divArr = Object.values(ev);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  let dps = 0;
  let divCount = 0;
  for (const e of divArr) {
    const amt = e && (e.amount != null ? e.amount : e.dividends);
    const when = e && e.date ? new Date(e.date) : null;
    if (typeof amt === 'number' && amt > 0 && (!when || when >= oneYearAgo)) {
      dps += amt;
      divCount += 1;
    }
  }

  return { price, priceDate, dps, divCount };
}

async function fetchSymbol(symbol, retries = 3) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await chartOnce(symbol);
    } catch (e) {
      const msg = String((e && e.message) || e);
      if (i === retries) {
        console.warn(`chart failed ${symbol}: ${msg.slice(0, 60)}`);
        return null;
      }
      await sleep(600 * (i + 1) + Math.floor(Math.random() * 400));
    }
  }
  return null;
}

/**
 * 전체 종목 실시간 값 (전일 종가).
 * @returns {{ asof:string, asofLabel:string, fx:number|null, prices:Record<string,{price?:number,dps?:number}> }}
 */
export async function getLiveStocks() {
  const prices = {};
  let latest = null; // 최근 거래일(라벨용)

  for (const batch of chunk(TICKERS, 6)) {
    await Promise.all(
      batch.map(async (t) => {
        const r = await fetchSymbol(toYahooSymbol(t));
        if (!r) return;
        const rec = {};
        if (typeof r.price === 'number' && r.price > 0) rec.price = r.price;
        // 배당 이벤트를 실제로 찾았을 때만 덮어씀(없으면 내장 기준값 유지)
        if (r.divCount > 0 && r.dps > 0) rec.dps = r.dps;
        if (r.priceDate && (!latest || r.priceDate > latest)) latest = r.priceDate;
        if (Object.keys(rec).length) prices[t.ticker] = rec;
      })
    );
  }

  // 원/달러 환율도 chart 로
  let fx = null;
  try {
    const r = await fetchSymbol('USDKRW=X', 2);
    if (r && typeof r.price === 'number' && r.price > 0) fx = r.price;
  } catch (e) {}

  const asofDate = latest || new Date();
  return {
    asof: ymd(asofDate),
    asofLabel: labelKo(asofDate),
    fx,
    prices,
  };
}

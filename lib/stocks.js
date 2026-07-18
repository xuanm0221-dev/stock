import yahooFinance from 'yahoo-finance2';
import { TICKERS, toYahooSymbol } from './tickers';

// 야후 검증/설문 알림 억제 (개별 종목은 try/catch 로 폴백)
try {
  yahooFinance.suppressNotices(['yahooSurvey', 'ripHistorical']);
} catch (e) {}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 오늘 기준 '가장 최근에 지나간 금요일'(오늘이 금요일이면 지난주 금요일) */
export function refFriday(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  do {
    d.setDate(d.getDate() - 1);
  } while (d.getDay() !== 5); // 5 = 금요일
  return d;
}

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}
function labelKo(d) {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일(금) 종가`;
}
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * chart 는 crumb 이 필요 없어 429(rate-limit)에 가장 강함.
 * 지난 금요일 종가 + 최근 1년 배당합계를 한 번의 호출로 얻는다.
 * 429 등 실패 시 짧은 백오프로 재시도.
 */
async function chartOnce(symbol, friday) {
  const period1 = new Date(friday);
  period1.setFullYear(period1.getFullYear() - 1); // 배당 TTM 용 1년치
  const period2 = new Date(friday);
  period2.setDate(period2.getDate() + 1); // 금요일 포함

  const res = await yahooFinance.chart(symbol, {
    period1,
    period2,
    interval: '1d',
    events: 'dividends',
  });

  // 지난 금요일(또는 그 이전 마지막 거래일) 종가
  const quotes = (res && res.quotes) || [];
  const valid = quotes.filter((q) => q && q.close != null && q.close > 0);
  const price = valid.length ? valid[valid.length - 1].close : null;

  // 최근 1년 배당 합계 (연 배당금 근사)
  let divArr = [];
  const ev = res && res.events && res.events.dividends;
  if (Array.isArray(ev)) divArr = ev;
  else if (ev && typeof ev === 'object') divArr = Object.values(ev);
  const oneYearAgo = new Date(friday);
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

  return { price, dps, divCount };
}

async function fetchSymbol(symbol, friday, retries = 3) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await chartOnce(symbol, friday);
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
 * 전체 종목 실시간 값.
 * @returns {{ asof:string, asofLabel:string, fx:number|null, prices:Record<string,{price?:number,dps?:number}> }}
 */
export async function getLiveStocks() {
  const friday = refFriday();
  const prices = {};

  // 종목: chart 만 사용 (동시성 6)
  for (const batch of chunk(TICKERS, 6)) {
    await Promise.all(
      batch.map(async (t) => {
        const r = await fetchSymbol(toYahooSymbol(t), friday);
        if (!r) return;
        const rec = {};
        if (typeof r.price === 'number' && r.price > 0) rec.price = r.price;
        // 배당 이벤트를 실제로 찾았을 때만 덮어씀(없으면 내장 기준값 유지)
        if (r.divCount > 0 && r.dps > 0) rec.dps = r.dps;
        if (Object.keys(rec).length) prices[t.ticker] = rec;
      })
    );
  }

  // 원/달러 환율도 chart 로
  let fx = null;
  try {
    const r = await fetchSymbol('USDKRW=X', friday, 2);
    if (r && typeof r.price === 'number' && r.price > 0) fx = r.price;
  } catch (e) {}

  return {
    asof: ymd(friday),
    asofLabel: labelKo(friday),
    fx,
    prices,
  };
}

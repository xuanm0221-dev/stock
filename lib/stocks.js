import { TICKERS } from './tickers';

// 네이버 증권 시세 (무료·키 불필요). 야후와 달리 데이터센터 IP에서도 잘 응답.
// - 국내: polling.finance.naver.com/api/realtime/domestic/stock/{6자리}
// - 미국: polling.finance.naver.com/api/realtime/worldstock/stock/{reutersCode}
// - 환율: m.stock.naver.com/front-api/marketIndex/productDetail (FX_USDKRW)
// 배당(dps)은 네이버에서 안 받고 내장 기준값 유지(연 1회 수준으로 거의 안 변함).

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; StockDashboard/1.0)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function toNum(s) {
  const n = Number(String(s == null ? '' : s).replace(/[^0-9.\-]/g, ''));
  return isFinite(n) ? n : null;
}
function todayYmd() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}
function labelKo(s) {
  const p = String(s).split('-');
  return `${Number(p[0])}년 ${Number(p[1])}월 ${Number(p[2])}일 종가`;
}
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function getJson(url) {
  const res = await fetch(url, { headers: UA, cache: 'no-store' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

/** 종목 1개의 전일(최근 거래일) 종가 + 거래일 */
async function fetchQuote(t, retries = 2) {
  const url =
    t.market === 'US'
      ? `https://polling.finance.naver.com/api/realtime/worldstock/stock/${t.naver}`
      : `https://polling.finance.naver.com/api/realtime/domestic/stock/${t.ticker}`;
  for (let i = 0; i <= retries; i++) {
    try {
      const j = await getJson(url);
      const d = j && j.datas && j.datas[0];
      if (!d) return null;
      const price = toNum(d.closePrice);
      // 타임존 변환 없이 거래일(YYYY-MM-DD)만 추출
      const date =
        typeof d.localTradedAt === 'string' ? d.localTradedAt.slice(0, 10) : null;
      return price && price > 0 ? { price, date } : null;
    } catch (e) {
      if (i === retries) {
        console.warn(`naver quote failed ${t.ticker}: ${String(e && e.message).slice(0, 50)}`);
        return null;
      }
      await sleep(400 * (i + 1) + Math.floor(Math.random() * 300));
    }
  }
  return null;
}

async function fetchFx() {
  try {
    const j = await getJson(
      'https://m.stock.naver.com/front-api/marketIndex/productDetail?category=exchange&reutersCode=FX_USDKRW'
    );
    const r = j && j.result;
    const v = toNum(r && (r.closePrice || r.calcPrice));
    return v && v > 0 ? v : null;
  } catch (e) {
    return null;
  }
}

/**
 * 전체 종목 실시간 값 (전일 종가). dps 는 반환하지 않음 → 프런트가 내장 기준값 유지.
 * @returns {{ asof:string, asofLabel:string, fx:number|null, prices:Record<string,{price:number}> }}
 */
export async function getLiveStocks() {
  const prices = {};
  let latest = null;

  for (const batch of chunk(TICKERS, 8)) {
    await Promise.all(
      batch.map(async (t) => {
        const q = await fetchQuote(t);
        if (!q) return;
        prices[t.ticker] = { price: q.price };
        if (q.date && (!latest || q.date > latest)) latest = q.date;
      })
    );
  }

  const fx = await fetchFx();
  const asof = latest || todayYmd();
  return {
    asof,
    asofLabel: labelKo(asof),
    fx,
    prices,
  };
}

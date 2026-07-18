// 대시보드에 표시되는 전체 종목. 여기 티커가 원본 DATA 의 ticker 와 1:1로 맞아야
// 실시간 price/dps 가 정확히 덮어써집니다. (한국 6자리 숫자 → 야후 심볼 '.KS')
export const TICKERS = [
  // ---- 한국 주식 ----
  { ticker: '316140', market: 'KR' }, // 우리금융지주
  { ticker: '024110', market: 'KR' }, // 기업은행
  { ticker: '086790', market: 'KR' }, // 하나금융지주
  { ticker: '105560', market: 'KR' }, // KB금융
  { ticker: '055550', market: 'KR' }, // 신한지주
  { ticker: '017670', market: 'KR' }, // SK텔레콤
  { ticker: '033780', market: 'KR' }, // KT&G
  { ticker: '005930', market: 'KR' }, // 삼성전자
  { ticker: '000660', market: 'KR' }, // SK하이닉스
  { ticker: '005380', market: 'KR' }, // 현대차
  { ticker: '005490', market: 'KR' }, // POSCO홀딩스
  { ticker: '000810', market: 'KR' }, // 삼성화재
  { ticker: '088980', market: 'KR' }, // 맥쿼리인프라
  { ticker: '330590', market: 'KR' }, // 롯데리츠

  // ---- 한국 상장 ETF ----
  { ticker: '360750', market: 'KR' }, // TIGER 미국S&P500
  { ticker: '133690', market: 'KR' }, // TIGER 미국나스닥100
  { ticker: '458730', market: 'KR' }, // TIGER 미국배당다우존스
  { ticker: '446720', market: 'KR' }, // SOL 미국배당다우존스
  { ticker: '402970', market: 'KR' }, // ACE 미국배당다우존스
  { ticker: '490080', market: 'KR' }, // TIGER 코리아배당다우존스
  { ticker: '329200', market: 'KR' }, // TIGER 리츠부동산인프라
  { ticker: '458760', market: 'KR' }, // TIGER 미국배당+7%프리미엄
  { ticker: '486290', market: 'KR' }, // TIGER 나스닥100 데일리커버드콜

  // ---- 미국 배당주 ----
  { ticker: 'O', market: 'US' },
  { ticker: 'MO', market: 'US' },
  { ticker: 'VZ', market: 'US' },
  { ticker: 'PFE', market: 'US' },
  { ticker: 'T', market: 'US' },
  { ticker: 'XOM', market: 'US' },
  { ticker: 'PEP', market: 'US' },
  { ticker: 'KO', market: 'US' },
  { ticker: 'JNJ', market: 'US' },
  { ticker: 'PG', market: 'US' },

  // ---- 미국 대형 우량·성장주 ----
  { ticker: 'AAPL', market: 'US' },
  { ticker: 'MSFT', market: 'US' },
  { ticker: 'GOOGL', market: 'US' },
  { ticker: 'AVGO', market: 'US' },
  { ticker: 'LLY', market: 'US' },
  { ticker: 'META', market: 'US' },
  { ticker: 'NVDA', market: 'US' },
  { ticker: 'TSLA', market: 'US' },
  { ticker: 'AMZN', market: 'US' },

  // ---- 미국 상장 ETF ----
  { ticker: 'VOO', market: 'US' },
  { ticker: 'QQQ', market: 'US' },
  { ticker: 'SCHD', market: 'US' },
  { ticker: 'VYM', market: 'US' },
  { ticker: 'DGRO', market: 'US' },
  { ticker: 'JEPI', market: 'US' },
  { ticker: 'JEPQ', market: 'US' },
  { ticker: 'SPYI', market: 'US' },
  { ticker: 'QYLD', market: 'US' },
];

// 티커 → 야후 파이낸스 심볼
export function toYahooSymbol({ ticker, market }) {
  return market === 'KR' ? `${ticker}.KS` : ticker;
}

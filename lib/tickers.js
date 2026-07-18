// 대시보드에 표시되는 전체 종목. 여기 ticker 가 원본 DATA 의 ticker 와 1:1로 맞아야
// 실시간 price 가 정확히 덮어써집니다.
// - 한국(KR): 6자리 코드 그대로 네이버 국내 시세 조회
// - 미국(US): naver = 네이버 worldstock reutersCode (거래소별 접미사 .O/.K 등)
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
  { ticker: 'O', market: 'US', naver: 'O' },
  { ticker: 'MO', market: 'US', naver: 'MO' },
  { ticker: 'VZ', market: 'US', naver: 'VZ' },
  { ticker: 'PFE', market: 'US', naver: 'PFE' },
  { ticker: 'T', market: 'US', naver: 'T' },
  { ticker: 'XOM', market: 'US', naver: 'XOM' },
  { ticker: 'PEP', market: 'US', naver: 'PEP.O' },
  { ticker: 'KO', market: 'US', naver: 'KO' },
  { ticker: 'JNJ', market: 'US', naver: 'JNJ' },
  { ticker: 'PG', market: 'US', naver: 'PG' },

  // ---- 미국 대형 우량·성장주 ----
  { ticker: 'AAPL', market: 'US', naver: 'AAPL.O' },
  { ticker: 'MSFT', market: 'US', naver: 'MSFT.O' },
  { ticker: 'GOOGL', market: 'US', naver: 'GOOGL.O' },
  { ticker: 'AVGO', market: 'US', naver: 'AVGO.O' },
  { ticker: 'LLY', market: 'US', naver: 'LLY' },
  { ticker: 'META', market: 'US', naver: 'META.O' },
  { ticker: 'NVDA', market: 'US', naver: 'NVDA.O' },
  { ticker: 'TSLA', market: 'US', naver: 'TSLA.O' },
  { ticker: 'AMZN', market: 'US', naver: 'AMZN.O' },

  // ---- 미국 상장 ETF ----
  { ticker: 'VOO', market: 'US', naver: 'VOO' },
  { ticker: 'QQQ', market: 'US', naver: 'QQQ.O' },
  { ticker: 'SCHD', market: 'US', naver: 'SCHD.K' },
  { ticker: 'VYM', market: 'US', naver: 'VYM' },
  { ticker: 'DGRO', market: 'US', naver: 'DGRO.K' },
  { ticker: 'JEPI', market: 'US', naver: 'JEPI.K' },
  { ticker: 'JEPQ', market: 'US', naver: 'JEPQ.O' },
  { ticker: 'SPYI', market: 'US', naver: 'SPYI.K' },
  { ticker: 'QYLD', market: 'US', naver: 'QYLD.O' },
];

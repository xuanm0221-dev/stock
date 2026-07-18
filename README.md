# 배당주·우량주 투자 대시보드 (Next.js)

기존 단일 HTML 대시보드를 **Next.js**로 옮기고, 주가·배당금·환율을
**전일(최근 거래일) 종가 기준으로 매일 자동 갱신**되도록 만든 버전입니다.

## 어떻게 자동 갱신되나

- 서버가 [네이버 증권](https://finance.naver.com)에서 **전일(최근 거래일) 종가 + 원/달러 환율**을 가져옵니다. (`lib/stocks.js`) 배당금은 내장 기준값 사용(연 1회 수준으로 거의 안 변함).
- 프런트(`public/dashboard.js`)는 먼저 내장 기준값으로 즉시 화면을 그린 뒤, `/api/stocks`의 실시간 값으로 다시 그립니다.
- **데이터를 못 가져와도** 화면은 내장 기준값으로 항상 정상 표시됩니다. (폴백)
- 화면 상단 `📅 데이터 기준: … (금) 종가` 문구가 자동으로 바뀝니다.

> ⚠️ 표시 종목의 이름·티커·안전등급·배당주기·추천 포트폴리오·TOP10 등
> **판단 로직은 원본 그대로**이고, 매주 바뀌는 것은 **주가·배당금·환율**뿐입니다.
> 배당금(dps)은 내장 기준값이라 실제와 차이가 날 수 있습니다(배당수익률은 실시간 종가 ÷ 기준 배당으로 근사).

## 로컬에서 실행

```bash
cd dashboard-app
npm install
npm run dev
```

→ 브라우저에서 http://localhost:3000

## Vercel 배포 (완전 자동)

1. 이 저장소를 그대로 GitHub 리포지토리 **루트**로 올립니다(앱이 루트에 있음).
2. [vercel.com](https://vercel.com) → **Add New → Project** → 저장소 선택.
   - **Framework Preset**은 반드시 **Next.js**, **Root Directory**는 **비워둠**.
3. **Deploy** 클릭. 끝.

- 서버 함수는 서울 리전(`icn1`)에서 실행됩니다(`preferredRegion`) → 네이버 접근에 유리.
- 데이터는 `unstable_cache`(`revalidate = 21600`, 6시간)로 최대 6시간에 1번만 네이버를 호출하고 모든 방문자가 공유합니다. 전일 종가라 사실상 **매일 자동 갱신**.

## 종목 추가/변경

1. `public/dashboard.js` 안의 `const DATA = [ … ]`에 종목을 추가(이름·티커·안전등급 등).
2. `lib/tickers.js`의 `TICKERS`에 같은 `ticker`와 `market`('KR'|'US')을 추가.
   - 한국 종목은 6자리 숫자 코드, 미국은 알파벳 티커.

## 구조

```
dashboard-app/
├─ app/
│  ├─ layout.js            # 루트 레이아웃 + 메타데이터
│  ├─ page.js              # 마크업 주입 + dashboard.js 로드
│  ├─ globals.css          # 원본 스타일 (자동 추출)
│  ├─ bodyHtml.js          # 원본 마크업 (자동 추출)
│  └─ api/stocks/route.js  # 실시간 데이터 API (ISR 12h)
├─ lib/
│  ├─ stocks.js            # 네이버 증권 조회 (전일 종가)
│  └─ tickers.js           # 종목 티커 목록
├─ public/
│  └─ dashboard.js         # 원본 로직 + 실시간 반영 패치
└─ vercel.json             # 주간 크론
```

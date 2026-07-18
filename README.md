# 배당주·우량주 투자 대시보드 (Next.js)

기존 단일 HTML 대시보드를 **Next.js**로 옮기고, 주가·배당금·환율을
**지난주 금요일 종가 기준으로 매주 자동 갱신**되도록 만든 버전입니다.

## 어떻게 자동 갱신되나

- 서버가 [야후 파이낸스](https://finance.yahoo.com)에서 **지난 금요일 종가 + 연 배당금 + 원/달러 환율**을 가져옵니다. (`lib/stocks.js`)
- 프런트(`public/dashboard.js`)는 먼저 내장 기준값으로 즉시 화면을 그린 뒤, `/api/stocks`의 실시간 값으로 다시 그립니다.
- **데이터를 못 가져와도** 화면은 내장 기준값으로 항상 정상 표시됩니다. (폴백)
- 화면 상단 `📅 데이터 기준: … (금) 종가` 문구가 자동으로 바뀝니다.

> ⚠️ 표시 종목의 이름·티커·안전등급·배당주기·추천 포트폴리오·TOP10 등
> **판단 로직은 원본 그대로**이고, 매주 바뀌는 것은 **주가·배당금·환율**뿐입니다.
> 한국 종목 배당금은 야후 데이터 특성상 실제와 차이가 날 수 있어, 값이 없으면 내장 기준값을 유지합니다.

## 로컬에서 실행

```bash
cd dashboard-app
npm install
npm run dev
```

→ 브라우저에서 http://localhost:3000

## Vercel 배포 (완전 자동)

1. 이 `dashboard-app` 폴더를 GitHub 저장소로 올립니다.
2. [vercel.com](https://vercel.com) → **Add New → Project** → 저장소 선택.
   - (`dashboard-app`을 하위 폴더로 올렸다면 **Root Directory**를 `dashboard-app`으로 지정)
3. **Deploy** 클릭. 끝.

- ISR(`revalidate = 43200`, 12시간)로 서버 데이터가 주기적으로 새로 계산됩니다.
- `vercel.json`의 크론이 **매주 토요일**(UTC 23:00 = 한국 토요일 오전 8시)에
  `/api/stocks`를 호출해 새 금요일 종가로 갱신을 촉발합니다.
  - 크론은 Vercel 유료(Pro) 또는 Hobby 플랜 정책에 따라 동작합니다.
    Hobby에서 크론이 제한되면 ISR만으로도 자동 갱신됩니다.

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
│  ├─ stocks.js            # 야후 파이낸스 조회 (지난 금요일 종가)
│  └─ tickers.js           # 종목 티커 목록
├─ public/
│  └─ dashboard.js         # 원본 로직 + 실시간 반영 패치
└─ vercel.json             # 주간 크론
```

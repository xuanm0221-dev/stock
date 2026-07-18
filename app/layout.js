import './globals.css';

export const metadata = {
  title: '배당주 · 우량주 투자 대시보드 — 전문가 추천',
  description:
    '한국·미국 배당주·우량주를 배당주기·배당금·수익률·안전등급으로 비교. 지난주 금요일 종가 기준 매주 자동 갱신.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

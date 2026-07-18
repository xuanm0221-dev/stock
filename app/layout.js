import './globals.css';

export const metadata = {
  title: '주식 초보를 위한 노후준비 대시보드',
  description:
    '주식 잘 몰라도 OK. 매월 조금씩 S&P500·우량주에 적립해 노후를 준비하는 초보·안정형 대시보드. 전일 종가 기준 매일 자동 갱신.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="light">
      <body>{children}</body>
    </html>
  );
}

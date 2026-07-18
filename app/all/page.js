import Script from 'next/script';
import { BODY_HTML } from '../bodyHtml';

// 전체 45종목 상세 비교 대시보드 (기존 화면). 실시간 데이터는 dashboard.js 가 /api/stocks 에서 받아옴.
export const metadata = {
  title: '전체 종목 비교 — 배당주·우량주 대시보드',
};

export default function AllPage() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: 14 }}>
        <a className="navlink" href="/">← 간단 모드로 돌아가기</a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
      <Script src="/dashboard.js" strategy="afterInteractive" />
    </>
  );
}

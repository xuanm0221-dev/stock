import Script from 'next/script';
import { SIMPLE_HTML } from './simpleHtml';

// 메인 = 초보·안정형 월적립 노후준비 대시보드. (전체 상세 비교는 /all)
export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: SIMPLE_HTML }} />
      <Script src="/simple.js" strategy="afterInteractive" />
    </>
  );
}

import { unstable_cache } from 'next/cache';
import { getLiveStocks } from '../../../lib/stocks';

export const runtime = 'nodejs';
// 빌드 타임에 야후를 호출하지 않도록 동적 라우트로. 실제 호출 빈도는 아래 캐시로 제한.
export const dynamic = 'force-dynamic';

// 야후 호출은 최대 6시간에 1번만 (모든 방문자가 캐시 공유).
// 전일(최근 거래일) 종가 → 매일 자동 갱신.
const getCachedStocks = unstable_cache(getLiveStocks, ['live-stocks-v2'], {
  revalidate: 21600,
});

export async function GET() {
  try {
    const data = await getCachedStocks();
    return Response.json(data, {
      headers: {
        'Cache-Control':
          'public, s-maxage=21600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    console.error('getLiveStocks failed:', e);
    // 실패해도 프런트는 내장 기준값으로 정상 동작
    return Response.json(
      { asof: null, asofLabel: null, fx: null, prices: {} },
      { status: 200 }
    );
  }
}

// 초보·안정형 월적립 노후준비 대시보드 마크업
export const SIMPLE_HTML = `
<header>
  <div class="wrap">
    <div class="htop">
      <div>
        <h1><span class="dot"></span>주식 초보를 위한 노후준비 대시보드</h1>
        <p class="subtitle">주식 잘 몰라도 괜찮아요. <b>매월 조금씩</b> S&amp;P500·대형 우량주·배당 ETF를 사서 <b>배당까지 재투자</b>하면, 시간이 알아서 노후 자산을 불려줍니다. 초보·<b>안정형</b>에 맞춰 <b>딱 필요한 것만</b> 보여줘요.</p>
        <p class="asof">📅 데이터 기준: 불러오는 중… · 매주 자동 갱신</p>
      </div>
      <button class="theme-btn" id="themeBtn">🌙 다크</button>
    </div>

    <div class="topnav">
      <span class="navlink on">🌱 간단 모드</span>
      <a class="navlink" href="/all">📊 전체 종목 자세히 비교 →</a>
    </div>

    <div class="panel">
      <div class="panel-title">💰 내 적립 계획 입력 <span style="color:var(--tx3);font-weight:500;text-transform:none;letter-spacing:0">— 숫자를 바꾸면 아래 예상 결과가 즉시 갱신됩니다</span></div>
      <div class="invest-row">
        <div class="field">
          <label>매월 투자금액 (원)</label>
          <input class="inp num" id="mAmt" type="text" value="500,000">
          <div class="quick-amt">
            <span class="chip" data-amt="300000">30만</span>
            <span class="chip" data-amt="500000">50만</span>
            <span class="chip" data-amt="700000">70만</span>
            <span class="chip" data-amt="1000000">100만</span>
          </div>
        </div>
        <div class="fgroup"><span class="flabel">투자 기간</span>
          <div class="segs" id="segYears">
            <span class="seg" data-y="10">10년</span>
            <span class="seg on" data-y="20">20년</span>
            <span class="seg" data-y="30">30년</span>
          </div>
        </div>
      </div>
      <div class="filters" style="margin-top:18px">
        <div class="fgroup" style="min-width:240px">
          <span class="flabel">연 기대수익률 (안정형 가정) <span id="retVal" class="slideval">7%</span></span>
          <input type="range" id="ret" min="4" max="9" step="0.5" value="7">
          <span class="slab">배당 재투자 포함 장기 평균 가정 · 안정형은 5~7% 정도가 현실적</span>
        </div>
        <div class="fgroup" style="min-width:240px">
          <span class="flabel">노후 시점 배당수익률 (가정) <span id="dyVal" class="slideval">3.5%</span></span>
          <input type="range" id="dy" min="2" max="6" step="0.5" value="3.5">
          <span class="slab">모은 자산에서 매년 몇 %가 배당으로 나오는지 가정 → 월배당 계산</span>
        </div>
      </div>
    </div>
  </div>
</header>

<div class="wrap">
  <!-- [1] 적립식 시뮬레이터 -->
  <div class="sec-title"><span class="bar"></span>① 매월 얼마씩 모으면 노후에 얼마? — 적립식 시뮬레이터</div>
  <div class="sec-sub">매월 정액 투자 + 배당 재투자(복리) 기준의 <b>예상</b>입니다. 실제 수익은 시장에 따라 달라져요.</div>
  <div class="bignote" id="simLine" style="margin-bottom:16px">입력하면 요약이 표시됩니다.</div>
  <div class="panel">
    <div class="sim-cards">
      <div class="simcard"><div class="l">총 납입 원금</div><div class="v num" id="rPrincipal">–</div></div>
      <div class="simcard hl"><div class="l">🏦 예상 최종 자산</div><div class="v num" id="rFinal">–</div></div>
      <div class="simcard"><div class="l">불어난 수익금 (세전)</div><div class="v up num" id="rProfit">–</div></div>
      <div class="simcard"><div class="l">원금 대비 총 수익률</div><div class="v up num" id="rRet">–</div></div>
      <div class="simcard hl"><div class="l">💵 노후 예상 월배당 (세전)</div><div class="v num" id="rMonthly">–</div></div>
      <div class="simcard"><div class="l">연평균 수익률 (가정)</div><div class="v up num" id="rCagr">–</div></div>
    </div>
    <div class="simchart" id="simChart2"></div>
    <div style="display:flex;justify-content:space-between;margin-top:6px;padding:0 2px">
      <span class="slab">지금</span><span class="slab" id="simMid2">중간</span><span class="slab" id="simEnd2">만기</span>
    </div>
    <div style="margin-top:12px;font-size:12px;color:var(--tx3);line-height:1.6">
      📌 <span style="color:var(--tx3)">■ 회색</span> = 내가 넣은 원금, <span style="color:var(--accent2)">■ 초록</span> = 배당·상승으로 불어난 부분.
      &nbsp;·&nbsp; 세후(배당소득 15.4%) 참고 최종자산: <b class="num" id="rAfterTax" style="color:var(--tx2)">–</b>
    </div>
  </div>

  <!-- [2] 초보 안정형 추천 -->
  <div class="sec-title"><span class="bar"></span>② 이대로만 사면 됩니다 — 초보 안정형 추천</div>
  <div class="sec-sub">고민 그만! 아래 비율대로 <b>매월 자동이체</b>만 걸어두면 끝. 위험한 상품(커버드콜·무배당 성장주)은 <b>일부러 뺐어요</b>.</div>
  <div class="advisor">
    <div class="advisor-comment" style="border-left-color:var(--accent)">
      <b>🛡️ 안정형 3종 적립</b><span class="risk-tag rk-low">저위험</span><br>
      <b>미국 전체(S&amp;P500)</b>로 성장의 기본을 깔고, <b>미국 배당성장 ETF(월배당)</b>로 배당을 재투자하며, <b>국내 대표 우량주</b>로 균형을 맞추는 가장 무난한 노후 적립 조합입니다. 셋 다 <b>국내 상장</b>이라 <b>연금저축·IRP 계좌에서도</b> 살 수 있어요(③ 참고).
    </div>
    <table class="alloc" style="margin-top:16px">
      <thead><tr><th>종목 (비중)</th><th>종가</th><th>매월 배정액</th><th>유형</th><th>안전</th><th>배당수익률</th></tr></thead>
      <tbody id="recBody"></tbody>
    </table>
    <div class="advisor-summary">
      <div class="asum"><div class="l">매월 총 투자</div><div class="v num" id="recMonthly">–</div></div>
      <div class="asum"><div class="l">합산 배당수익률(현재)</div><div class="v g num" id="recYield">–</div></div>
      <div class="asum"><div class="l">평균 안전등급</div><div class="v num" id="recSafe">–</div></div>
    </div>
    <div class="bignote" style="margin-top:16px">
      💡 <b>실천 방법</b>: 증권사 앱에서 위 3종목을 <b>매월 자동매수(적립식)</b>로 설정하세요. 한 번 걸어두면 매달 알아서 삽니다. 처음엔 <b>S&amp;P500·배당 ETF 2개만</b>으로 시작해도 충분해요.
    </div>
  </div>

  <!-- [3] 안정형 종목 리스트 -->
  <div class="sec-title"><span class="bar"></span>③ 골라 담을 안정형 종목 — 딱 이만큼만</div>
  <div class="sec-sub">초보·안정형에 어울리는 <b>소수 정예</b>만 추렸어요. <span class="tagcore">핵심</span>부터 시작하고, 익숙해지면 <span class="taggrow">성장+</span>(대형주)를 <b>소액(전체의 10~20% 이내)</b>으로 얹으세요.</div>
  <div class="cardgrid" id="stockGrid"></div>
  <div class="bignote" style="margin-top:14px">
    🛒 <b>어디서 사나요?</b>
    &nbsp;·&nbsp; <b>🇰🇷 국내상장 ETF</b>(TIGER 미국S&amp;P500·배당다우존스·나스닥100, 삼성전자) → <b>한국 증시에서 원화로</b> 매수, <b>연금저축·IRP 계좌에서도 매수 가능</b>. 초보·노후적립엔 이게 편해요.<br>
    &nbsp;·&nbsp; <b>🇺🇸 미국 개별주</b>(애플·MS·구글) → <b>미국 증시에서 달러로</b> 매수(환전 필요), <b>연금계좌에선 매수 불가</b>·일반(해외주식)계좌로. 단일 종목이라 변동 크지만 <b>"대박 여지"</b>는 여기.<br>
    💡 대형주 노출을 <b>연금계좌에서</b> 원하면, 개별주 대신 <b>TIGER 미국나스닥100</b>(애플·MS·구글·엔비디아가 다 들어있음)으로 대체하면 됩니다.
  </div>

  <!-- [4] 세제혜택 계좌 -->
  <div class="sec-title"><span class="bar"></span>④ 노후대비의 진짜 핵심 — 세제혜택 계좌</div>
  <div class="sec-sub"><b>어떤 종목을 사느냐보다</b>, 20년 장기에선 <b>어느 계좌로 사느냐</b>가 수익률에 더 큰 영향을 줍니다. 일반 계좌는 배당마다 매년 15.4% 세금이 새지만, 아래 계좌는 그걸 미루거나 줄여줘요.</div>
  <div class="acctgrid">
    <div class="acard">
      <h4>🪙 연금저축펀드</h4>
      <div class="b">연 최대 600만원까지 넣으면 <b>세액공제(13.2~16.5%)</b>. 넣는 순간 <b>돌려받는 세금</b>이 있어 노후 적립의 1순위. ETF 매매·배당 세금도 <b>인출 때까지 미뤄져요</b>.</div>
      <div class="warn">⚠️ 만 55세 이후·연금으로 받는 게 원칙(중도해지 시 불이익). 국내상장 ETF만 매수 가능.</div>
      <button class="opn-btn" data-acct="pension">📋 개설방법 보기</button>
    </div>
    <div class="acard">
      <h4>🏛️ IRP</h4>
      <div class="b">연금저축과 <b>합쳐 연 900만원</b>까지 세액공제. 회사와 별개로 개인이 추가 적립 가능. 노후 자금 <b>이중 안전판</b>.</div>
      <div class="warn">⚠️ 위험자산(주식형) 최대 70%까지 등 규정 있음. 역시 국내상장 ETF 위주.</div>
      <button class="opn-btn" data-acct="irp">📋 개설방법 보기</button>
    </div>
    <div class="acard">
      <h4>💳 ISA</h4>
      <div class="b">3년 이상 유지하면 수익 <b>200~400만원까지 비과세</b>, 초과분도 <b>저율 분리과세(9.9%)</b>. 만기 자금을 연금계좌로 옮기면 <b>추가 세제혜택</b>.</div>
      <div class="warn">⚠️ 연 납입한도 2천만원(최대 1억). 중도인출 규정 확인 필요.</div>
      <button class="opn-btn" data-acct="isa">📋 개설방법 보기</button>
    </div>
  </div>

  <div class="fx-warn">
    <div class="fx-warn-h">🌏 외국인이신가요? — 꼭 확인하세요</div>
    <div class="fx-warn-b">
      • <b>세법상 "거주자"</b>(국내 주소 또는 <b>183일 이상 거주</b>)면 3개 계좌 모두 개설 가능해요. 비자 종류보다 이 <b>거주자 여부</b>가 핵심이에요. (비거주자는 신규 개설 불가)<br>
      • 📵 <b>첫 개설은 온라인(비대면)이 대체로 안 돼요.</b> <b>증권사 지점에 직접 방문</b>해서 <b>외국인등록증 + 여권 + 소득증빙</b>(근로소득 원천징수영수증 등)을 내야 해요.<br>
      • ⚠️ <b>가장 중요</b>: 급여에 <b>"외국인 19% 단일세율"</b>을 적용받고 있으면 <b>연금저축·IRP 세액공제가 0원</b>이 될 수 있어요. 이 경우엔 <b>ISA(비과세)나 일반계좌</b>가 더 나을 수 있으니, 개설 전 <b>증권사·세무 전문가에게 본인 과세방식</b>을 꼭 확인하세요.
    </div>
  </div>
  <div class="bignote" style="margin-top:14px">
    🧭 <b>초보 추천 순서</b>: ① 연금저축펀드부터 열고 → ② 위 ②번 안정형 3종을 <b>매월 자동매수</b> → ③ 여유되면 IRP·ISA로 확장.
    <b>미국에 직접 상장된 VOO·SCHD는 연금계좌에서 못 사니</b>, 연금계좌에선 <b>국내상장(TIGER·ACE·SOL 등)</b> S&amp;P500·배당 ETF를 사세요.
  </div>

  <div class="disclaimer">
    <b>⚠️ 투자 유의사항</b> · 본 화면은 <b>교육·참고용</b>이며 투자 권유·자문이 아닙니다. 시뮬레이션은 <b>가정에 기반한 예측</b>으로, 실제 수익률·배당·세금·환율은 시장과 개인 상황에 따라 크게 달라질 수 있고 <b>원금 손실</b>이 가능합니다. 세액공제·비과세 한도와 조건은 매년·개인별로 다르니 실제 가입 전 <b>증권사·국세청·전문가</b>를 통해 최신 규정을 확인하세요. 과거 수익이 미래를 보장하지 않습니다.
  </div>
  <footer>월적립 노후준비 대시보드 · 초보·안정형 · 데이터 참고용 · 투자 판단과 책임은 본인에게 있습니다.</footer>
</div>

<div class="modal-overlay" id="modalOverlay">
  <div class="modal-box">
    <button class="modal-close" id="modalClose" aria-label="닫기">✕</button>
    <div id="modalContent"></div>
  </div>
</div>
`;

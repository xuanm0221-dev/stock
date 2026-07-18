/* ====================================================================
   초보·안정형 월적립 노후준비 대시보드 로직
   - 종목은 소수 정예(큐레이션)만. 위험상품(커버드콜·무배당 성장주) 제외.
   - 가격/배당은 /api/stocks(지난 금요일 종가)로 덮어씀. 없으면 내장 기준값.
   ==================================================================== */

// 큐레이션 종목 (native 통화 기준값 = 폴백). tag: core=핵심, div=배당+, grow=성장+
var CURATED = [
  { ticker:'360750', name:'TIGER 미국S&P500', market:'KR', cur:'KRW', cycle:'분기', safety:5, price:21000, dps:170, tag:'core',
    why:'미국 500대 기업을 통째로. 가장 무난한 노후 성장 코어. (국내상장·연금 OK)' },
  { ticker:'458730', name:'TIGER 미국배당다우존스', market:'KR', cur:'KRW', cycle:'월', safety:5, price:12600, dps:460, tag:'core',
    why:'월배당·배당성장(SCHD형). 배당 재투자 복리에 최적. (국내상장·연금 OK)' },
  { ticker:'005930', name:'삼성전자', market:'KR', cur:'KRW', cycle:'분기', safety:5, price:78000, dps:1444, tag:'core',
    why:'익숙한 국내 대표 우량주 하나. 분기 배당.' },
  { ticker:'133690', name:'TIGER 미국나스닥100', market:'KR', cur:'KRW', cycle:'분기', safety:4, price:130000, dps:300, tag:'grow',
    why:'빅테크(애플·MS·엔비디아 등)를 통째로. 국내상장이라 연금계좌 OK.' },
  { ticker:'AAPL', name:'애플', market:'US', cur:'USD', cycle:'분기', safety:5, price:230, dps:1.04, tag:'grow',
    why:'초우량 대형주. 안정과 성장의 균형, 장기 대박 여지. (미국장·달러)' },
  { ticker:'MSFT', name:'마이크로소프트', market:'US', cur:'USD', cycle:'분기', safety:5, price:470, dps:3.32, tag:'grow',
    why:'클라우드·AI 최강. AAA 재무의 초우량 성장주. (미국장·달러)' },
  { ticker:'GOOGL', name:'알파벳(구글)', market:'US', cur:'USD', cycle:'분기', safety:5, price:185, dps:0.84, tag:'grow',
    why:'검색·유튜브·AI. 상대적 저평가 매력. (미국장·달러)' },
];

// 안정형 추천(핵심): 미국 S&P500 45 / 미국 배당다우존스 40 / 삼성전자 15 — 셋 다 국내상장·연금 가능
var REC = [ ['360750',45], ['458730',40], ['005930',15] ];

var TAG_LABEL = { core:'핵심', div:'배당+', grow:'성장+' };
var TAG_CLASS = { core:'tagcore', div:'tagdiv', grow:'taggrow' };

var state = { years:20, ret:7, dy:3.5 };

var $ = function(s){ return document.querySelector(s); };
var byTk = function(t){ for(var i=0;i<CURATED.length;i++) if(CURATED[i].ticker===t) return CURATED[i]; return null; };
var parseNum = function(s){ return Number(String(s).replace(/[^0-9.]/g,'')) || 0; };
var fmt = function(n){ return Math.round(n).toLocaleString('ko-KR'); };
function krPretty(n){
  n = Math.max(0, Math.round(n));
  var eok = Math.floor(n/1e8), man = Math.floor((n%1e8)/1e4);
  var parts = [];
  if(eok) parts.push(eok+'억');
  if(man) parts.push(man.toLocaleString('ko-KR')+'만');
  if(!parts.length) return n.toLocaleString('ko-KR')+'원';
  return parts.join(' ')+'원';
}
function stars(n){ var s=''; for(var i=1;i<=5;i++) s += i<=n ? '★' : '<span class="off">★</span>'; return s; }
function yieldOf(d){ return d.price>0 ? d.dps/d.price*100 : 0; }
function getMonthly(){ return parseNum($('#mAmt').value); }

/* ---------- ① 적립식 시뮬레이터 ---------- */
function renderSim(){
  var P = getMonthly();
  var years = state.years;
  var i = state.ret/100/12;              // 월 수익률
  var nM = years*12;
  var principal = P*nM;
  var FV = i>0 ? P*((Math.pow(1+i,nM)-1)/i) : P*nM;
  var profit = FV - principal;
  var retRate = principal>0 ? profit/principal*100 : 0;
  var monthlyDiv = FV*(state.dy/100)/12;
  var afterTax = principal + profit*0.846;  // 불어난 부분에 15.4% 참고 차감(보수적)

  $('#rPrincipal').textContent = krPretty(principal);
  $('#rFinal').textContent = krPretty(FV);
  $('#rProfit').textContent = '+'+krPretty(profit);
  $('#rRet').textContent = '+'+retRate.toFixed(0)+'%';
  $('#rMonthly').textContent = krPretty(monthlyDiv);
  $('#rCagr').textContent = state.ret.toFixed(1)+'%';
  $('#rAfterTax').textContent = krPretty(afterTax);

  var manWon = Math.round(P/10000);
  $('#simLine').innerHTML =
    '월 <b>'+manWon.toLocaleString('ko-KR')+'만원</b>씩 <b>'+years+'년</b> 모으면 → 예상 <b>약 '+krPretty(FV)+'</b> '+
    '&nbsp;·&nbsp; 노후에 <b>매달 약 '+krPretty(monthlyDiv)+'</b> 배당(세전)이 나오는 셈이에요.';

  // 차트 (연도별 평가액 vs 원금)
  var chart = $('#simChart2'); chart.innerHTML='';
  var series = [];
  for(var t=1;t<=years;t++){
    var m = t*12;
    var fv = i>0 ? P*((Math.pow(1+i,m)-1)/i) : P*m;
    series.push({ t:t, assets:fv, principal:P*m });
  }
  var max = series.length ? series[series.length-1].assets : 1;
  series.forEach(function(s){
    var h = Math.max(3, s.assets/max*100);
    var pbaseH = Math.min(100, s.principal/s.assets*100);
    var col = document.createElement('div'); col.className='scol';
    col.innerHTML = '<div class="sbar" style="height:'+h+'%">'+
      '<div class="pbase" style="height:'+pbaseH+'%"></div>'+
      '<span class="tip">'+s.t+'년: '+krPretty(s.assets)+'</span></div>';
    chart.appendChild(col);
  });
  $('#simMid2').textContent = Math.round(years/2)+'년';
  $('#simEnd2').textContent = years+'년';
}

/* ---------- ② 안정형 추천 ---------- */
function renderRec(){
  var monthly = getMonthly();
  var body = $('#recBody'); body.innerHTML='';
  var wSum=0, wYield=0, wSafe=0;
  REC.forEach(function(pair){
    var d = byTk(pair[0]); if(!d) return;
    var w = pair[1];
    var amt = monthly*w/100;
    var y = yieldOf(d);
    var priceStr = d.cur==='USD'
      ? '$'+d.price.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
      : fmt(d.price)+'원';
    wSum += w; wYield += w*y; wSafe += w*d.safety;
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><span class="wbar" style="width:'+(w*1.4)+'px"></span>'+d.name+' <b style="color:var(--tx3);font-weight:600">'+w+'%</b></td>'+
      '<td class="num">'+priceStr+'</td>'+
      '<td class="num">'+fmt(amt)+'원</td>'+
      '<td><span class="cyc cyc-'+d.cycle+'" style="font-size:10px;padding:2px 7px">'+d.cycle+'</span></td>'+
      '<td><span class="stars" style="font-size:10px">'+stars(d.safety)+'</span></td>'+
      '<td class="num" style="color:var(--accent2);font-weight:700">'+(y>0?y.toFixed(2)+'%':'–')+'</td>';
    body.appendChild(tr);
  });
  $('#recMonthly').textContent = fmt(monthly)+'원';
  $('#recYield').textContent = wSum>0 ? (wYield/wSum).toFixed(2)+'%' : '–';
  $('#recSafe').innerHTML = wSum>0 ? '<span class="stars">'+stars(Math.round(wSafe/wSum))+'</span> '+(wSafe/wSum).toFixed(1) : '–';
}

/* ---------- ③ 종목 카드 ---------- */
function renderStocks(){
  var grid = $('#stockGrid'); grid.innerHTML='';
  CURATED.forEach(function(d){
    var y = yieldOf(d);
    var flag = d.market==='US' ? '🇺🇸' : '🇰🇷';
    var priceStr = d.cur==='USD'
      ? '$'+d.price.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
      : fmt(d.price)+'원';
    var card = document.createElement('div'); card.className='scard';
    card.innerHTML =
      '<div class="top"><div class="nm2">'+flag+' '+d.name+'</div>'+
      '<span class="'+TAG_CLASS[d.tag]+'">'+TAG_LABEL[d.tag]+'</span></div>'+
      '<div class="why2">'+d.why+'</div>'+
      '<div class="meta2">'+
        '<span class="stars">'+stars(d.safety)+'</span>'+
        '<span class="cyc cyc-'+d.cycle+'" style="font-size:10px;padding:2px 7px">'+d.cycle+'배당</span>'+
        '<span>종가 '+priceStr+'</span>'+
        '<span style="color:var(--accent2);font-weight:700">배당 '+(y>0?y.toFixed(2)+'%':'–')+'</span>'+
      '</div>';
    grid.appendChild(card);
  });
}

function renderAll(){ renderSim(); renderRec(); renderStocks(); }

/* ---------- ④ 계좌 개설방법 모달 ---------- */
var ACCT_GUIDE = {
  pension: {
    title: '🪙 연금저축펀드 개설방법',
    where: '증권사 앱 (미래에셋·삼성·한국투자·키움·NH투자·토스증권 등)',
    steps: [
      '증권사 앱 설치 → 회원가입',
      '계좌개설 메뉴에서 <b>"연금저축펀드"</b> 선택 <span class="mred">(※ "연금저축보험"·"신탁" 아님! ETF 사려면 반드시 펀드형)</span>',
      '신분증으로 본인인증 → 계좌 개설',
      '<b>매월 자동이체 + 자동매수(적립식)</b> 설정',
      '그 계좌 안에서 <b>TIGER 미국S&P500</b> 등을 매수',
    ],
    tip: '연 600만원까지 세액공제. 주식형 100% 담을 수 있어 S&P500 적립에 가장 유리 → <b>1순위로 개설</b>.',
  },
  irp: {
    title: '🏛️ IRP(개인형 퇴직연금) 개설방법',
    where: '증권사 IRP (ETF 상품 선택 폭이 넓어 은행·보험보다 증권사 권장)',
    steps: [
      '증권사 앱 → 계좌개설에서 <b>"IRP(개인형 퇴직연금)"</b> 선택',
      '신분증으로 본인인증 → 개설',
      '<span class="mred">주식형(S&P500 등)은 최대 70%까지만</span> → 나머지 30%는 채권형·예금 등 안전자산으로 채움',
      '매월 자동이체 설정',
    ],
    tip: '연금저축과 <b>합쳐 900만원</b>까지 세액공제. 연금저축 다 채운 뒤 <b>2순위</b>로 확장.',
  },
  isa: {
    title: '💳 ISA 개설방법',
    where: '증권사 <b>"중개형 ISA"</b> (※ 신탁형·일임형 아님 — 중개형이라야 직접 ETF 매매)',
    steps: [
      '증권사 앱 → 계좌개설에서 <b>"중개형 ISA"</b> 선택',
      '거주자 확인 + 신분증 본인인증',
      '(서민형 자격되면 서류 제출 → 비과세 한도 400만원)',
      '국내상장 ETF(TIGER 미국S&P500 등) 매수',
    ],
    tip: '세액공제는 없지만 <b>55세 전에도 쓸 수 있어</b> 유연. 여윳돈·비상금 성격은 여기에. <b>3순위</b>.',
  },
};

function openModal(key){
  var g = ACCT_GUIDE[key]; if(!g) return;
  var steps = g.steps.map(function(s, i){
    return '<li><span class="mstep">'+(i+1)+'</span><span>'+s+'</span></li>';
  }).join('');
  $('#modalContent').innerHTML =
    '<h3 class="modal-title">'+g.title+'</h3>'+
    '<div class="modal-where">📍 <b>어디서:</b> '+g.where+'</div>'+
    '<ol class="modal-steps">'+steps+'</ol>'+
    '<div class="modal-tip">💡 '+g.tip+'</div>'+
    '<div class="modal-fx">🌏 <b>외국인</b>은 대체로 <b>비대면(온라인) 개설이 안 되고 지점 방문</b>이 필요해요 '+
      '(외국인등록증+여권+소득증빙 지참). 그리고 <b>19% 단일세율</b> 적용 중이면 연금계좌 <b>세액공제가 0원</b>일 수 있어요 → 개설 전 증권사에 꼭 확인!</div>'+
    '<div class="modal-note">※ 세율·한도·서류는 증권사·시점별로 다를 수 있어요. 개설 시 최신 기준을 확인하세요.</div>';
  $('#modalOverlay').classList.add('on');
}
function closeModal(){ $('#modalOverlay').classList.remove('on'); }

/* ---------- 실시간 데이터 반영 ---------- */
function applyLive(live){
  if(!live) return;
  try{
    if(live.prices){
      CURATED.forEach(function(d){
        var p = live.prices[d.ticker];
        if(!p) return;
        if(typeof p.price==='number' && p.price>0) d.price = p.price;
        if(typeof p.dps==='number' && p.dps>=0) d.dps = p.dps;
      });
    }
    if(live.asofLabel){
      var a = $('.asof');
      if(a) a.innerHTML = '📅 데이터 기준: <b style="color:var(--tx2)">'+live.asofLabel+'</b> · 매주 자동 갱신';
    }
  }catch(e){ console.warn('applyLive failed', e); }
}

/* ---------- 이벤트 ---------- */
$('#mAmt').addEventListener('input', function(e){ var v=parseNum(e.target.value); e.target.value = v?fmt(v):''; renderAll(); });
document.querySelectorAll('.chip').forEach(function(c){
  c.addEventListener('click', function(){ $('#mAmt').value = fmt(Number(c.dataset.amt)); renderAll(); });
});
$('#segYears').addEventListener('click', function(e){
  if(!e.target.classList.contains('seg')) return;
  $('#segYears').querySelectorAll('.seg').forEach(function(s){ s.classList.remove('on'); });
  e.target.classList.add('on'); state.years = Number(e.target.dataset.y); renderSim();
});
$('#ret').addEventListener('input', function(e){ state.ret = Number(e.target.value); $('#retVal').textContent = e.target.value+'%'; renderSim(); });
$('#dy').addEventListener('input', function(e){ state.dy = Number(e.target.value); $('#dyVal').textContent = e.target.value+'%'; renderSim(); });

// 테마 (전체 대시보드와 같은 키로 공유)
var themeBtn = $('#themeBtn');
function applyTheme(t){
  document.documentElement.classList.toggle('light', t==='light');
  themeBtn.textContent = t==='light' ? '☀️ 라이트' : '🌙 다크';
  try{ localStorage.setItem('divTheme', t); }catch(e){}
}
themeBtn.addEventListener('click', function(){
  applyTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light');
});
applyTheme((function(){ try{ return localStorage.getItem('divTheme')||'light'; }catch(e){ return 'light'; } })());

// 계좌 개설방법 모달
document.querySelectorAll('.opn-btn').forEach(function(b){
  b.addEventListener('click', function(){ openModal(b.dataset.acct); });
});
$('#modalClose').addEventListener('click', closeModal);
$('#modalOverlay').addEventListener('click', function(e){ if(e.target === $('#modalOverlay')) closeModal(); });
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });

// 최초 렌더 → 실시간 값으로 갱신
renderAll();
fetch('/api/stocks')
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(live){ applyLive(live); renderAll(); })
  .catch(function(e){ console.warn('live fetch failed', e); });

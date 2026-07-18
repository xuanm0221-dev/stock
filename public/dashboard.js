
/* ============ 데이터 (2026-07 대표값, 참고용) ============
   safety: 5(최고안전)~1(고위험) · grade: 분류 라벨 · pm: 배당 지급(추정)월 */
const DATA = [
  // ---- 한국 주식 ----
  {name:"우리금융지주",ticker:"316140",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:21500,dps:1600,safety:3,grade:"고배당 금융",memo:"국내 최고 수준 배당수익률",pm:[3,6,9,12]},
  {name:"기업은행(IBK)",ticker:"024110",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:16000,dps:1250,safety:4,grade:"국책은행·안정",memo:"국책은행 고배당",pm:[3,6,9,12]},
  {name:"하나금융지주",ticker:"086790",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:75000,dps:4000,safety:4,grade:"밸류업·배당성장",memo:"배당성장+자사주",pm:[3,6,9,12]},
  {name:"KB금융",ticker:"105560",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:105000,dps:3800,safety:4,grade:"대형 금융우량",memo:"자사주 소각 병행",pm:[3,6,9,12]},
  {name:"신한지주",ticker:"055550",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:60000,dps:2300,safety:4,grade:"대형 금융우량",memo:"분기 균등배당",pm:[3,6,9,12]},
  {name:"SK텔레콤",ticker:"017670",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:57000,dps:3540,safety:4,grade:"고배당 통신",memo:"안정적 통신 배당주",pm:[3,6,9,12]},
  {name:"KT&G",ticker:"033780",market:"KR",type:"주식",cycle:"반기",cur:"KRW",price:128000,dps:5600,safety:4,grade:"필수소비 우량",memo:"20년 배당·자사주",pm:[4,8]},
  {name:"삼성전자",ticker:"005930",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:78000,dps:1444,safety:5,grade:"국내 대표 우량",memo:"대표 분기배당 우량주",pm:[3,6,9,12]},
  {name:"SK하이닉스",ticker:"000660",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:2076000,dps:2550,safety:4,grade:"AI메모리 대장(성장)",memo:"HBM·AI 수혜 대형 성장주(저배당)",pm:[3,6,9,12]},
  {name:"현대차",ticker:"005380",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:250000,dps:12000,safety:4,grade:"대형 우량",memo:"분기배당 도입",pm:[3,6,9,12]},
  {name:"POSCO홀딩스",ticker:"005490",market:"KR",type:"주식",cycle:"분기",cur:"KRW",price:300000,dps:10000,safety:3,grade:"소재 대형주",memo:"경기민감·분기배당",pm:[3,6,9,12]},
  {name:"삼성화재",ticker:"000810",market:"KR",type:"주식",cycle:"연",cur:"KRW",price:380000,dps:18500,safety:4,grade:"고배당 보험",memo:"고배당 보험 우량주",pm:[4]},
  {name:"맥쿼리인프라",ticker:"088980",market:"KR",type:"리츠·인프라",cur:"KRW",cycle:"반기",price:13200,dps:770,safety:4,grade:"인프라펀드",memo:"반기 안정 분배",pm:[2,8]},
  {name:"롯데리츠",ticker:"330590",market:"KR",type:"리츠·인프라",cur:"KRW",cycle:"반기",price:3300,dps:260,safety:3,grade:"리테일 리츠",memo:"부동산 리츠 고배당",pm:[6,12]},

  // ---- 한국 상장 ETF ----
  {name:"TIGER 미국배당다우존스",ticker:"458730",market:"KR",type:"ETF",cycle:"월",cur:"KRW",price:12600,dps:460,safety:5,grade:"미국배당(SCHD형)",memo:"월배당·배당성장",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"SOL 미국배당다우존스",ticker:"446720",market:"KR",type:"ETF",cycle:"월",cur:"KRW",price:12900,dps:470,safety:5,grade:"미국배당(SCHD형)",memo:"월배당·저보수",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"ACE 미국배당다우존스",ticker:"402970",market:"KR",type:"ETF",cycle:"월",cur:"KRW",price:13100,dps:480,safety:5,grade:"미국배당(SCHD형)",memo:"월배당 원조",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"TIGER 코리아배당다우존스",ticker:"490080",market:"KR",type:"ETF",cycle:"월",cur:"KRW",price:11000,dps:420,safety:4,grade:"국내 배당100",memo:"국내판 배당다우존스",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"TIGER 리츠부동산인프라",ticker:"329200",market:"KR",type:"리츠·인프라",cycle:"월",cur:"KRW",price:4900,dps:390,safety:3,grade:"국내 리츠묶음",memo:"국내 리츠·인프라 월배당",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"TIGER 미국배당+7%프리미엄",ticker:"458760",market:"KR",type:"ETF",cycle:"월",cur:"KRW",price:10400,dps:1050,safety:2,grade:"커버드콜(고분배)",memo:"고분배·상승제한",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"TIGER 나스닥100 데일리커버드콜",ticker:"486290",market:"KR",type:"ETF",cycle:"월",cur:"KRW",price:9800,dps:1450,safety:2,grade:"커버드콜(초고분배)",memo:"초고분배·변동성 큼",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},

  // ---- 미국 주식: 배당주 ----
  {name:"Realty Income",ticker:"O",market:"US",type:"리츠·인프라",cycle:"월",cur:"USD",price:58,dps:3.22,safety:4,grade:"월배당 리츠",memo:"30년+ 월배당·배당귀족",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"Altria",ticker:"MO",market:"US",type:"주식",cycle:"분기",cur:"USD",price:60,dps:4.08,safety:3,grade:"배당킹·고배당",memo:"고배당·경기방어",pm:[1,4,7,10]},
  {name:"Verizon",ticker:"VZ",market:"US",type:"주식",cycle:"분기",cur:"USD",price:44,dps:2.71,safety:3,grade:"고배당 통신",memo:"19년 연속 증배",pm:[2,5,8,11]},
  {name:"Pfizer",ticker:"PFE",market:"US",type:"주식",cycle:"분기",cur:"USD",price:26,dps:1.72,safety:3,grade:"고배당 제약",memo:"고배당 제약주",pm:[3,6,9,12]},
  {name:"AT&T",ticker:"T",market:"US",type:"주식",cycle:"분기",cur:"USD",price:28,dps:1.11,safety:3,grade:"통신 배당",memo:"통신 배당주",pm:[2,5,8,11]},
  {name:"ExxonMobil",ticker:"XOM",market:"US",type:"주식",cycle:"분기",cur:"USD",price:115,dps:3.96,safety:4,grade:"배당귀족·에너지",memo:"40년+ 증배 에너지",pm:[3,6,9,12]},
  {name:"PepsiCo",ticker:"PEP",market:"US",type:"주식",cycle:"분기",cur:"USD",price:145,dps:5.69,safety:5,grade:"배당킹(52년+)",memo:"필수소비 배당킹",pm:[1,3,6,9]},
  {name:"Coca-Cola",ticker:"KO",market:"US",type:"주식",cycle:"분기",cur:"USD",price:70,dps:2.04,safety:5,grade:"배당킹(62년)",memo:"대표 배당킹",pm:[4,7,10,12]},
  {name:"Johnson & Johnson",ticker:"JNJ",market:"US",type:"주식",cycle:"분기",cur:"USD",price:165,dps:4.96,safety:5,grade:"배당킹·AAA",memo:"AAA 신용·배당킹",pm:[3,6,9,12]},
  {name:"Procter & Gamble",ticker:"PG",market:"US",type:"주식",cycle:"분기",cur:"USD",price:165,dps:4.23,safety:5,grade:"배당킹(68년)",memo:"필수소비 배당킹",pm:[2,5,8,11]},

  // ---- 미국 주식: 대형 우량·성장주 (S&P500 대표) ----
  {name:"Apple",ticker:"AAPL",market:"US",type:"주식",cycle:"분기",cur:"USD",price:230,dps:1.04,safety:5,grade:"빅테크 우량",memo:"저배당·초우량 성장",pm:[2,5,8,11]},
  {name:"Microsoft",ticker:"MSFT",market:"US",type:"주식",cycle:"분기",cur:"USD",price:470,dps:3.32,safety:5,grade:"빅테크 우량·AAA",memo:"배당성장 빅테크",pm:[3,6,9,12]},
  {name:"Alphabet (Google)",ticker:"GOOGL",market:"US",type:"주식",cycle:"분기",cur:"USD",price:185,dps:0.84,safety:5,grade:"빅테크 우량",memo:"2024 배당 개시",pm:[3,6,9,12]},
  {name:"Broadcom",ticker:"AVGO",market:"US",type:"주식",cycle:"분기",cur:"USD",price:280,dps:2.36,safety:4,grade:"반도체 배당성장",memo:"배당성장 반도체",pm:[3,6,9,12]},
  {name:"Eli Lilly",ticker:"LLY",market:"US",type:"주식",cycle:"분기",cur:"USD",price:950,dps:6.0,safety:4,grade:"제약 초성장주",memo:"비만·당뇨 신약 성장",pm:[3,6,9,12]},
  {name:"Meta Platforms",ticker:"META",market:"US",type:"주식",cycle:"분기",cur:"USD",price:720,dps:2.10,safety:4,grade:"빅테크 성장",memo:"저배당·고성장",pm:[3,6,9,12]},
  {name:"NVIDIA",ticker:"NVDA",market:"US",type:"주식",cycle:"분기",cur:"USD",price:170,dps:0.04,safety:3,grade:"성장주(초저배당)",memo:"AI 대장·변동성 큼",pm:[3,6,9,12]},
  {name:"Tesla",ticker:"TSLA",market:"US",type:"주식",cycle:"무배당",cur:"USD",price:330,dps:0,safety:2,grade:"성장주(무배당)",memo:"무배당·고변동성",pm:[]},
  {name:"Amazon",ticker:"AMZN",market:"US",type:"주식",cycle:"무배당",cur:"USD",price:220,dps:0,safety:4,grade:"빅테크(무배당)",memo:"무배당 성장 우량",pm:[]},

  // ---- 미국 상장 ETF ----
  {name:"S&P500 (VOO)",ticker:"VOO",market:"US",type:"ETF",cycle:"분기",cur:"USD",price:565,dps:6.8,safety:5,grade:"S&P500 지수",memo:"미국 대표 지수 ETF",pm:[3,6,9,12]},
  {name:"나스닥100 (QQQ)",ticker:"QQQ",market:"US",type:"ETF",cycle:"분기",cur:"USD",price:560,dps:3.6,safety:4,grade:"나스닥100 지수",memo:"미국 기술주 지수",pm:[3,6,9,12]},
  {name:"SCHD",ticker:"SCHD",market:"US",type:"ETF",cycle:"분기",cur:"USD",price:28,dps:1.05,safety:5,grade:"미국 배당성장",memo:"배당성장 대표 ETF",pm:[3,6,9,12]},
  {name:"VYM",ticker:"VYM",market:"US",type:"ETF",cycle:"분기",cur:"USD",price:130,dps:3.55,safety:5,grade:"미국 고배당",memo:"뱅가드 고배당",pm:[3,6,9,12]},
  {name:"DGRO",ticker:"DGRO",market:"US",type:"ETF",cycle:"분기",cur:"USD",price:63,dps:1.35,safety:5,grade:"미국 배당성장",memo:"블랙록 배당성장",pm:[3,6,9,12]},
  {name:"JEPI",ticker:"JEPI",market:"US",type:"ETF",cycle:"월",cur:"USD",price:57,dps:4.75,safety:3,grade:"커버드콜(방어)",memo:"월배당·방어적",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"JEPQ",ticker:"JEPQ",market:"US",type:"ETF",cycle:"월",cur:"USD",price:55,dps:6.05,safety:3,grade:"커버드콜(나스닥)",memo:"고분배·성장주 기반",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"SPYI",ticker:"SPYI",market:"US",type:"ETF",cycle:"월",cur:"USD",price:52,dps:6.24,safety:2,grade:"커버드콜(S&P)",memo:"고분배·세제 유리",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
  {name:"QYLD",ticker:"QYLD",market:"US",type:"ETF",cycle:"월",cur:"USD",price:17.5,dps:2.0,safety:2,grade:"커버드콜(초고분배)",memo:"초고분배·상승제한",pm:[1,2,3,4,5,6,7,8,9,10,11,12]},
];

/* ============ 전문가 추천 포트폴리오 ============ */
const PROFILES = {
  stable:{ emo:"🛡️", title:"안정 배당형", risk:"low", riskLabel:"저위험",
    comment:`<b>은퇴·목돈 지키기</b>에 어울리는 방어적 구성입니다. 배당킹(J&J·P&G·코카콜라)과 국내 대형 금융우량주, 월배당 배당성장 ETF를 섞어 <b>변동성을 낮추고 꾸준한 현금흐름</b>을 노립니다. 개별 종목 리스크를 ETF로 분산해 초보자도 부담이 적습니다.`,
    picks:[["458730",22],["JNJ",15],["PG",15],["KO",10],["105560",15],["005930",13],["O",10]] },
  growth:{ emo:"🌱", title:"배당 성장형", risk:"low", riskLabel:"저~중위험",
    comment:`지금 배당은 낮아도 <b>매년 배당이 10%+ 늘어나는</b> 종목 위주입니다. 배당성장 ETF(SCHD·DGRO)에 애플·MS·브로드컴 같은 빅테크 우량주를 더해 <b>10년 뒤 원금 대비 배당(YOC)이 크게 상승</b>하는 복리 효과를 겨냥합니다. 시간이 무기인 <b>장기 투자자</b>에게 적합합니다.`,
    picks:[["SCHD",25],["DGRO",15],["PEP",15],["MSFT",10],["AAPL",10],["086790",10],["AVGO",15]] },
  income:{ emo:"💵", title:"고배당 현금형", risk:"high", riskLabel:"중~고위험",
    comment:`<b>당장 매달 최대 현금흐름</b>이 목표입니다. 커버드콜 ETF(JEPI·JEPQ·SPYI)와 월배당 리츠, 국내 고배당주를 결합해 <b>연 7~9%대 분배</b>를 노립니다. 다만 커버드콜은 <b>상승장에서 수익이 제한</b>되고 분배금이 줄 수 있어, 은퇴 현금흐름 보조용으로 <b>비중 관리</b>가 중요합니다.`,
    picks:[["JEPI",20],["JEPQ",15],["SPYI",15],["O",15],["458760",10],["316140",15],["088980",10]] },
  balanced:{ emo:"⚖️", title:"균형 우량주형", risk:"mid", riskLabel:"중위험",
    comment:`<b>성장과 배당의 균형</b>을 잡은 코어(core) 포트폴리오입니다. 시장 전체를 사는 S&P500(VOO)을 중심축으로, 애플·MS·구글 등 <b>빅테크 우량주</b>와 배당 ETF·국내 대표주를 더했습니다. 한 바구니에 <b>미국 성장 + 배당 안전판</b>을 함께 담고 싶은 분께 표준적인 정답에 가깝습니다.`,
    picks:[["VOO",25],["AAPL",12],["MSFT",12],["GOOGL",10],["JNJ",10],["SCHD",15],["005930",8],["KO",8]] },
  monthly:{ emo:"📆", title:"월배당 파이프라인", risk:"mid", riskLabel:"중위험",
    comment:`<b>매달 통장에 배당이 꽂히게</b> 배당 지급월을 겹치지 않게 설계했습니다. 월배당(리얼티인컴·JEPI·국내 리츠)에 분기배당을 <b>1·4·7·10월(알트리아) / 2·5·8·11월(버라이즌) / 3·6·9·12월(J&J)</b>로 배치해 <b>12개월 전부 배당이 발생</b>합니다. 월급처럼 배당을 받고 싶은 분께 적합합니다.`,
    picks:[["O",18],["JEPI",15],["329200",15],["MO",15],["VZ",15],["JNJ",12],["KO",10]] },
};

/* ============ TOP 10 순위 (5년 분석 기반, 참고용) ============
   w: 추천 투자비중(%) · m: [5년배당성장, 연속·특징, 5년총수익] (div) / [5년총수익, 실적성장, 배당수익률] (growth) */
const DIV_TOP10 = [
  {tk:"SCHD",   w:15, m:["+11%/년","12년 성장","+70%"],  point:"배당성장 ETF의 정석 · 100종목 분산으로 가장 안전한 코어"},
  {tk:"458730", w:15, m:["+10%/년","월배당·저보수","+60%"], point:"국내 상장 SCHD형 · 원화·월배당으로 초보 접근성 최고"},
  {tk:"O",      w:12, m:["+3%/년","30년+ 월배당","+25%"], point:"30년 넘게 매달 배당 인상 · 월배당 리츠의 대명사"},
  {tk:"JNJ",    w:10, m:["+5%/년","63년 배당킹","+35%"],  point:"AAA 신용 · 헬스케어 방어주, 불황에도 배당 인상"},
  {tk:"105560", w:10, m:["+15%/년","환원율 50%+","+150%"], point:"주주환원율 국내 첫 50% 돌파 · 자사주 소각 병행"},
  {tk:"086790", w:8,  m:["+12%/년","밸류업 대장","+160%"], point:"5년간 배당·주가 동반 급등 · 배당성장 모범생"},
  {tk:"PEP",    w:8,  m:["+6%/년","54년 배당킹","+30%"],  point:"필수소비 배당킹 · 경기 무관 꾸준한 증배"},
  {tk:"017670", w:8,  m:["+3%/년","6%대 고배당","+20%"],  point:"안정적 현금흐름 통신주 · 배당수익률 최상위권"},
  {tk:"000810", w:7,  m:["+10%/년","최고 배당금","+90%"], point:"주당 배당금 국내 최고 · 보험 우량주"},
  {tk:"033780", w:7,  m:["+4%/년","15년+ 성장","+40%"],  point:"15년 이상 배당 성장 · 환원율 100% 목표"},
];
const GROWTH_TOP10 = [
  {tk:"VOO",    w:20, m:["+95%","지수(500대)","1.2%"],    point:"미국 500대 기업을 통째로 · 가장 안전한 성장 코어"},
  {tk:"MSFT",   w:12, m:["+160%","매출 +70%","0.7%"],     point:"클라우드·AI 최강 · AAA 재무의 초우량주"},
  {tk:"AAPL",   w:11, m:["+130%","매출 +45%","0.45%"],    point:"막대한 현금창출·자사주 · 브랜드 해자"},
  {tk:"GOOGL",  w:10, m:["+150%","매출 +80%","0.45%"],    point:"검색·유튜브·AI(Gemini) · 상대적 저평가 매력"},
  {tk:"NVDA",   w:10, m:["+1,400%","매출 8배","0.02%"],   point:"AI 반도체 사실상 독점 · 고성장·고변동 유의"},
  {tk:"AMZN",   w:9,  m:["+90%","매출 +90%","무배당"],    point:"이커머스 + AWS 클라우드 양대 성장엔진"},
  {tk:"LLY",    w:8,  m:["+450%","매출 2배","0.6%"],      point:"비만·당뇨 신약(GLP-1) · 제약 초성장주"},
  {tk:"AVGO",   w:8,  m:["+500%","매출 +150%","0.85%"],   point:"AI 네트워크 반도체 + 배당성장 동시 보유"},
  {tk:"META",   w:7,  m:["+180%","매출 +90%","0.3%"],     point:"광고 회복 + AI 효율화로 이익 급증"},
  {tk:"000660", w:5,  m:["+2,000%","실적 기록경신","0.1%"], point:"HBM·AI 메모리 대장 · 초고성장·고변동(1주 ≈ 207만원)"},
];

/* ============ 상태 ============ */
const CYCLE_RANK = {"월":1,"분기":2,"반기":3,"연":4,"무배당":5};
let state = { market:"all", type:"all", cycle:"all", safety:"all", search:"", sort:"yield", sortDir:-1 };
let portfolio = loadPF();
let activeProfile = null;
let pfInvested = 0, pfYearDiv = 0;               // 포트폴리오 합계(시뮬레이션 입력)
let simState = { years:5, reinvest:true, g:7, a:4 };

const $ = s=>document.querySelector(s);
const byTicker = t=>DATA.find(x=>x.ticker===t);
const fmt = n => Math.round(n).toLocaleString('ko-KR');
const parseNum = s => Number(String(s).replace(/[^0-9.]/g,''))||0;
const getInvest = ()=> parseNum($('#investAmt').value);
const getFx = ()=> parseNum($('#fxRate').value)||1550;
const priceKRW = d => d.cur==="USD"? d.price*getFx() : d.price;
const dpsKRW = d => d.cur==="USD"? d.dps*getFx() : d.dps;
const yieldOf = d => d.price>0? d.dps/d.price*100 : 0;
function stars(n){ let s=''; for(let i=1;i<=5;i++) s+= i<=n?'★':'<span class="off">★</span>'; return s; }

function derive(d, amount){
  const pk=priceKRW(d), dk=dpsKRW(d);
  const shares = pk>0? Math.floor(amount/pk):0;
  const edivYear = shares*dk;
  return {pk, dk, yld:yieldOf(d), shares, edivYear, edivMonth:edivYear/12};
}

/* ============ 비교 표 ============ */
function render(){
  let rows = DATA.filter(d=>{
    if(state.market!=="all" && d.market!==state.market) return false;
    if(state.type!=="all" && d.type!==state.type) return false;
    if(state.cycle!=="all" && d.cycle!==state.cycle) return false;
    if(state.safety!=="all" && d.safety < Number(state.safety)) return false;
    if(state.search){ const q=state.search.toLowerCase();
      if(!(d.name.toLowerCase().includes(q)||d.ticker.toLowerCase().includes(q))) return false; }
    return true;
  }).map(d=>({d, ...derive(d, getInvest())}));

  const key=state.sort, dir=state.sortDir;
  rows.sort((a,b)=>{
    let va,vb;
    switch(key){
      case "name": return dir*a.d.name.localeCompare(b.d.name,'ko');
      case "safety": va=a.d.safety; vb=b.d.safety; break;
      case "cycleRank": va=CYCLE_RANK[a.d.cycle]; vb=CYCLE_RANK[b.d.cycle]; break;
      case "price": va=a.pk; vb=b.pk; break;
      case "divPerShare": va=a.dk; vb=b.dk; break;
      case "yield": va=a.yld; vb=b.yld; break;
      case "shares": va=a.shares; vb=b.shares; break;
      case "edivYear": va=a.edivYear; vb=b.edivYear; break;
      case "edivMonth": va=a.edivMonth; vb=b.edivMonth; break;
      default: va=a.yld; vb=b.yld;
    }
    return dir*(va-vb);
  });

  const maxY = Math.max(...DATA.map(yieldOf));
  const tb=$('#tbody'); tb.innerHTML="";
  rows.forEach(r=>{
    const d=r.d, flag=d.market==="KR"?"🇰🇷":"🇺🇸";
    const typeBadge = d.type==="ETF"?'<span class="badge b-etf">ETF</span>'
                    : d.type==="리츠·인프라"?'<span class="badge b-reit">리츠</span>'
                    : '<span class="badge b-stock">주식</span>';
    const priceStr = d.cur==="USD"? `$${d.price.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}` : fmt(d.price)+"원";
    const dpsStr = d.dps>0 ? (d.cur==="USD"? `$${d.dps.toFixed(2)}` : fmt(d.dps)+"원") : '<span style="color:var(--tx3)">–</span>';
    const yStr = r.yld>0 ? r.yld.toFixed(2)+"%" : '<span style="color:var(--tx3)">–</span>';
    const inPF = portfolio.hasOwnProperty(d.ticker);
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td class="name">
        <div class="nm"><span class="flag">${flag}</span>${d.name} ${typeBadge}</div>
        <div class="ticker">${d.ticker} · ${d.grade}</div>
        <div class="memo">${d.memo}</div>
      </td>
      <td><div class="stars">${stars(d.safety)}</div></td>
      <td><span class="cyc cyc-${d.cycle}">${d.cycle==="무배당"?"무배당":d.cycle+"배당"}</span></td>
      <td class="num">${priceStr}</td>
      <td class="num">${dpsStr}</td>
      <td><div class="yield-cell"><div class="ybar"><i style="width:${Math.min(100,r.yld/maxY*100)}%"></i></div><span class="yval num">${yStr}</span></div></td>
      <td class="num">${r.shares.toLocaleString('ko-KR')}주</td>
      <td class="num divamt">${r.edivYear>0?fmt(r.edivYear)+"원":'<span style="color:var(--tx3)">–</span>'}</td>
      <td class="num" style="color:var(--tx2)">${r.edivMonth>0?fmt(r.edivMonth)+"원":'–'}</td>
      <td><button class="add-btn ${inPF?'in':''}" data-add="${d.ticker}">${inPF?'담김 ✓':'＋담기'}</button></td>`;
    tb.appendChild(tr);
  });

  $('#stCount').textContent = rows.length+"개";
  const divRows = rows.filter(r=>r.yld>0);
  const avgY = divRows.length? divRows.reduce((s,r)=>s+r.yld,0)/divRows.length : 0;
  $('#stYield').textContent = avgY.toFixed(2)+"%";
  const top = rows.reduce((m,r)=> r.yld>(m?.yld??-1)?r:m, null);
  $('#stTop').textContent = top&&top.yld>0? `${top.d.name} ${top.yld.toFixed(1)}%` : "–";
  $('#stMonthly').textContent = rows.filter(r=>r.d.cycle==="월").length+"개";

  renderRanking(DIV_TOP10,'#divTopBody','div');
  renderRanking(GROWTH_TOP10,'#growthTopBody','growth');

  document.querySelectorAll('thead th').forEach(th=>{
    th.classList.remove('sorted'); const a=th.querySelector('.arr'); if(a)a.textContent='';
    if(th.dataset.sort===state.sort){ th.classList.add('sorted'); if(a)a.textContent=state.sortDir<0?'▼':'▲'; }
  });
  renderPortfolio();
  if(activeProfile) renderAdvisor(activeProfile);
}

/* ============ 전문가 추천 렌더 ============ */
function renderAdvisor(key){
  const p=PROFILES[key]; if(!p) return;
  document.querySelectorAll('.prof').forEach(el=>el.classList.toggle('on', el.dataset.p===key));
  $('#advisorOut').style.display='block';
  const riskCls = p.risk==="low"?"rk-low":p.risk==="high"?"rk-high":"rk-mid";
  $('#advisorComment').innerHTML = `<b>${p.emo} ${p.title}</b><span class="risk-tag ${riskCls}">${p.riskLabel}</span><br>${p.comment}`;

  const invest=getInvest();
  const body=$('#allocBody'); body.innerHTML='';
  let totalInvest=0, totalDiv=0, wSafe=0, wSum=0;
  p.picks.forEach(([tk,w])=>{
    const d=byTicker(tk); if(!d) return;
    const amt=invest*w/100;
    const {shares,edivYear,pk}=derive(d,amt);
    const realInvest=shares*pk;
    totalInvest+=realInvest; totalDiv+=edivYear; wSafe+=d.safety*w; wSum+=w;
    const flag=d.market==="KR"?"🇰🇷":"🇺🇸";
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td><span class="wbar" style="width:${w*1.4}px"></span>${flag} ${d.name} <b style="color:var(--tx3);font-weight:600">${w}%</b></td>
      <td class="num">${fmt(amt)}원</td>
      <td><span class="cyc cyc-${d.cycle}" style="font-size:10px;padding:2px 7px">${d.cycle}</span></td>
      <td><span class="stars" style="font-size:10px">${stars(d.safety)}</span></td>
      <td class="num" style="color:var(--accent2);font-weight:700">${fmt(edivYear)}원</td>`;
    body.appendChild(tr);
  });
  $('#aYield').textContent = (totalInvest>0? totalDiv/totalInvest*100:0).toFixed(2)+"%";
  $('#aYear').textContent = fmt(totalDiv)+"원";
  $('#aMonth').textContent = fmt(totalDiv/12)+"원";
  $('#aSafe').innerHTML = `<span class="stars">${stars(Math.round(wSafe/wSum))}</span> ${(wSafe/wSum).toFixed(1)}`;
}

/* ============ TOP 10 순위 렌더 ============ */
function renderRanking(list, bodyId, mode){
  const invest=getInvest(); const body=$(bodyId); if(!body) return; body.innerHTML='';
  list.forEach((it,i)=>{
    const d=byTicker(it.tk); if(!d) return;
    const amt=invest*it.w/100;
    const yfrac=d.price>0? d.dps/d.price : 0;   // 통화 무관 비율 → KRW 배정금액에 그대로 적용
    const ediv=amt*yfrac;
    const flag=d.market==="KR"?"🇰🇷":"🇺🇸";
    const rank=i+1, medal=rank<=3?'gold':'';
    const cyc=`<span class="cyc cyc-${d.cycle}" style="font-size:10px;padding:2px 7px">${d.cycle}</span>`;
    const yStr=yfrac>0?(yfrac*100).toFixed(2)+'%':'–';
    let cols;
    if(mode==='div'){
      cols=`<td>${cyc}</td>
        <td><span class="yval num">${yStr}</span></td>
        <td class="num" style="color:var(--accent2);font-weight:700">${it.m[0]}</td>
        <td class="num" style="color:var(--tx2)">${it.m[1]}</td>
        <td class="num" style="color:var(--tx2)">${it.m[2]}</td>`;
    }else{
      cols=`<td class="num" style="color:var(--accent2);font-weight:800">${it.m[0]}</td>
        <td class="num" style="color:var(--tx2)">${it.m[1]}</td>
        <td class="num">${it.m[2]}</td>`;
    }
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td class="name"><div style="display:flex;align-items:center;gap:11px">
        <span class="rankno ${medal}">${rank}</span>
        <div><div class="nm" style="font-size:14px">${flag} ${d.name}</div>
        <div class="m5">${it.point}</div></div></div></td>
      ${cols}
      <td class="num"><b>${it.w}%</b></td>
      <td class="num">${fmt(amt)}원</td>
      <td class="num divamt">${ediv>=1?fmt(ediv)+'원':'–'}</td>`;
    body.appendChild(tr);
  });
}

/* ============ 포트폴리오 ============ */
function renderPortfolio(){
  const list=$('#pfList'), total=$('#pfTotal');
  const tickers=Object.keys(portfolio).filter(t=>byTicker(t));
  if(tickers.length===0){
    list.innerHTML='<div class="pf-empty">위 <b>전문가 추천</b>을 담거나, 표에서 <b>[＋담기]</b>로 종목을 추가하세요.<br>배당주기가 다른 종목을 섞으면 매달 배당을 받을 수 있습니다. 📆</div>';
    total.style.display='none'; renderCalendar([]); pfInvested=0; pfYearDiv=0; renderSim(); return;
  }
  list.innerHTML='';
  let invested=0, yearDiv=0; const monthly=Array(12).fill(0);
  tickers.forEach(tk=>{
    const d=byTicker(tk), amt=portfolio[tk];
    const {shares,edivYear,pk}=derive(d,amt);
    invested+=shares*pk; yearDiv+=edivYear;
    if(d.pm.length) d.pm.forEach(m=> monthly[m-1]+= edivYear/d.pm.length);
    const flag=d.market==="KR"?"🇰🇷":"🇺🇸";
    const item=document.createElement('div'); item.className='pf-item';
    item.innerHTML=`
      <div class="pfnm">
        <div class="t">${flag} ${d.name}</div>
        <div class="s"><span class="cyc cyc-${d.cycle}" style="padding:1px 7px;font-size:10px">${d.cycle}</span> ${shares.toLocaleString('ko-KR')}주 · ${yieldOf(d).toFixed(2)}% · <span class="stars" style="font-size:9px">${stars(d.safety)}</span></div>
      </div>
      <input class="wt-inp num" data-wt="${tk}" value="${fmt(amt)}">
      <div class="pfdiv num">${fmt(edivYear)}원</div>
      <button class="rm" data-rm="${tk}" title="제거">✕</button>`;
    list.appendChild(item);
  });
  total.style.display='flex';
  $('#pfInvested').textContent=fmt(invested)+"원";
  $('#pfYield').textContent=(invested>0?yearDiv/invested*100:0).toFixed(2)+"%";
  $('#pfYear').textContent=fmt(yearDiv)+"원";
  $('#pfMonth').textContent=fmt(yearDiv/12)+"원";
  $('#pfAfterTax').textContent=fmt(yearDiv*0.846)+"원";
  renderCalendar(monthly);
  pfInvested=invested; pfYearDiv=yearDiv; renderSim();
}

/* ============ 장기 수익 시뮬레이션 ============ */
function renderSim(){
  const out=$('#simOut'), empty=$('#simEmpty');
  if(pfInvested<=0){ out.style.display='none'; empty.style.display='block'; return; }
  empty.style.display='none'; out.style.display='block';

  const P0=pfInvested, r0=pfYearDiv/P0;
  const g=simState.g/100, a=simState.a/100, N=simState.years, reinvest=simState.reinvest;
  const price0=100; let units=P0/price0; const dpu0=price0*r0;
  let cumDiv=0, cashDiv=0; const series=[{t:0, assets:P0, principal:P0}];
  for(let t=1;t<=N;t++){
    const price=price0*Math.pow(1+a,t);        // 연말 주가
    const dpu=dpu0*Math.pow(1+g,t-1);           // 해당 연도 주당 배당(1년차=현재)
    const income=units*dpu;
    cumDiv+=income;
    if(reinvest) units+=income/price; else cashDiv+=income;
    const mv=units*price;
    series.push({t, assets: mv + (reinvest?0:cashDiv), principal:P0});
  }
  const finalAssets=series[series.length-1].assets;
  const profit=finalAssets-P0;
  const totalRet=profit/P0*100;
  const cagr=(Math.pow(finalAssets/P0,1/N)-1)*100;

  $('#smP0').textContent=fmt(P0)+"원";
  $('#smCumLab').textContent= reinvest? `누적 배당 (재투자, 세전)` : `누적 배당 수익금 (세전)`;
  $('#smCum').textContent=fmt(cumDiv)+"원";
  $('#smFinal').textContent=fmt(finalAssets)+"원";
  $('#smProfit').textContent="+"+fmt(profit)+"원";
  $('#smRet').textContent="+"+totalRet.toFixed(1)+"%";
  $('#smCagr').textContent=cagr.toFixed(2)+"%";
  $('#smDivRet').textContent=(cumDiv/P0*100).toFixed(1)+"%";
  $('#smCumTax').textContent=fmt(cumDiv*0.846)+"원";

  // 차트
  const chart=$('#simChart'); chart.innerHTML='';
  const max=Math.max(...series.map(s=>s.assets));
  series.forEach(s=>{
    const h=Math.max(3, s.assets/max*100);
    const pbaseH=Math.min(100, s.principal/s.assets*100);
    const col=document.createElement('div'); col.className='scol';
    const label = s.t===0? '현재' : s.t+'년';
    col.innerHTML=`<div class="sbar" style="height:${h}%">
        <div class="pbase" style="height:${pbaseH}%"></div>
        <span class="tip">${label}: ${fmt(s.assets)}원</span>
      </div>`;
    chart.appendChild(col);
  });
  $('#simMidLab').textContent = Math.round(N/2)+"년";
  $('#simEndLab').textContent = N+"년";
}

function renderCalendar(monthly){
  const cal=$('#calendar'); cal.innerHTML='';
  const max=Math.max(...monthly,1);
  for(let i=0;i<12;i++){
    const h = monthly[i]>0? Math.max(4, monthly[i]/max*100) : 1.5;
    const col=document.createElement('div'); col.className='calcol';
    col.innerHTML=`<div class="calbar" style="height:${h}%"><span class="tip">${i+1}월 ${fmt(monthly[i])}원</span></div>`;
    cal.appendChild(col);
  }
  const totalY=monthly.reduce((a,b)=>a+b,0), nonZero=monthly.filter(m=>m>0).length;
  $('#calAvg').innerHTML = totalY>0
    ? `연 <b>${fmt(totalY)}원</b> · 배당 발생 <b>${nonZero}개월</b> · 월평균 <b>${fmt(totalY/12)}원</b>`
    : "종목을 담으면 월별 배당 흐름이 표시됩니다.";
}

/* ============ 저장 ============ */
function loadPF(){ try{return JSON.parse(localStorage.getItem('divPF_v2'))||{};}catch(e){return {};} }
function savePF(){ try{localStorage.setItem('divPF_v2',JSON.stringify(portfolio));}catch(e){} }

/* ============ 이벤트 ============ */
$('#investAmt').addEventListener('input',e=>{ const v=parseNum(e.target.value); e.target.value=v?fmt(v):''; render(); });
$('#fxRate').addEventListener('input',e=>{ const v=parseNum(e.target.value); e.target.value=v?v.toLocaleString('ko-KR'):''; render(); });
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{ $('#investAmt').value=fmt(Number(c.dataset.amt)); render(); }));
document.querySelectorAll('.segs').forEach(segs=>segs.addEventListener('click',e=>{
  if(!e.target.classList.contains('seg')) return;
  segs.querySelectorAll('.seg').forEach(s=>s.classList.remove('on'));
  e.target.classList.add('on'); state[segs.dataset.filter]=e.target.dataset.val; render();
}));
$('#searchInp').addEventListener('input',e=>{ state.search=e.target.value; render(); });
$('#sortSel').addEventListener('change',e=>{ state.sort=e.target.value; state.sortDir=(e.target.value==="name")?1:-1; render(); });
document.querySelectorAll('thead th[data-sort]').forEach(th=>th.addEventListener('click',()=>{
  const k=th.dataset.sort;
  if(state.sort===k) state.sortDir*=-1; else { state.sort=k; state.sortDir=(k==="name")?1:-1; }
  const opt=["yield","edivYear","safety","cycleRank","divPerShare","price","name"];
  if(opt.includes(k)) $('#sortSel').value=k;
  render();
}));
// 프로필 선택
document.querySelectorAll('.prof').forEach(el=>el.addEventListener('click',()=>{ activeProfile=el.dataset.p; renderAdvisor(activeProfile); }));
// 추천 → 포트폴리오 담기
$('#applyBtn').addEventListener('click',()=>{
  if(!activeProfile) return;
  const invest=getInvest(); portfolio={};
  PROFILES[activeProfile].picks.forEach(([tk,w])=>{ if(byTicker(tk)) portfolio[tk]=Math.round(invest*w/100); });
  savePF(); render();
  $('#pfSection').scrollIntoView({behavior:'smooth', block:'start'});
});
// 담기/제거/비중조정 (위임)
document.body.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]');
  if(add){ const tk=add.dataset.add;
    if(portfolio.hasOwnProperty(tk)) delete portfolio[tk];
    else { const d=byTicker(tk); portfolio[tk]=Math.max(priceKRW(d), Math.round(getInvest()*.2)); }
    savePF(); render(); return; }
  const rm=e.target.closest('[data-rm]');
  if(rm){ delete portfolio[rm.dataset.rm]; savePF(); render(); return; }
});
document.body.addEventListener('input',e=>{
  const wt=e.target.closest('[data-wt]');
  if(wt){ const v=parseNum(wt.value); wt.value=v?fmt(v):''; portfolio[wt.dataset.wt]=v; savePF(); renderPortfolio(); }
});
// TOP 10 → 포트폴리오 담기
function applyRanking(list){
  const inv=getInvest(); portfolio={};
  list.forEach(it=>{ if(byTicker(it.tk)) portfolio[it.tk]=Math.round(inv*it.w/100); });
  savePF(); render(); $('#pfSection').scrollIntoView({behavior:'smooth', block:'start'});
}
$('#applyDivTop').addEventListener('click',()=>applyRanking(DIV_TOP10));
$('#applyGrowthTop').addEventListener('click',()=>applyRanking(GROWTH_TOP10));

// 수익 시뮬레이션 컨트롤
$('#simYears').addEventListener('click',e=>{ if(!e.target.dataset.y) return;
  $('#simYears').querySelectorAll('.seg').forEach(s=>s.classList.remove('on')); e.target.classList.add('on');
  simState.years=Number(e.target.dataset.y); renderSim(); });
$('#simReinvest').addEventListener('click',e=>{ if(e.target.dataset.r===undefined||!e.target.classList.contains('seg')) return;
  $('#simReinvest').querySelectorAll('.seg').forEach(s=>s.classList.remove('on')); e.target.classList.add('on');
  simState.reinvest=(e.target.dataset.r==="1"); renderSim(); });
$('#simG').addEventListener('input',e=>{ simState.g=Number(e.target.value); $('#simGval').textContent=e.target.value+"%"; renderSim(); });
$('#simA').addEventListener('input',e=>{ simState.a=Number(e.target.value); $('#simAval').textContent=e.target.value+"%"; renderSim(); });

// 테마
const themeBtn=$('#themeBtn');
function applyTheme(t){ document.documentElement.classList.toggle('light',t==='light'); themeBtn.textContent=t==='light'?'☀️ 라이트':'🌙 다크'; try{localStorage.setItem('divTheme',t);}catch(e){} }
themeBtn.addEventListener('click',()=>applyTheme(document.documentElement.classList.contains('light')?'dark':'light'));
applyTheme((()=>{try{return localStorage.getItem('divTheme')||'dark';}catch(e){return 'dark';}})());

render();


/* ====================================================================
   실시간 데이터 적용 — Next.js 서버(/api/stocks)에서 지난 금요일 종가·
   배당금·환율을 받아 위 DATA 의 price/dps 를 덮어씁니다.
   실패 시 위에 내장된 기준값(폴백)으로 그대로 표시됩니다.
   ==================================================================== */
function applyLive(live){
  if(!live) return;
  try{
    if(live.prices){
      DATA.forEach(function(d){
        var p = live.prices[d.ticker];
        if(!p) return;
        if(typeof p.price === 'number' && p.price > 0) d.price = p.price;
        if(typeof p.dps === 'number' && p.dps >= 0) d.dps = p.dps;
      });
    }
    if(typeof live.fx === 'number' && live.fx > 0){
      var fxEl = document.getElementById('fxRate');
      if(fxEl) fxEl.value = Math.round(live.fx).toLocaleString('ko-KR');
    }
    if(live.asofLabel){
      var a = document.querySelector('.asof');
      if(a) a.innerHTML = '📅 데이터 기준: <b style="color:var(--tx2)">' + live.asofLabel +
        '</b> · 매주 자동 갱신 · 투자금액·환율 조정 시 예상 배당금 실시간 반영';
    }
  }catch(e){ console.warn('applyLive failed', e); }
}

// 최초엔 내장 기준값으로 즉시 렌더 → 이후 실시간 값으로 재렌더
fetch('/api/stocks')
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(live){ applyLive(live); render(); })
  .catch(function(e){ console.warn('live fetch failed', e); });

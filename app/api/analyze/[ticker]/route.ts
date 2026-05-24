import { NextRequest, NextResponse } from 'next/server';

type Contract = { symbol:string; type:'call'|'put'; strike:number; expiration:string; dte:number; bid:number; ask:number; mid:number; iv:number; delta:number; gamma:number; theta:number; vega:number; volume:number; open_interest:number; };

function demoMarket(ticker:string) {
  ticker = ticker.toUpperCase();
  const prices:Record<string,number> = { TSLA:178.5, NVDA:945.2, SPY:529.1, QQQ:451.3, AAPL:190.15 };
  const price = prices[ticker] ?? 250;
  const exp = new Date(Date.now() + 24*86400000).toISOString().slice(0,10);
  const earnings = new Date(Date.now() + 18*86400000).toISOString().slice(0,10);
  const strikes = [Math.round(price*.94), Math.round(price*.97), Math.round(price), Math.round(price*1.03), Math.round(price*1.06)];
  const contracts:Contract[] = [];
  for (const strike of strikes) {
    const distance = Math.abs(strike-price)/price;
    const near = Math.max(.05, 1-distance*8);
    const callDelta = Math.min(.88, Math.max(.12, .5 + ((price-strike)/price)*5));
    const callMid = Math.max(.5, price*.035*near);
    contracts.push({symbol:`${ticker}_${exp}_${strike}C`, type:'call', strike, expiration:exp, dte:24, bid:+(callMid*.96).toFixed(2), ask:+(callMid*1.04).toFixed(2), mid:+callMid.toFixed(2), iv:.48, delta:+callDelta.toFixed(2), gamma:+(.018*near).toFixed(4), theta:+(-.055*near).toFixed(3), vega:+(.11*near).toFixed(3), volume:Math.round(2500*near+120), open_interest:Math.round(9000*near+500)});
    const putDelta = -Math.min(.88, Math.max(.12, .5 + ((strike-price)/price)*5));
    const putMid = Math.max(.5, price*.032*near);
    contracts.push({symbol:`${ticker}_${exp}_${strike}P`, type:'put', strike, expiration:exp, dte:24, bid:+(putMid*.96).toFixed(2), ask:+(putMid*1.04).toFixed(2), mid:+putMid.toFixed(2), iv:.51, delta:+putDelta.toFixed(2), gamma:+(.017*near).toFixed(4), theta:+(-.052*near).toFixed(3), vega:+(.1*near).toFixed(3), volume:Math.round(2100*near+100), open_interest:Math.round(8200*near+450)});
  }
  return {ticker, underlying_price:price, iv_rank:42, iv_percentile:58, earnings_date:earnings, days_to_earnings:18, contracts};
}

function spreadPct(c:Contract){return c.mid<=0?999:((c.ask-c.bid)/c.mid)*100}
function liquidityScore(c:Contract){let s=0;if(c.open_interest>=1000)s+=35;if(c.volume>=300)s+=30;if(spreadPct(c)<=12)s+=25;if(Math.abs(c.delta)>=.35)s+=10;return Math.min(s,100)}
function classifyIv(r:number,p:number){const a=(r+p)/2;if(a<25)return'LOW';if(a<55)return'MEDIUM';if(a<75)return'HIGH';return'EXTREME'}
function rankContracts(contracts:Contract[], fast:boolean){return contracts.map(c=>{let score=liquidityScore(c);if(fast){if(Math.abs(c.delta)>=.35&&Math.abs(c.delta)<=.7)score+=25;if(c.dte<=45)score+=10}if(spreadPct(c)>20)score-=30;return{...c,score}}).sort((a,b)=>b.score-a.score).slice(0,6)}
function strategyList(contracts:Contract[], ivRank:number, ivPct:number, days:number, fast:boolean){
  const state=classifyIv(ivRank,ivPct), top=rankContracts(contracts,fast), near=days<=21, out:any[]=[];
  if((state==='LOW'||state==='MEDIUM')&&near)out.push({name:'Long Call / Long Put near ATM',score:fast?86:76,bias:'Directional / Event expansion',why:['IV ليس مرتفعاً جداً مقارنة بالسابق.','وجود حدث قريب قد يدعم توسع الحركة أو IV قبل الإعلان.','Fast Profit Mode يفضل Delta أعلى وStrike قريب.'],risks:['إذا لم يتحرك الأصل سريعاً، Theta يضغط العقد.','بعد الإعلان قد يحدث IV Crush.'],preferred_contracts:top.slice(0,2).map((c:any)=>c.symbol)});
  if((state==='MEDIUM'||state==='HIGH')&&!near)out.push({name:'Credit Vertical Spread',score:80,bias:'Income / Defined risk',why:['IV متوسط أو مرتفع يعطي Premium أفضل.','المخاطرة محددة مقارنة ببيع عقد عاري.','Theta غالباً لصالح الصفقة.'],risks:['الربح محدود.','الحركة القوية ضد اتجاه السبريد ترفع الخسارة بسرعة.'],preferred_contracts:top.slice(0,4).map((c:any)=>c.symbol)});
  if(near&&(state==='MEDIUM'||state==='HIGH'))out.push({name:'Strangle / Straddle',score:74,bias:'Volatility movement',why:['حدث قريب قد يسبب حركة قوية في أحد الاتجاهين.','مفيد عندما الاتجاه غير واضح لكن الحركة متوقعة.'],risks:['يحتاج حركة كافية لتغطية تكلفة العقدين.','IV Crush بعد الحدث قد يضر الصفقة.'],preferred_contracts:top.slice(0,4).map((c:any)=>c.symbol)});
  if(fast){const call=top.find((c:any)=>c.type==='call');if(call)out.push({name:'Fast Profit Call Candidate',score:70,bias:'Fast turnover',why:['اختيار قريب من ATM/Near ITM بدلاً من OTM بعيد.','مناسب لأسلوب تدوير رأس المال بسرعة.'],risks:['تكلفة العقد أعلى.','يحتاج إدارة خروج أسرع.'],preferred_contracts:[call.symbol]})}
  return out.sort((a,b)=>b.score-a.score).slice(0,3);
}

export async function GET(req:NextRequest,{params}:{params:{ticker:string}}){
  const fast=req.nextUrl.searchParams.get('fastProfit')!=='false';
  const m=demoMarket(params.ticker);
  return NextResponse.json({ticker:m.ticker,underlying_price:m.underlying_price,iv_state:classifyIv(m.iv_rank,m.iv_percentile),iv_rank:m.iv_rank,iv_percentile:m.iv_percentile,earnings_date:m.earnings_date,days_to_earnings:m.days_to_earnings,expected_move:+(m.underlying_price*.48*Math.sqrt(24/365)).toFixed(2),market_notes:['Demo data الآن. الخطوة التالية: ربط Tradier API للبيانات الحقيقية.',fast?'Fast Profit Mode مفعل: يفضل ATM / Near ITM وDelta أعلى.':'Fast Profit Mode غير مفعل.'],top_contracts:rankContracts(m.contracts,fast),strategies:strategyList(m.contracts,m.iv_rank,m.iv_percentile,m.days_to_earnings,fast)});
}

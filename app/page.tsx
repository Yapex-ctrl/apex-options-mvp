'use client';
import { useState } from 'react';

export default function Home() {
  const [ticker, setTicker] = useState('TSLA');
  const [fastProfit, setFastProfit] = useState(true);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    try {
      const res = await fetch(`/api/analyze/${ticker}?fastProfit=${fastProfit}`);
      setData(await res.json());
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container" dir="rtl">
      <section className="hero">
        <h1>Apex Options Intelligence</h1>
        <p className="small">ذكاء احترافي لتحليل عقود الأوبشن، IV، اليونانيات، والاستراتيجيات المركبة.</p>
      </section>

      <div className="card">
        <label>اكتب الرمز</label>
        <input className="input" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} />
        <label style={{ display: 'block', marginTop: 12 }}>
          <input type="checkbox" checked={fastProfit} onChange={(e) => setFastProfit(e.target.checked)} />
          {' '}Fast Profit Mode — تفضيل ATM / Near ITM بدل OTM بعيد
        </label>
        <button className="button" onClick={analyze}>{loading ? 'جاري التحليل...' : 'Analyze'}</button>
      </div>

      {data && (
        <>
          <div className="card">
            <h2>{data.ticker} — Market State <span className="source">{data.source}</span></h2>
            <div className="grid">
              <div className="kpi"><div className="small">السعر</div><b>${data.underlying_price}</b></div>
              <div className="kpi"><div className="small">IV State</div><b>{data.iv_state}</b></div>
              <div className="kpi"><div className="small">IV Rank</div><b>{data.iv_rank}%</b></div>
              <div className="kpi"><div className="small">IV Percentile</div><b>{data.iv_percentile}%</b></div>
              <div className="kpi"><div className="small">Expiration</div><b>{data.expiration}</b></div>
              <div className="kpi"><div className="small">DTE</div><b>{data.dte}</b></div>
              <div className="kpi"><div className="small">Expected Move</div><b>±${data.expected_move}</b></div>
            </div>
            {data.market_notes.map((n: string, i: number) => <p className="warn" key={i}>⚠ {n}</p>)}
          </div>

          <div className="card">
            <h2>Top Contracts</h2>
            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>Contract</th><th>Type</th><th>Strike</th><th>Bid</th><th>Ask</th><th>Mid</th><th>IV</th><th>Delta</th><th>Gamma</th><th>Theta</th><th>Vega</th><th>Vol</th><th>OI</th><th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_contracts.map((c: any) => (
                    <tr key={c.symbol}>
                      <td>{c.symbol}</td><td>{c.type}</td><td>{c.strike}</td><td>{c.bid}</td><td>{c.ask}</td><td>{c.mid}</td><td>{Math.round(c.iv*100)}%</td><td>{c.delta}</td><td>{c.gamma}</td><td>{c.theta}</td><td>{c.vega}</td><td>{c.volume}</td><td>{c.open_interest}</td><td>{c.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2>Top Strategy Suggestions</h2>
            {data.strategies.map((s: any) => (
              <div className="kpi" key={s.name} style={{ marginBottom: 12 }}>
                <h3>{s.name} — Score {s.score}</h3>
                <p className="small">{s.bias}</p>
                <b>السبب:</b><ul>{s.why.map((w: string) => <li key={w}>{w}</li>)}</ul>
                <b>المخاطر:</b><ul>{s.risks.map((r: string) => <li key={r}>{r}</li>)}</ul>
                <p className="small">العقود المفضلة: {s.preferred_contracts.join(', ')}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

'use client';
import { useState } from 'react';

export default function Home() {
  const [ticker, setTicker] = useState('TSLA');

  return (
    <main className="container" dir="rtl">
      <section className="hero">
        <h1>Apex Options Intelligence v0.4</h1>
        <p className="small">Institutional Flow Dashboard — نسخة واجهة أولية احترافية</p>
      </section>

      <div className="card">
        <label>الرمز</label>
        <input className="input" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} />

        <div className="grid" style={{ marginTop: 14 }}>
          <div className="kpi"><div className="small">Trader Style</div><b>Intraday</b></div>
          <div className="kpi"><div className="small">Expiry Context</div><b>0DTE Flow</b></div>
          <div className="kpi"><div className="small">IV State</div><b>Moderate</b></div>
          <div className="kpi"><div className="small">Expected Move</div><b>±$21.97</b></div>
        </div>
      </div>

      <div className="card">
        <h2>{ticker} — Expiry Flow Dashboard</h2>
        <div className="grid">
          <div className="kpi"><div className="small">Bias</div><b>Mixed Bullish +35</b></div>
          <div className="kpi"><div className="small">Setup</div><b>Flow Conflict</b></div>
          <div className="kpi"><div className="small">Magnet / Pin</div><b>Magnet 737</b></div>
          <div className="kpi"><div className="small">Pin Risk</div><b>High</b></div>
        </div>
        <p className="warn">⚠ Flow يميل للصعود، لكن الإشارات الداخلية غير نظيفة. انتظر قبول السعر فوق مستوى الاختراق قبل التعامل معه كاستمرار صاعد.</p>
      </div>

      <div className="card">
        <h2>Smart Dual Chart System</h2>
        <div className="grid">
          <div className="kpi" style={{ minHeight: 260 }}>
            <h3>Underlying Chart</h3>
            <p className="small">شارت الأصل: {ticker}</p>
            <div style={{ height: 170, border: '1px solid #334155', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Main Asset Chart Placeholder
            </div>
          </div>

          <div className="kpi" style={{ minHeight: 260 }}>
            <h3>Smart Contract Chart</h3>
            <p className="small">العقد المسيطر / الأسرع حركة</p>
            <div style={{ height: 170, border: '1px solid #334155', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Option Premium Chart Placeholder
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Magnet & Key Levels</h2>
        <div className="grid">
          <div className="kpi"><div className="small">Call Wall</div><b>738</b></div>
          <div className="kpi"><div className="small">Put Wall</div><b>736</b></div>
          <div className="kpi"><div className="small">Breakout</div><b>739</b></div>
          <div className="kpi"><div className="small">Breakdown</div><b>735</b></div>
          <div className="kpi"><div className="small">Max Volume Balance</div><b>737</b></div>
          <div className="kpi"><div className="small">Volume Max Pain</div><b>737</b></div>
        </div>
      </div>

      <div className="card">
        <h2>Top Strike Profile</h2>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Strike</th><th>Side</th><th>Volume</th><th>Premium</th><th>Velocity</th><th>Breakeven</th><th>Read</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>738</td><td>Call</td><td>24K</td><td>0.92</td><td>+32%</td><td>738.92</td><td>Breakout Pressure</td></tr>
              <tr><td>737</td><td>Call/Put</td><td>41K</td><td>0.74</td><td>+8%</td><td>Magnet</td><td>Pin / Balance</td></tr>
              <tr><td>736</td><td>Put</td><td>19K</td><td>0.81</td><td>+18%</td><td>735.19</td><td>Put Defense</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2>Strategy Intelligence</h2>
        <div className="grid">
          <div className="kpi">
            <h3>Debit Spread — Score 82</h3>
            <p className="small">أفضل من Long Call منفرد بسبب Flow Conflict وPin Risk عالي.</p>
          </div>
          <div className="kpi">
            <h3>Wait for Breakout — Score 76</h3>
            <p className="small">الدخول يصبح أنظف فوق 739 مع استمرار Velocity.</p>
          </div>
          <div className="kpi">
            <h3>Avoid Far OTM — Risk High</h3>
            <p className="small">الـ Premium قد يتآكل بسرعة قرب Magnet.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

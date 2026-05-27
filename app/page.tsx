'use client';

import { useState } from 'react';

export default function Home() {
  const [ticker, setTicker] = useState('TSLA');

  const underlyingSymbol = `NASDAQ:${ticker}`;
  const optionSymbol = 'OPRA:TSLA250530C00430000';

  const chartUrl = (symbol: string, interval: string) =>
    `https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=${interval}&theme=dark&style=1&toolbarbg=0b0f19&hideideas=1&withdateranges=1&saveimage=0`;

  return (
    <main style={{ background: '#0b0f19', minHeight: '100vh', color: 'white', padding: 24, fontFamily: 'Arial' }} dir="rtl">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <section style={{ background: '#111827', borderRadius: 24, padding: 32, marginBottom: 24, border: '1px solid #1f2937' }}>
          <h1 style={{ fontSize: 46, marginBottom: 10 }}>Apex Options Intelligence v0.5</h1>
          <p style={{ color: '#9ca3af' }}>Institutional Options Flow Terminal — Dual Chart Mode</p>
        </section>

        <section style={{ background: '#111827', borderRadius: 20, padding: 24, marginBottom: 24, border: '1px solid #1f2937' }}>
          <label style={{ display: 'block', marginBottom: 12 }}>الرمز</label>
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            style={{ width: '100%', padding: 16, borderRadius: 12, background: '#0f172a', border: '1px solid #334155', color: 'white', fontSize: 20 }}
          />
        </section>

        <section style={{ background: '#111827', borderRadius: 20, padding: 24, marginBottom: 24, border: '1px solid #1f2937' }}>
          <h2 style={{ fontSize: 32, marginBottom: 24 }}>{ticker} — Expiry Flow Dashboard</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[
              ['Bias', 'Mixed Bullish +35'],
              ['Setup', 'Flow Conflict'],
              ['Magnet / Pin', '737'],
              ['Expected Move', '±21.97'],
            ].map((item, i) => (
              <div key={i} style={{ background: '#0f172a', padding: 20, borderRadius: 16, border: '1px solid #1e293b' }}>
                <div style={{ color: '#94a3b8', marginBottom: 8 }}>{item[0]}</div>
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>{item[1]}</div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 18, color: '#facc15', fontWeight: 'bold' }}>
            ⚠ Flow يميل للصعود، لكن الإشارات الداخلية غير نظيفة. انتظر قبول السعر فوق مستوى الاختراق.
          </p>
        </section>

        <section style={{ background: '#111827', borderRadius: 20, padding: 24, marginBottom: 24, border: '1px solid #1f2937' }}>
          <h2 style={{ fontSize: 32, marginBottom: 24 }}>Smart Dual Chart System</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <h3 style={{ marginBottom: 14 }}>Underlying Asset Chart</h3>
              <div style={{ background: '#0f172a', borderRadius: 18, overflow: 'hidden', border: '1px solid #334155' }}>
                <iframe src={chartUrl(underlyingSymbol, '15')} width="100%" height="420" style={{ border: 'none' }} />
              </div>
              <p style={{ color: '#94a3b8', marginTop: 10 }}>الأصل: {underlyingSymbol}</p>
            </div>

            <div>
              <h3 style={{ marginBottom: 14 }}>Smart Contract Chart</h3>
              <div style={{ background: '#0f172a', borderRadius: 18, overflow: 'hidden', border: '1px solid #334155' }}>
                <iframe src={chartUrl(optionSymbol, '5')} width="100%" height="420" style={{ border: 'none' }} />
              </div>
              <p style={{ color: '#38bdf8', marginTop: 10 }}>العقد التجريبي: {optionSymbol}</p>
            </div>
          </div>
        </section>

        <section style={{ background: '#111827', borderRadius: 20, padding: 24, marginBottom: 24, border: '1px solid #1f2937' }}>
          <h2 style={{ fontSize: 32, marginBottom: 24 }}>Magnet & Key Levels</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
            {[
              ['Call Wall', '738'],
              ['Put Wall', '736'],
              ['Breakout', '739'],
              ['Breakdown', '735'],
              ['Volume Max Pain', '737'],
            ].map((item, i) => (
              <div key={i} style={{ background: '#0f172a', padding: 20, borderRadius: 16, border: '1px solid #1e293b' }}>
                <div style={{ color: '#94a3b8', marginBottom: 8 }}>{item[0]}</div>
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>{item[1]}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#111827', borderRadius: 20, padding: 24, marginBottom: 24, border: '1px solid #1f2937' }}>
          <h2 style={{ fontSize: 32, marginBottom: 24 }}>Top Strike Profile</h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ color: '#94a3b8' }}>
                  <th style={{ padding: 12, borderBottom: '1px solid #334155' }}>Strike</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #334155' }}>Side</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #334155' }}>Volume</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #334155' }}>Premium</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #334155' }}>Velocity</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #334155' }}>Breakeven</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #334155' }}>Read</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['738', 'Call', '24K', '0.92', '+32%', '738.92', 'Breakout Pressure'],
                  ['737', 'Call/Put', '41K', '0.74', '+8%', 'Magnet', 'Pin / Balance'],
                  ['736', 'Put', '19K', '0.81', '+18%', '735.19', 'Put Defense'],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: 12, borderBottom: '1px solid #1e293b', textAlign: 'center' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: '#111827', borderRadius: 20, padding: 24, border: '1px solid #1f2937' }}>
          <h2 style={{ fontSize: 32, marginBottom: 24 }}>Strategy Intelligence</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              ['Debit Spread', 'Score 82', 'أفضل من Long Call منفرد بسبب Flow Conflict وPin Risk عالي.'],
              ['Wait for Breakout', 'Score 76', 'الدخول يصبح أنظف فوق 739 مع استمرار Velocity.'],
              ['Avoid Far OTM', 'Risk High', 'الـ Premium قد يتآكل بسرعة قرب Magnet.'],
            ].map((item, i) => (
              <div key={i} style={{ background: '#0f172a', padding: 24, borderRadius: 16, border: '1px solid #1e293b' }}>
                <div style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10 }}>{item[0]}</div>
                <div style={{ color: '#38bdf8', fontSize: 20, marginBottom: 10 }}>{item[1]}</div>
                <p style={{ color: '#cbd5e1' }}>{item[2]}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

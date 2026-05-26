'use client';

import { useState } from 'react';

export default function Home() {
  const [ticker, setTicker] = useState('TSLA');

  return (
    <main
      style={{
        background: '#0b0f19',
        minHeight: '100vh',
        color: 'white',
        padding: 24,
        fontFamily: 'Arial',
      }}
      dir="rtl"
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {/* HEADER */}
        <section
          style={{
            background: '#111827',
            borderRadius: 24,
            padding: 32,
            marginBottom: 24,
            border: '1px solid #1f2937',
          }}
        >
          <h1 style={{ fontSize: 48, marginBottom: 10 }}>
            Apex Options Intelligence v0.5
          </h1>

          <p style={{ color: '#9ca3af' }}>
            Institutional Options Flow Terminal
          </p>
        </section>

        {/* INPUT */}
        <section
          style={{
            background: '#111827',
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            border: '1px solid #1f2937',
          }}
        >
          <label style={{ display: 'block', marginBottom: 12 }}>
            الرمز
          </label>

          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            style={{
              width: '100%',
              padding: 16,
              borderRadius: 12,
              background: '#0f172a',
              border: '1px solid #334155',
              color: 'white',
              fontSize: 20,
            }}
          />
        </section>

        {/* DASHBOARD */}
        <section
          style={{
            background: '#111827',
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            border: '1px solid #1f2937',
          }}
        >
          <h2 style={{ fontSize: 34, marginBottom: 24 }}>
            {ticker} — Expiry Flow Dashboard
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 16,
            }}
          >
            {[
              ['Bias', 'Mixed Bullish +35'],
              ['Setup', 'Flow Conflict'],
              ['Magnet', '737'],
              ['Expected Move', '±21.97'],
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#0f172a',
                  padding: 20,
                  borderRadius: 16,
                  border: '1px solid #1e293b',
                }}
              >
                <div style={{ color: '#94a3b8', marginBottom: 8 }}>
                  {item[0]}
                </div>

                <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {item[1]}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DUAL CHARTS */}
        <section
          style={{
            background: '#111827',
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            border: '1px solid #1f2937',
          }}
        >
          <h2 style={{ fontSize: 34, marginBottom: 24 }}>
            Smart Dual Chart System
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}
          >
            {/* OPTION CHART */}
            <div>
              <h3 style={{ marginBottom: 14 }}>
                Smart Contract Chart
              </h3>

              <div
                style={{
                  background: '#0f172a',
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: '1px solid #334155',
                }}
              >
                <iframe
                  src={`https://s.tradingview.com/widgetembed/?symbol=NASDAQ:${ticker}&interval=5&theme=dark&style=1&toolbarbg=0b0f19`}
                  width="100%"
                  height="420"
                />
              </div>
            </div>

            {/* MAIN CHART */}
            <div>
              <h3 style={{ marginBottom: 14 }}>
                Underlying Asset Chart
              </h3>

              <div
                style={{
                  background: '#0f172a',
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: '1px solid #334155',
                }}
              >
                <iframe
                  src={`https://s.tradingview.com/widgetembed/?symbol=NASDAQ:${ticker}&interval=15&theme=dark&style=1&toolbarbg=0b0f19`}
                  width="100%"
                  height="420"
                />
              </div>
            </div>
          </div>
        </section>

        {/* MAGNET */}
        <section
          style={{
            background: '#111827',
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            border: '1px solid #1f2937',
          }}
        >
          <h2 style={{ fontSize: 34, marginBottom: 24 }}>
            Magnet & Key Levels
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5,1fr)',
              gap: 16,
            }}
          >
            {[
              ['Call Wall', '738'],
              ['Put Wall', '736'],
              ['Breakout', '739'],
              ['Breakdown', '735'],
              ['Max Pain', '737'],
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#0f172a',
                  padding: 20,
                  borderRadius: 16,
                  border: '1px solid #1e293b',
                }}
              >
                <div style={{ color: '#94a3b8', marginBottom: 8 }}>
                  {item[0]}
                </div>

                <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {item[1]}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STRATEGIES */}
        <section
          style={{
            background: '#111827',
            borderRadius: 20,
            padding: 24,
            border: '1px solid #1f2937',
          }}
        >
          <h2 style={{ fontSize: 34, marginBottom: 24 }}>
            Strategy Intelligence
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 16,
            }}
          >
            {[
              ['Debit Spread', 'Score 82'],
              ['Breakout Momentum', 'Score 76'],
              ['Avoid Far OTM', 'Risk High'],
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#0f172a',
                  padding: 24,
                  borderRadius: 16,
                  border: '1px solid #1e293b',
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}
                >
                  {item[0]}
                </div>

                <div style={{ color: '#38bdf8', fontSize: 22 }}>
                  {item[1]}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

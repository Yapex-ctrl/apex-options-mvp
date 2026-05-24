export const mockOptions = {
  symbol: "TSLA",
  price: 178.5,

  ivRank: 42,
  ivPercentile: 58,
  ivState: "MEDIUM",

  expectedMove: 21.57,

  earningsDate: "2026-06-11",

  contracts: [
    {
      strike: 173,
      type: "call",
      dte: 24,
      iv: 48,
      delta: 0.55,
      theta: -0.041,
      oi: 7282,
      volume: 2004,
      bidAsk: 4.71,
      gamma: 0.08,
      vega: 0.17,
      symbol: "TSLA_2026-06-17_173C"
    },

    {
      strike: 173,
      type: "put",
      dte: 24,
      iv: 51,
      delta: -0.35,
      theta: -0.039,
      oi: 6629,
      volume: 1682,
      bidAsk: 4.3,
      gamma: 0.07,
      vega: 0.15,
      symbol: "TSLA_2026-06-17_173P"
    },

    {
      strike: 179,
      type: "call",
      dte: 24,
      iv: 48,
      delta: 0.49,
      theta: -0.054,
      oi: 9298,
      volume: 2564,
      bidAsk: 6.11,
      gamma: 0.11,
      vega: 0.21,
      symbol: "TSLA_2026-06-17_179C"
    }
  ]
};

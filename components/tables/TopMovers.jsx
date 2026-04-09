"use client";

export default function TopMovers({ gainers = [], losers = [] }) {
  const defaultGainers = gainers.length ? gainers : [
    { symbol: "TATAMOTORS", change: 3.20, price: 780 },
    { symbol: "ICICIBANK", change: 2.01, price: 1125 },
  ];
  const defaultLosers = losers.length ? losers : [
    { symbol: "INFY", change: -1.15, price: 1520 },
    { symbol: "TCS", change: -0.42, price: 3850 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border rounded-lg p-3 bg-white">
        <h4 className="text-sm font-semibold text-green-700 mb-2">Top Gainers</h4>
        {defaultGainers.map((s) => (
          <div key={s.symbol} className="flex justify-between text-sm py-1">
            <span className="font-medium">{s.symbol}</span>
            <span className="text-green-600">+{s.change}%</span>
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-3 bg-white">
        <h4 className="text-sm font-semibold text-red-700 mb-2">Top Losers</h4>
        {defaultLosers.map((s) => (
          <div key={s.symbol} className="flex justify-between text-sm py-1">
            <span className="font-medium">{s.symbol}</span>
            <span className="text-red-600">{s.change}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

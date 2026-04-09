"use client";
import { useState } from "react";

export default function PriceChart({ symbol = "RELIANCE", data = [] }) {
  const [timeframe, setTimeframe] = useState("1D");
  const timeframes = ["1D", "1W", "1M", "3M", "1Y"];

  // Mock data if none provided
  const chartData = data.length > 0 ? data : [
    { time: "09:15", price: 2450 },
    { time: "10:00", price: 2465 },
    { time: "11:00", price: 2458 },
    { time: "12:00", price: 2472 },
    { time: "13:00", price: 2480 },
    { time: "14:00", price: 2475 },
    { time: "15:30", price: 2490 },
  ];

  const min = Math.min(...chartData.map(d => d.price));
  const max = Math.max(...chartData.map(d => d.price));
  const change = chartData.length > 1
    ? chartData[chartData.length - 1].price - chartData[0].price
    : 0;
  const changePercent = chartData.length > 1
    ? ((change / chartData[0].price) * 100).toFixed(2)
    : "0.00";
  const isPositive = change >= 0;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{symbol}</h3>
          <p className="text-2xl font-bold">
            ₹{chartData[chartData.length - 1]?.price?.toLocaleString()}
          </p>
          <p className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "+" : ""}{change.toFixed(2)} ({changePercent}%)
          </p>
        </div>
        <div className="flex gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-1 text-xs rounded ${
                timeframe === tf
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Simple SVG chart placeholder */}
      <svg viewBox="0 0 400 120" className="w-full h-32">
        <polyline
          fill="none"
          stroke={isPositive ? "#16a34a" : "#dc2626"}
          strokeWidth="2"
          points={chartData
            .map((d, i) => {
              const x = (i / (chartData.length - 1)) * 400;
              const y = 120 - ((d.price - min) / (max - min || 1)) * 100 - 10;
              return `${x},${y}`;
            })
            .join(" ")}
        />
      </svg>

      <p className="text-xs text-gray-400 mt-2">
        Timeframe: {timeframe} | Range: ₹{min.toLocaleString()} – ₹{max.toLocaleString()}
      </p>
    </div>
  );
}

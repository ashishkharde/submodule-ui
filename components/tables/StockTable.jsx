"use client";
import { useState } from "react";

export default function StockTable({ stocks = [] }) {
  const [sortKey, setSortKey] = useState("symbol");
  const [sortAsc, setSortAsc] = useState(true);

  const defaultStocks = stocks.length > 0 ? stocks : [
    { symbol: "RELIANCE", price: 2490, change: 1.63, volume: "12.5M", sector: "Energy" },
    { symbol: "TCS", price: 3850, change: -0.42, volume: "5.2M", sector: "IT" },
    { symbol: "HDFCBANK", price: 1680, change: 0.89, volume: "8.1M", sector: "Banking" },
    { symbol: "INFY", price: 1520, change: -1.15, volume: "7.8M", sector: "IT" },
    { symbol: "ICICIBANK", price: 1125, change: 2.01, volume: "9.3M", sector: "Banking" },
  ];

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = [...defaultStocks].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    const cmp = typeof valA === "string" ? valA.localeCompare(valB) : valA - valB;
    return sortAsc ? cmp : -cmp;
  });

  const columns = [
    { key: "symbol", label: "Symbol" },
    { key: "price", label: "Price (₹)" },
    { key: "change", label: "Change %" },
    { key: "volume", label: "Volume" },
    { key: "sector", label: "Sector" },
  ];

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="px-4 py-3 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
              >
                {col.label} {sortKey === col.key ? (sortAsc ? "↑" : "↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((stock) => (
            <tr key={stock.symbol} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="px-4 py-3 font-semibold text-gray-900">{stock.symbol}</td>
              <td className="px-4 py-3">₹{stock.price.toLocaleString()}</td>
              <td className={`px-4 py-3 font-medium ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.change >= 0 ? "+" : ""}{stock.change}%
              </td>
              <td className="px-4 py-3 text-gray-600">{stock.volume}</td>
              <td className="px-4 py-3 text-gray-600">{stock.sector}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

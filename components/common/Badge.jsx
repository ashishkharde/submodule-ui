export default function Badge({ label, variant = "default" }) {
  const styles = {
    bullish: "bg-green-100 text-green-800 border-green-200",
    bearish: "bg-red-100 text-red-800 border-red-200",
    neutral: "bg-gray-100 text-gray-800 border-gray-200",
    default: "bg-blue-100 text-blue-800 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[variant] || styles.default}`}>
      {label}
    </span>
  );
}

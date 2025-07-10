export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-spin h-5 w-5 rounded-full border-2 border-t-transparent border-current ${className}`}
    />
  );
}

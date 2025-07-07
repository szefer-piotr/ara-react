import { Link, useLocation } from "react-router-dom";
const nav = [
  { to: "/upload", label: "Upload Data" },
  { to: "/plan", label: "Plan" },
  { to: "/chat", label: "Chat" },
  { to: "/report", label: "Report" }
];
export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="w-64 bg-white shadow-xl rounded-tr-2xl rounded-br-2xl p-6 flex flex-col gap-8">
      <div className="text-xl font-bold">AI Research Assistant</div>
      <nav className="flex flex-col gap-3">
        {nav.map(n => (
          <Link
            key={n.to}
            to={n.to}
            className={`px-4 py-2 rounded-lg transition ${
              pathname === n.to
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

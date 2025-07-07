import { Link } from "react-router-dom";

interface NavItem {
  to: string;
  label?: string;
}

export default function StepNavigation({ prev, next }: { prev?: NavItem; next?: NavItem }) {
  return (
    <div className="mt-6 flex justify-between">
      {prev ? (
        <Link
          to={prev.to}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          {prev.label ?? "Back"}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={next.to}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {next.label ?? "Next"}
        </Link>
      )}
    </div>
  );
}

import { useApp } from "../context/AppContext";
import StepNavigation from "../components/StepNavigation";

export default function Plan() {
  const { uploadedFile, summary } = useApp();

  return (
    
    <div className="rounded-2xl shadow-lg bg-white p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Analysis Plan</h2>
      <ol className="list-decimal ml-5 space-y-2">
        <li>Explore data quality & descriptive stats</li>
        <li>Visualise key relationships</li>
        <li>Statistical model/test for the hypothesis</li>
      </ol>
      {uploadedFile ? (
        <div className="mb-4">
          <strong>Dataset:</strong> {uploadedFile.name}
        </div>
      ) : (
        <div className="mb-4 text-gray-400">No dataset uploaded yet.</div>
      )}
      {summary && (
        <div className="mb-4 p-3 rounded bg-yellow-50 text-yellow-800 shadow-inner">
          <strong>Data summary:</strong> {summary}
        </div>
      )}
      {/* Your plan content here */}
      <StepNavigation prev={{ to: "/upload" }} next={{ to: "/chat" }} />
    </div>
  );
}

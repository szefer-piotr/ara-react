import { useApp } from "../context/AppContext";

export default function Plan() {
  const { uploadedFile } = useApp();

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
      {/* Your plan content here */}
    </div>
  );
}

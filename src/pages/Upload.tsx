import { useRef } from "react";
import { useApp } from "../context/AppContext";
import StepNavigation from "../components/StepNavigation";
import Papa from "papaparse";

export default function Upload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { uploadedFile, setUploadedFile, csvPreview, setCsvPreview } = useApp();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setUploadedFile(file);
    setCsvPreview(null);
    if (file) {
      Papa.parse(file, {
        complete: (result: any) => {
          // Limit preview to first 10 rows
          const data = (result.data as string[][]).slice(0, 10);
          setCsvPreview(data);
        },
        error: () => setCsvPreview(null),
      });
    }
  }

  return (
    <div className="rounded-2xl shadow-lg bg-white p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload your dataset</h2>
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        onChange={handleFileChange}
        className="mb-4"
      />
      {uploadedFile ? (
        <div className="mt-4 p-3 rounded bg-green-50 text-green-800 shadow-inner">
          Selected file: <strong>{uploadedFile.name}</strong>
        </div>
      ) : (
        <div className="mt-4 text-gray-400">No file selected yet.</div>
      )}

      {/* CSV Preview */}
      {csvPreview && csvPreview.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 text-gray-700 font-semibold">Preview (first {csvPreview.length} rows):</div>
          <div className="overflow-auto max-w-full">
            <table className="min-w-full border border-gray-200 rounded shadow text-xs">
              <thead>
                <tr>
                  {csvPreview[0].map((col, i) => (
                    <th key={i} className="px-2 py-1 bg-gray-100 border-b border-r">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvPreview.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-2 py-1 border-b border-r">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <StepNavigation next={{ to: "/plan" }} />
    </div>
  );
}

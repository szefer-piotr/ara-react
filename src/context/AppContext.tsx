import { createContext, useContext, useState, type ReactNode } from "react";

// Global application state including CSV preview and its summary
type AppState = {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  csvPreview: string[][] | null;
  setCsvPreview: (data: string[][] | null) => void;
  summary: string | null;
  setSummary: (text: string | null) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][] | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ uploadedFile, setUploadedFile, csvPreview, setCsvPreview, summary, setSummary }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

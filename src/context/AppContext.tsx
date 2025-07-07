import React, { createContext, useContext, useState, ReactNode } from "react";

// Add csvPreview to AppState
type AppState = {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  csvPreview: string[][] | null;
  setCsvPreview: (data: string[][] | null) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][] | null>(null);

  return (
    <AppContext.Provider value={{ uploadedFile, setUploadedFile, csvPreview, setCsvPreview }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

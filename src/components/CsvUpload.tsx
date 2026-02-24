import { useCallback, useState } from "react";
import { Upload, FileText } from "lucide-react";

interface CsvUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function CsvUpload({ onFileSelect, isLoading }: CsvUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".csv")) {
        return;
      }
      setFileName(file.name);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all cursor-pointer ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      }`}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) handleFile(file);
        };
        input.click();
      }}
    >
      {isLoading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Processing CSV…</p>
        </div>
      ) : fileName ? (
        <div className="flex flex-col items-center gap-3">
          <FileText className="h-10 w-10 text-primary" />
          <p className="text-sm font-medium text-foreground">{fileName}</p>
          <p className="text-xs text-muted-foreground">
            Drop another file to replace
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Drop your CoinSpot <code>orderhistory.csv</code> here
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              or click to browse — all processing is done locally in your
              browser
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import FileUpload from "./file-upload";

const FileUploadUsage = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = async (filesToUpload: File[]) => {
    console.log("Simulating upload to S3:", filesToUpload);
    // Here you would typically send the files to your server or directly to S3
    // For this example, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Upload complete");
    // Clear files after upload
    setFiles([]);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-2">
      <FileUpload
        maxFiles={3}
        maxSize={10 * 1024 * 1024} // 10MB
        accept={{
          "application/pdf": [".pdf"],
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [".docx"],
          "text/plain": [".txt"],
        }}
        onUpload={handleFileUpload}
        files={files}
        onFilesChange={setFiles}
      />
    </main>
  );
};

export default FileUploadUsage;

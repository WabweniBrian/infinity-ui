"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, Upload, File, AlertCircle } from "lucide-react";

interface FileUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  onUpload?: (files: File[]) => Promise<void>;
  files?: File[];
  onFilesChange?: (files: File[]) => void;
}

const FileUpload = ({
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "text/plain": [".txt"],
  },
  onUpload,
  files: externalFiles,
  onFilesChange,
}: FileUploadProps) => {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );
  const [error, setError] = useState<string | null>(null);

  const files = externalFiles || internalFiles;
  const setFiles = onFilesChange || setInternalFiles;

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles
          .map((file) => file.errors.map((e: any) => e.message))
          .flat();
        setError(errors.join(". "));
        return;
      }

      if (acceptedFiles.length + files.length > maxFiles) {
        setError(`You can only upload a maximum of ${maxFiles} files.`);
        return;
      }

      setFiles([...files, ...acceptedFiles]);
      setError(null);
    },
    [files, maxFiles, setFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length,
  });

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  const uploadFiles = async () => {
    if (!onUpload) {
      console.error("onUpload function is not provided");
      return;
    }

    // Reset progress
    setUploadProgress({});

    // Simulate S3 upload for each file
    const uploadPromises = files.map(async (file) => {
      const totalChunks = 10;
      for (let i = 0; i < totalChunks; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: Math.round(((i + 1) / totalChunks) * 100),
        }));
      }
    });

    try {
      await Promise.all(uploadPromises);
      await onUpload(files);
      // Clear files after successful upload if using internal state
      if (!externalFiles) {
        setFiles([]);
      }
      setUploadProgress({});
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed. Please try again.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const totalProgress = files.length
    ? Math.round(
        Object.values(uploadProgress).reduce((a, b) => a + b, 0) / files.length,
      )
    : 0;

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border bg-white p-6 shadow-md dark:bg-gray-900">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? "border-[#11ACBB] bg-primary/10"
            : "hover:border-[#11ACBB]"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag &apos;n&apos; drop some files here, or click to select files
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          (Max {maxFiles} files, up to {formatFileSize(maxSize)} each)
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="break-words">{error}</AlertDescription>
        </Alert>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between rounded-lg bg-gray-100 p-2 dark:bg-accent/50"
            >
              <div className="flex flex-grow items-center space-x-2">
                <File className="h-6 w-6 flex-shrink-0 text-blue-500" />
                <div className="min-w-0 flex-grow">
                  <span className="block truncate text-sm font-medium">
                    {trimFileName(file.name, 30)}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              {uploadProgress[file.name] !== undefined && (
                <Progress
                  value={uploadProgress[file.name]}
                  className="mr-2 h-1 w-20"
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(file)}
                className="flex-shrink-0 text-muted-foreground hover:text-red-500"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6">
          <Button
            onClick={uploadFiles}
            className="w-full"
            disabled={Object.keys(uploadProgress).length > 0}
          >
            {Object.keys(uploadProgress).length > 0
              ? `Uploading... ${totalProgress}%`
              : `Upload ${files.length} file${files.length === 1 ? "" : "s"}`}
          </Button>
          {totalProgress > 0 && totalProgress < 100 && (
            <Progress value={totalProgress} className="mt-2 h-2" />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

// Utility Function to trim file name --------------------------------------------------
const trimFileName = (fileName: string, maxLength: number): string => {
  if (fileName.length <= maxLength) {
    return fileName; // No need to trim
  }

  const extensionIndex = fileName.lastIndexOf(".");
  const extension = fileName.substring(extensionIndex); // Get file extension including dot

  // Calculate the length of the filename excluding the extension
  const fileNameWithoutExtension = fileName.substring(0, extensionIndex);
  const availableLengthForFileName = maxLength - extension.length - 3; // -3 for the dots (...)

  // Trim the filename and append dots and extension
  const trimmedFileName =
    fileNameWithoutExtension.substring(0, availableLengthForFileName) + "...";

  return trimmedFileName + extension;
};

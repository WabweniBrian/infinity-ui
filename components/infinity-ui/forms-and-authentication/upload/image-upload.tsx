"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  maxFiles?: number;
  maxSize?: number;
  onUpload?: (files: File[]) => Promise<void>;
  images?: File[];
  onImagesChange?: (images: File[]) => void;
}

const ImageUpload = ({
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  onUpload,
  images: externalImages,
  onImagesChange,
}: ImageUploadProps) => {
  const [internalImages, setInternalImages] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const images = externalImages || internalImages;
  const setImages = onImagesChange || setInternalImages;

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles
          .map((file) => file.errors.map((e: any) => e.message))
          .flat();
        setError(errors.join(". "));
        return;
      }

      if (acceptedFiles.length + images.length > maxFiles) {
        setError(
          `You can only upload a maximum of ${maxFiles} image${maxFiles === 1 ? "" : "s"}.`,
        );
        return;
      }

      setImages([...images, ...acceptedFiles]);
      setError(null);
    },
    [images, maxFiles, setImages],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize,
    maxFiles: maxFiles - images.length,
  });

  useEffect(() => {
    // Create preview URLs for the images
    const imageUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews(imageUrls);

    // Clean up the preview URLs when the component unmounts
    return () => imageUrls.forEach(URL.revokeObjectURL);
  }, [images]);

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const uploadImages = async () => {
    if (!onUpload) {
      console.error("onUpload function is not provided");
      return;
    }

    // Reset progress
    setUploadProgress({});

    // Simulate upload for each image
    const uploadPromises = images.map(async (image, index) => {
      const totalChunks = 10;
      for (let i = 0; i < totalChunks; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay
        setUploadProgress((prev) => ({
          ...prev,
          [index]: Math.round(((i + 1) / totalChunks) * 100),
        }));
      }
    });

    try {
      await Promise.all(uploadPromises);
      await onUpload(images);
      // Clear images after successful upload if using internal state
      if (!externalImages) {
        setImages([]);
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

  const totalProgress = images.length
    ? Math.round(
        Object.values(uploadProgress).reduce((a, b) => a + b, 0) /
          images.length,
      )
    : 0;

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border bg-white p-6 shadow-md dark:bg-gray-900">
      {images.length < maxFiles && (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            isDragActive
              ? "border-[#11ACBB] bg-primary/10"
              : "hover:border-[#11ACBB]"
          }`}
        >
          <input {...getInputProps()} />
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag &apos;n&apos; drop{" "}
            {maxFiles === 1 ? "an image" : "some images"} here, or click to
            select {maxFiles === 1 ? "an image" : "images"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            (Max {maxFiles} image{maxFiles === 1 ? "" : "s"}, up to{" "}
            {formatFileSize(maxSize)} each)
          </p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="breask-words">{error}</AlertDescription>
        </Alert>
      )}

      {images.length > 0 && (
        <div
          className={`mt-6 ${maxFiles === 1 ? "" : "grid grid-cols-4 gap-3"}`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative ${maxFiles === 1 ? "h-64 w-full" : "h-20"}`}
            >
              <Image
                src={previews[index]}
                alt={`Preview ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
              {uploadProgress[index] !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 text-xs text-white">
                  <Progress value={uploadProgress[index]} className="h-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-6">
          <Button
            onClick={uploadImages}
            className="w-full"
            disabled={Object.keys(uploadProgress).length > 0}
          >
            {Object.keys(uploadProgress).length > 0
              ? `Uploading... ${totalProgress}%`
              : `Upload ${images.length} image${images.length === 1 ? "" : "s"}`}
          </Button>
          {totalProgress > 0 && totalProgress < 100 && (
            <Progress value={totalProgress} className="mt-2 h-2" />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

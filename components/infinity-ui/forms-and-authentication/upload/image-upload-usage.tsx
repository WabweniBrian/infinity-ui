"use client";

import { useState } from "react";
import ImageUpload from "./image-upload";

const ImageUploadUsage = () => {
  const [singleImage, setSingleImage] = useState<File[]>([]);
  const [multipleImages, setMultipleImages] = useState<File[]>([]);

  const handleImageUpload = async (imagesToUpload: File[]) => {
    console.log("Simulating upload to server:", imagesToUpload);
    // Here you would typically send the images to your server
    // For this example, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Upload complete");
    // Clear images after upload
    setSingleImage([]);
    setMultipleImages([]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-2 py-10">
      <div className="m-8 w-full max-w-md">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Single Image Upload
        </h2>
        <ImageUpload
          maxFiles={1}
          maxSize={5 * 1024 * 1024} // 5MB
          onUpload={handleImageUpload}
          images={singleImage}
          onImagesChange={setSingleImage}
        />
      </div>
      <div className="w-full max-w-md">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Multiple Image Upload
        </h2>
        <ImageUpload
          maxFiles={4}
          maxSize={5 * 1024 * 1024} // 5MB
          onUpload={handleImageUpload}
          images={multipleImages}
          onImagesChange={setMultipleImages}
        />
      </div>
    </main>
  );
};

export default ImageUploadUsage;

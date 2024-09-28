"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { SingleImageDropzone } from "./single-image-dropzone";

export function ImageUpload({
  setImage,
  className,
}: {
  setImage: Dispatch<SetStateAction<string>>;
  className?: string;
}) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<
    "PENDING" | "COMPLETE" | "ERROR" | number
  >("PENDING");

  return (
    <div>
      <SingleImageDropzone
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
        className={className}
      />
      <Button
        variant="secondary"
        className="mt-2 w-full"
        onClick={async () => {
          if (file) {
            try {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: async (newProgress) => {
                  setProgress(newProgress);
                  if (newProgress === 100) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setProgress("COMPLETE");
                  }
                },
              });
              setImage(res.url);
            } catch (err) {
              setProgress("ERROR");
            }
          }
        }}
        disabled={!file || progress !== "PENDING"}
      >
        {progress === "PENDING"
          ? "Upload"
          : progress === "COMPLETE"
            ? "Done"
            : typeof progress === "number"
              ? `Uploading (${Math.round(progress)}%)`
              : "Error"}
      </Button>
    </div>
  );
}

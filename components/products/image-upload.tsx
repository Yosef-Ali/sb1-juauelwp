"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  className?: string;
}

export function ImageUpload({ images, onImagesChange, className }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onImagesChange([...images, ...acceptedFiles]);
  }, [images, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    }
  });

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
          isDragActive && "border-primary bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        <ImageIcon className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drag & drop images here, or click to select
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((file, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { FormDescription, FormMessage } from "@/components/ui/form";

interface ImageUploadProps {
  onChange: (imageUrl: string | null) => void;
  value?: string;
  resourceType?: string;
  id?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
}

export function ImageUpload({
  onChange,
  value,
  resourceType = 'general',
  id = 'image-upload',
  description,
  error,
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(value || null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a temporary preview
    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Include resourceType for organizing files in S3 folders
      if (resourceType && resourceType.trim() !== '') {
        formData.append('resourceType', resourceType);
      }
      
      // Upload the image to API which will forward to S3
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload image');
      }

      // Set the S3 image URL returned from the API
      setImagePreview(result.imageUrl);
      onChange(result.imageUrl);
      
      // Clean up temporary preview
      URL.revokeObjectURL(localPreview);
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      setImagePreview(null);
      onChange(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    onChange(null);
    const fileInput = document.getElementById(id) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="space-y-2">
      {!imagePreview ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => !disabled && document.getElementById(id)?.click()}
        >
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Klik untuk upload gambar</p>
          <p className="text-xs text-gray-400">(JPG, PNG, maksimal 5MB)</p>
          <input
            id={id}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
            onChange={handleImageChange}
            disabled={disabled || isUploading}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="relative h-48 w-full rounded-lg overflow-hidden">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              // Add unoptimized prop for external S3 URLs
              unoptimized={imagePreview?.startsWith('https://') || false}
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          {!disabled && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white shadow-md border border-gray-200"
              onClick={handleRemoveImage}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      
      {description && <FormDescription>{description}</FormDescription>}
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
}
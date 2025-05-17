"use client"

import { useState, useEffect } from "react";
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  // Add useEffect to handle initial value
  useEffect(() => {
    if (value) {
      setImagePreview(value);
      setImageLoadError(false);
    }
  }, [value]);

  const handleImageError = () => {
    setImageLoadError(true);
    setUploadError('Tidak dapat memuat gambar. Silakan coba unggah ulang.');
    console.error('Failed to load image:', imagePreview);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    // Reset previous errors
    setUploadError(null);
    
    // Check if file exists
    if (!file) {
      setUploadError('Silakan pilih file gambar terlebih dahulu');
      return;
    }

    // Check file type before uploading
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Format file tidak sesuai. Hanya file JPG, PNG, dan WEBP yang diperbolehkan');
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadError('Ukuran file terlalu besar. Maksimal 5MB');
      return;
    }

    // Create a temporary preview
    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      if (resourceType && resourceType.trim() !== '') {
        formData.append('resourceType', resourceType);
      }
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengunggah gambar');
      }

      URL.revokeObjectURL(localPreview);
      setImagePreview(result.imageUrl);
      onChange(result.imageUrl);
      
    } catch (error: unknown) {
      console.error('Error uploading image:', error);
      URL.revokeObjectURL(localPreview);
      setImagePreview(null);
      onChange(null);
      
      // More specific error messages
      let errorMessage = 'Gagal mengunggah gambar';
      if (error instanceof Error) {
        if (error.message.includes('Access Denied')) {
          errorMessage = 'Akses ditolak. Mohon periksa kembali konfigurasi S3';
        } else {
          errorMessage = error.message;
        }
      }
      setUploadError(errorMessage);
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
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            uploadError 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-primary'
          }`}
          onClick={() => !disabled && document.getElementById(id)?.click()}
        >
          <Upload className={`h-10 w-10 ${uploadError ? 'text-red-400' : 'text-gray-400'}`} />
          <p className={`mt-2 text-sm ${uploadError ? 'text-red-500' : 'text-gray-500'}`}>
            Klik untuk upload gambar
          </p>
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
              priority={true}
              unoptimized={true}
              onError={handleImageError}
              className={`transition-opacity duration-300 ${
                imageLoadError ? 'opacity-50' : 'opacity-100'
              }`}
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
            {imageLoadError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <p className="text-sm text-red-500 bg-white/90 px-4 py-2 rounded mb-2">
                    Gambar tidak dapat dimuat
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setImageLoadError(false);
                      setImagePreview(value || null);
                    }}
                  >
                    Coba Lagi
                  </Button>
                </div>
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
      {(error || uploadError) && (
        <FormMessage className="text-sm font-medium text-red-500">
          {error || uploadError}
        </FormMessage>
      )}
    </div>
  );
}
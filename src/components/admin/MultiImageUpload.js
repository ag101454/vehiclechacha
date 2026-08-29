'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, AlertCircle, Plus } from 'lucide-react';

export default function MultiImageUpload({ images = [], onChange, maxImages = 3 }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setError('');
    setUploading(true);

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
        if (!allowedTypes.includes(file.type)) {
          setError(`Invalid file type: ${file.type}. Only JPEG, PNG, WebP, and AVIF are allowed.`);
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          setError('File too large. Maximum size is 5MB.');
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok && data.success) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        const newImages = [...images, ...uploadedUrls].slice(0, maxImages);
        onChange(newImages);
        setError('');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect({ target: { files } });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(maxImages)].map((_, index) => {
          const image = images[index];
          
          return image ? (
            <div key={index} className="relative aspect-[16/10] bg-chacha-black rounded-lg overflow-hidden border border-chacha-border">
              <Image
                src={image}
                alt={`Vehicle image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                title="Remove image"
              >
                <X size={14} />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 bg-chacha-yellow text-chacha-black text-xs px-2 py-1 rounded font-medium">
                  Main Image
                </span>
              )}
            </div>
          ) : (
            <div
              key={index}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="aspect-[16/10] border-2 border-dashed border-chacha-border rounded-lg flex items-center justify-center cursor-pointer hover:border-chacha-yellow transition-colors bg-chacha-black/50"
            >
              {uploading && index === images.length ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="text-chacha-yellow animate-spin mb-2" size={24} />
                  <p className="text-chacha-muted text-xs">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Plus className="text-chacha-muted mb-1" size={24} />
                  <p className="text-chacha-muted text-xs text-center">
                    {index === 0 ? 'Add Main Image' : `Add Image ${index + 1}`}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileSelect}
        className="hidden"
        multiple
      />

      <p className="text-chacha-muted text-xs mt-2">
        Upload up to {maxImages} images. First image will be the main image. PNG, JPG, WebP up to 5MB each.
      </p>

      {error && (
        <div className="flex items-start gap-2 mt-2 text-red-500 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

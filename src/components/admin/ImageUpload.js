'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, AlertCircle } from 'lucide-react';

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Selected file:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Reset error
    setError('');

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type: ${file.type}. Only JPEG, PNG, WebP, and AVIF are allowed.`);
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    setUploading(true);

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file...');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);

      const data = await response.json();
      console.log('Upload response data:', data);

      if (response.ok && data.success) {
        console.log('Upload successful, URL:', data.url);
        onChange(data.url);
      } else {
        setError(data.message || 'Upload failed');
        setPreview(value || '');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Upload failed: ' + error.message);
      setPreview(value || '');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        handleFileSelect({ target: { files: dataTransfer.files } });
      }
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <div className="relative aspect-video bg-chacha-black rounded-lg overflow-hidden border border-chacha-border">
            <Image
              src={preview}
              alt="Vehicle preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={handleDrop}
          className="border-2 border-dashed border-chacha-border rounded-lg p-8 text-center cursor-pointer hover:border-chacha-yellow transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="text-chacha-yellow animate-spin mb-2" size={32} />
              <p className="text-chacha-muted">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="text-chacha-muted mb-2" size={32} />
              <p className="text-white font-medium mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-chacha-muted text-sm">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 mt-2 text-red-500 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
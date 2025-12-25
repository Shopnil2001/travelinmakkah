'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react';

const ImageUploader = ({
  onUpload,
  currentUrl,
  label = "Upload Image",
  maxSizeMB = 5,
  aspectRatio = 16/9,
  className = "",
  required = false, // ← My suggestion: add required prop
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File too large. Max ${maxSizeMB}MB allowed`;
    }
    return null;
  };

  const handleUpload = useCallback(async (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    setError('');

    // Immediate local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      if (data.secure_url) {
        setPreview(data.secure_url);
        onUpload(data.secure_url);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Upload failed. Please try again.');
      setPreview(currentUrl || null); // Revert to original on error
    } finally {
      setUploading(false);
    }
  }, [onUpload, currentUrl]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  const removeImage = (e) => {
    e.stopPropagation(); // Prevent triggering upload
    setPreview(null);
    onUpload(null);
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
        {maxSizeMB && <span className="text-xs text-gray-500 ml-2">(Max {maxSizeMB}MB)</span>}
      </label>

      <div
        className={`
          relative group
          w-full h-64 sm:h-72 bg-gradient-to-br rounded-2xl border-2 transition-all duration-200
          ${dragActive
            ? 'border-emerald-400 bg-emerald-50/50 shadow-lg scale-[1.02]'
            : preview
              ? 'border-emerald-200 bg-emerald-50/30 shadow-md cursor-pointer'
              : 'border-dashed border-gray-300 hover:border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md'
          }
          overflow-hidden hover:shadow-lg
        `}
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onClick={preview ? undefined : triggerUpload} // Only trigger upload if no preview
        style={{ aspectRatio }}
      >
        {/* Preview Image */}
        {preview && (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold text-gray-800">
                <X size={18} />
                Change or Remove
              </div>
            </div>

            {/* My suggestion: Clear X button in corner */}
            <button
              onClick={removeImage}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110"
              aria-label="Remove image"
            >
              <X size={18} />
            </button>
          </>
        )}

        {/* Upload Placeholder */}
        {!preview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-emerald-600" />
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              {dragActive ? 'Drop image here' : 'Click or drag image here'}
            </p>
            <p className="text-sm text-gray-500">PNG, JPG, WebP up to {maxSizeMB}MB</p>
          </div>
        )}

        {/* Uploading Overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
              <p className="text-lg font-semibold text-gray-700">Uploading...</p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        required={required}
      />

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm">
          <AlertCircle size={18} />
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
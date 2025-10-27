'use client';

import { useState, useCallback } from 'react';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept?: string;
  maxSize?: number; // en MB
  required?: boolean;
  error?: string;
  helperText?: string;
  onChange: (file: File | null) => void;
}

export default function FileUpload({
  label,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 5,
  required = false,
  error,
  helperText,
  onChange,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    []
  );

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`Le fichier ne doit pas dépasser ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    onChange(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {!file ? (
        <div
          className={`upload-zone ${isDragging ? 'active' : ''} ${
            error ? 'border-red-500' : ''
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id={`file-upload-${label}`}
            className="hidden"
            accept={accept}
            onChange={handleChange}
          />
          <label
            htmlFor={`file-upload-${label}`}
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-700 mb-1">
              Cliquez pour téléverser ou glissez-déposez
            </p>
            <p className="text-xs text-gray-500">
              {accept.replace(/\./g, '').toUpperCase()} (MAX. {maxSize}Mo)
            </p>
          </label>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-congo-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} Mo
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}



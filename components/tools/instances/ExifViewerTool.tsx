"use client";

import React, { useState, useRef } from 'react';
import exifr from 'exifr';
import { Camera, Image as ImageIcon, Download, Trash2, MapPin, AlertCircle, RefreshCw } from 'lucide-react';

export default function ExifViewerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [exifData, setExifData] = useState<Record<string, any> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setIsProcessing(true);

    try {
      // Parse EXIF data using exifr
      const data = await exifr.parse(selectedFile, {
        tiff: true,
        exif: true,
        gps: true,
        xmp: true,
        icc: false
      });
      
      setExifData(data || {});
    } catch (err) {
      console.error(err);
      setError('Failed to extract EXIF data. The file might be corrupted or in an unsupported format.');
      setExifData({});
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        const fakeEvent = { target: { files: [droppedFile] } } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileUpload(fakeEvent);
      } else {
        setError('Please drop a valid image file.');
      }
    }
  };

  const stripMetadataAndDownload = () => {
    if (!previewUrl || !file) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Painting to canvas strips all EXIF metadata natively
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          setError("Failed to process image.");
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const nameParts = file.name.split('.');
        const ext = nameParts.pop();
        a.download = `${nameParts.join('.')}-stripped.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, file.type, 1.0); // Maintain 100% quality
    };
    img.src = previewUrl;
  };

  const reset = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setExifData(null);
    setError(null);
  };

  const hasGpsData = exifData?.latitude && exifData?.longitude;
  const hasAnyData = exifData && Object.keys(exifData).length > 0;

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!file && (
        <div 
          className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:bg-gray-800/50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Camera className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Upload Photo</h3>
          <p className="text-gray-400 mb-6">Drag and drop your image here, or click to browse.</p>
          <p className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
            <AlertCircle className="w-4 h-4" /> 100% Local Processing. Your photo never leaves your device.
          </p>
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            accept="image/jpeg, image/png, image/webp, image/heic"
            onChange={handleFileUpload} 
          />
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Results Area */}
      {file && previewUrl && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar: Image Preview & Actions */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-medium text-gray-200 truncate pr-4">{file.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <div className="bg-black/50 p-4 flex justify-center items-center min-h-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-[300px] object-contain rounded" />
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 space-y-3">
              <h3 className="font-medium text-gray-200 mb-2">Privacy Actions</h3>
              
              <button
                onClick={stripMetadataAndDownload}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Strip Metadata & Download
              </button>
              
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 px-4 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Upload New Photo
              </button>
              
              <p className="text-xs text-gray-500 text-center leading-relaxed mt-4">
                Stripping will save a new, clean version of your photo to your device. The original file remains untouched.
              </p>
            </div>
          </div>

          {/* Main Content: EXIF Data */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Extracted Metadata</h2>
              </div>

              {isProcessing ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : !hasAnyData ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-lg">
                  <p className="text-gray-400">No EXIF data found in this image.</p>
                  <p className="text-sm text-gray-500 mt-2">This photo may have already been sanitized or downloaded from a platform (like Facebook/Twitter) that automatically strips metadata.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* High Risk Data Warning */}
                  {hasGpsData && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-4">
                      <div className="bg-red-500/20 p-2 rounded-full mt-1">
                        <MapPin className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-red-400 font-medium mb-1">Privacy Warning: GPS Location Found</h4>
                        <p className="text-sm text-gray-400">This photo contains precise geographical coordinates. Anyone you share this file with can see exactly where it was taken.</p>
                      </div>
                    </div>
                  )}

                  {/* Data Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
                        <tr>
                          <th className="px-4 py-3 rounded-tl-lg">EXIF Tag</th>
                          <th className="px-4 py-3 rounded-tr-lg">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(exifData).map(([key, value], idx) => {
                          // Format output for complex objects or arrays
                          let displayValue = "";
                          if (value === null || value === undefined) {
                            displayValue = "null";
                          } else if (value instanceof Date) {
                            displayValue = value.toLocaleString();
                          } else if (Array.isArray(value) || typeof value === 'object') {
                            displayValue = JSON.stringify(value);
                          } else {
                            displayValue = String(value);
                          }

                          return (
                            <tr key={key} className={`border-b border-gray-800 ${idx % 2 === 0 ? 'bg-black/20' : 'bg-transparent'} hover:bg-gray-800/30`}>
                              <td className="px-4 py-3 font-medium text-gray-300 w-1/3">{key}</td>
                              <td className="px-4 py-3 text-gray-400 break-words font-mono text-xs">{displayValue}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

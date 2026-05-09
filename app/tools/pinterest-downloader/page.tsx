'use client'
import React, { useState } from 'react'
import { Download, Image as ImageIcon, Search, Loader2, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'
import JSZip from 'jszip'

interface Pin {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

export default function PinterestDownloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState<Pin[]>([])
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)

  const fetchPins = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setPins([]);

    try {
      const res = await fetch(`/api/pinterest/fetch?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const extractedPins: Pin[] = [];

      // Helper to safely extract images from common Pinterest structures
      const processItem = (item: any) => {
        if (item?.images) {
          extractedPins.push({
            id: item.id || Math.random().toString(36).substr(2, 9),
            title: item.title || item.grid_title || 'Untitled Pin',
            url: item.images.orig?.url || item.images['736x']?.url || item.images['max']?.url,
            thumbnail: item.images['236x']?.url || item.images['474x']?.url
          });
        }
      };

      // 1. Try to find board items
      const boardItems = data.resource_responses?.[0]?.data?.results || data.page_props?.data?.board?.pins?.items;
      if (Array.isArray(boardItems)) {
        boardItems.forEach(processItem);
      } 
      // 2. Try single pin
      else if (data.page_props?.data?.pin) {
        processItem(data.page_props.data.pin);
      }
      // 3. Deep search fallback
      else {
        const deepSearch = (obj: any) => {
          if (!obj || typeof obj !== 'object') return;
          if (obj.images && (obj.images.orig || obj.images['736x'])) {
            processItem(obj);
          } else {
            Object.values(obj).forEach(val => deepSearch(val));
          }
        };
        deepSearch(data);
      }

      // Filter duplicates and invalid entries
      const uniquePins = Array.from(new Map(extractedPins.filter(p => p.url).map(p => [p.url, p])).values());
      
      if (uniquePins.length === 0) {
        throw new Error('No public images found. Make sure the link is public.');
      }

      setPins(uniquePins);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch images. Please check the URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAll = async () => {
    if (pins.length === 0) return;
    setDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("pinterest-downloads");

      const downloadPromises = pins.map(async (pin, index) => {
        try {
          const response = await fetch(pin.url);
          const blob = await response.blob();
          const fileName = `${pin.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${index}.jpg`;
          folder?.file(fileName, blob);
        } catch (e) {
          console.error(`Failed to download image ${index}`);
        }
      });

      await Promise.all(downloadPromises);
      const content = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `pinterest_collection_${new Date().getTime()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Bulk download failed. You can still save images individually.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Pinterest Downloader" slug="pinterest-downloader" />
      <ToolSchema 
        name="Pinterest Image & Board Downloader" 
        description="Download high-resolution images and entire boards from Pinterest instantly. No registration or extensions required."
        slug="pinterest-downloader"
        steps={[
          "Paste the Pinterest Pin or Board URL into the input field.",
          "Click the search icon to fetch all available images.",
          "Preview the images in the interactive grid.",
          "Click 'Download All as ZIP' or save individual images."
        ]}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-lg shadow-red-500/20">
              <Download className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Pinterest Downloader</h1>
              <p className="text-gray-500 dark:text-slate-400">Save high-quality images and boards in one click</p>
            </div>
          </div>
          
          {pins.length > 0 && (
            <button 
              onClick={handleDownloadAll}
              disabled={downloading}
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5 group-hover:bounce" />}
              <span>{downloading ? 'Creating ZIP...' : `Download ${pins.length} Images (ZIP)`}</span>
            </button>
          )}
        </div>

        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Search className="w-6 h-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchPins()}
                placeholder="Paste Pinterest URL..."
                className="w-full py-5 sm:py-6 pl-16 sm:pl-20 pr-6 bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-3xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none dark:text-white text-base sm:text-lg transition-[border-color,box-shadow] shadow-xl"
              />
            </div>
            <button 
              onClick={fetchPins}
              disabled={loading || !url}
              className="px-8 py-5 bg-red-600 text-white font-bold rounded-3xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-red-600/20 shrink-0 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5 sm:hidden" /> Fetch Images</>}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {pins.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {pins.map((pin) => (
              <div key={pin.id} className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100 dark:border-slate-800">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={pin.thumbnail} 
                    alt={pin.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <div className="flex gap-2">
                      <a 
                        href={pin.url} 
                        download 
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 bg-white text-gray-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-3 h-3" /> Save
                      </a>
                      <a 
                        href={`https://pinterest.com/pin/${pin.id}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{pin.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && (
          <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-[3rem]">
            <div className="p-6 bg-gray-100 dark:bg-slate-900 rounded-full mb-4">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ready to download?</h3>
            <p className="text-gray-500 dark:text-slate-500 mt-2">Paste a Pinterest link above to see the magic</p>
          </div>
        )}

        <AdSlot className="mt-12" />

        <ToolInfo 
          title="Ultimate Pinterest Downloader"
          description="The WebToolkit Pro Pinterest Downloader is a professional-grade utility designed for creators, designers, and researchers. It allows you to bypass the manual 'Save Image As' process and download high-resolution assets from single Pins or entire Boards in seconds."
          howItWorks="Our tool uses an advanced proxy engine to fetch the metadata associated with any public Pinterest URL. It extracts the original 'master' image URLs (which are often hidden in the source code) and presents them in a clean, interactive gallery for easy saving."
          features={[
            "Bulk Board Downloading (Save up to 100 images at once)",
            "Automatic Original Resolution detection",
            "ZIP Packaging for easy organization",
            "No login or browser extensions required",
            "Works on mobile, tablet, and desktop",
            "Secure and privacy-focused proxy fetching"
          ]}
          faqs={[
            {
              q: "Can I download entire Pinterest Boards?",
              a: "Yes! Simply paste the URL of the board, and our tool will scan all visible pins and offer them for bulk download in a single ZIP file."
            },
            {
              q: "Is it legal to download images from Pinterest?",
              a: "Downloading images for personal use, research, or inspiration is generally permitted. However, you should always respect the original creator's copyright and license terms if you plan to use the images commercially."
            },
            {
              q: "Why can't I download from a private board?",
              a: "Our tool respects privacy. It can only access content that is publicly available on the web. If a board or pin is set to private, our scraper will not be able to see it."
            },
            {
              q: "What is the quality of the downloaded images?",
              a: "We always prioritize the 'Original' or '736x' resolution, which are the highest quality versions Pinterest stores. You will get much better quality than a simple screenshot."
            }
          ]}
        />
      </div>
    </div>
  )
}

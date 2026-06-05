import { useState, useCallback, useRef, useEffect } from 'react';
import { imageApi } from '../api/imageApi';
import type { ProductImage } from '../Data/image';
import type { ProductSlug } from '../Data/slug';
import { getProducts } from "../api/productApi";

// const PRODUCTS = [
//   { slug: 'gaming-laptop', id: 'e3f8f66f-1234-5678-abcd-000000000001' },
//   { slug: 'wireless-mouse', id: 'e3f8f66f-1234-5678-abcd-000000000002' },
//   { slug: 'mechanical-keyboard', id: 'e3f8f66f-1234-5678-abcd-000000000003' },
// ];

export default function ImageUploadDashboard() {
  //const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<ProductImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [productSlugs, setProductSlugs] = useState<ProductSlug[]>([]); //since this is an array, we cant directly select productSlugs.productId, we need to map or iterate the array to do this
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchSlugs() {
      try {
        const slugs = await imageApi.getProductSlugs();
        console.log("API Response:", slugs);
        setProductSlugs(slugs);
      } catch (e) {
        console.error("Failed to fetch product slugs:", e);
      }
    }
    fetchSlugs();
  }, []); //[]-> Runs once when the page loads.
  

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const result = await imageApi.upload(file, selectedProductId);
      const images = await imageApi.getImageValues(selectedProductId);

      setUploadedImages(images);
      setFile(null);
      setPreview(null);

      console.log("Uploaded:", result);
    } catch (e: any) {
      setError(e.message ?? 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };


  const handleSlugChange = async (slug: string) => {
    const slugObj = productSlugs.find(p => p.productSlug === slug);
    console.log("Selected slug:", slug, "Found product:", slugObj);
    if (!slugObj) {
      setError("Product not found");
      return;
    }

    setSelectedProductId(slugObj.productId);
    setSelectedSlug(slug);
    setFile(null);
    setPreview(null);
    setError(null);

    try {
      const images = await imageApi.getImageValues(slugObj.productId);
      setUploadedImages(images);
      console.log("Fetched images for product:", images);
    } catch (e: any) {
      setError(e.message ?? 'GET Images failed.');
    }
    // Fetch existing images for this product
    //imageApi.getByProduct(product.id).then(setUploadedImages).catch(console.error);
  };

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) { setError('Only image files are supported.'); return; }
    if (f.size > 10 * 1024 * 1024) { setError('File must be under 10 MB.'); return; }
    setError(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const copyPath = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (productId: string) => {
    try {
      await imageApi.deleteImage(productId);
      const images = await imageApi.getImageValues(productId);
      setUploadedImages(images);
      console.log("Deleted");
      //setUploadedImages(prev => prev.filter(i => i.id !== img.id));
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const formatSize = (bytes: number) =>
    bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Product Image Management</h1>
          <p className="text-sm text-gray-500 mt-1">Upload images and save paths to database</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Upload Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">

            {/* Product selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Product slug</label>
              <select
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedSlug}
                onChange={e => handleSlugChange(e.target.value)}
              >
                <option value="">
                  Select Product
                </option>

                {productSlugs.map(p => (
                  <option key={p.productId} value={p.productSlug}> {p.productSlug} </option>
                ))}
              </select>
            </div>

            {/* Product ID (readonly) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Product ID</label>
              <input
                readOnly
                className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-400 font-mono select-all"
                value={selectedProductId}
              />
            </div>

            {/* Drop zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Image</label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
                  ${preview ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}
                onDrop={onDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                {preview ? (
                  <div className="space-y-2">
                    <img src={preview} alt="preview" className="mx-auto max-h-40 rounded-lg object-contain" />
                    <p className="text-xs text-gray-500">{file?.name} · {file && formatSize(file.size)}</p>
                    <p className="text-xs text-indigo-500">Click to change</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-3xl">🖼️</div>
                    <p className="text-sm text-gray-600">Drag & drop or <span className="text-indigo-600 font-medium">choose any file</span></p>
                    <p className="text-xs text-gray-400">PNG, JPG, WebP · up to 10 MB</p>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400
                text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {uploading ? (
                <><span className="animate-spin">⏳</span> Uploading…</>
              ) : 'Upload Image'}
            </button>
          </div>

          {/* Uploaded images list */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-sm font-medium text-gray-700">
              Uploaded images
              {uploadedImages.length > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
                  {uploadedImages.length}
                </span>
              )}
            </h2>

            {uploadedImages.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No images yet for this product
              </div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {uploadedImages.map(img => (
                  <div key={img.imageId} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 group">
                    <img
                      src={`${API_BASE_URL}${img.imageUrl}`}
                      alt={img.fileName}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{img.fileName}</p>
                      {/* <p className="text-xs text-gray-400">{formatSize(img.fileSize)}</p> */}
                      <p className="text-xs text-gray-400 font-mono truncate">{img.imageUrl}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => copyPath(img.imageUrl, img.imageId)}
                        className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        title="Copy image URL"
                      >
                        {copiedId === img.imageId ? '✓' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleDelete(selectedProductId)}
                        className="text-xs px-2 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100"
                        title="Delete"
                      >
                        Del
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* How to use the URL */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-600 mb-2">Using the image path in your React app</p>
          <pre className="text-xs bg-gray-50 rounded-lg p-3 text-gray-700 overflow-x-auto">
{`// The imageUrl from DB is a fully-qualified URL in both dev and prod
<img src={product.imageUrl} alt={product.name} />`}
          </pre>
        </div>

      </div>
    </div>
  );
}
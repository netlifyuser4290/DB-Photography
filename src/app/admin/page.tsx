
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type Photo = {
  public_id: string;
  url: string;
  secure_url: string;
  created_at: string;
  context?: {
    title?: string;
    description?: string;
    category?: string;
    show_on_home?: string;
    show_in_recent?: string;
  };
};

export default function AdminPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState<{ [key: string]: number }>({});

  async function fetchPhotos() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/photos");
      if (!res.ok) throw new Error("Failed to fetch");
      const { resources } = await res.json();
      setPhotos(resources);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  const getTitleForFile = (file: File) => {
    if (title.trim()) return title.trim();
    return file.name.replace(/\.[^/.]+$/, "") || "Untitled";
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      alert("Please select one or more images to upload.");
      return;
    }

    setUploading(true);
    setFileUploadProgress({});
    setUploadProgress({ current: 0, total: imageFiles.length });

    const uploadPromises = imageFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "/api/admin/photos", true);
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              setFileUploadProgress((prev) => ({ ...prev, [file.name]: percentComplete }));
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              setFileUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
              setUploadProgress((prev) => ({ ...prev, current: prev.current + 1 }));
              resolve(xhr.response);
            } else {
              reject(new Error(xhr.statusText));
            }
          };

          xhr.onerror = () => reject(new Error(xhr.statusText));

          const body = JSON.stringify({
            file: reader.result,
            title: getTitleForFile(file),
            description,
            category,
          });

          xhr.send(body);
        };
        reader.onerror = (error) => reject(error);
      });
    });

    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("An error occurred during upload:", error);
      alert("Some files failed to upload.");
    } finally {
      setUploading(false);
      setTitle("");
      setDescription("");
      setCategory("general");
      setFiles([]);
      fetchPhotos(); // Refresh
    }
  };

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList?.length) return;
    const newFiles = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleDelete(publicId: string) {
    if (!confirm("Remove this photo from the portfolio?")) return;

    try {
      await fetch("/api/admin/photos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      fetchPhotos(); // Refresh
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  }

  async function handleToggle(publicId: string, context: any, key: string) {
    try {
      const newValue = !(context?.[key] === 'true');
      await fetch('/api/admin/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, key, value: newValue }),
      });
      fetchPhotos();
    } catch (err) {
      console.error(err);
      alert(`Failed to toggle ${key}`);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-white/10 sticky top-0 bg-gray-900/98 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="font-display text-2xl font-medium tracking-tight">Admin</h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-white/70 hover:text-accent transition-colors text-sm tracking-wide"
            >
              ← Back to Gallery
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="text-white/70 hover:text-red-400 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Add Photos - Bulk upload */}
        <section className="mb-16 p-8 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="font-display text-xl font-medium mb-6">Add Photos</h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/70 mb-2">Title (optional)</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Applied to all selected photos"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white placeholder-white/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white focus:border-accent focus:outline-none transition-all"
                >
                  <option value="general">General</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                  <option value="street">Street</option>
                  <option value="events">Events</option>
                  <option value="wedding">Wedding</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Applied to all selected photos"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white placeholder-white/40 focus:border-accent focus:outline-none resize-none transition-all"
              />
            </div>

            {/* Drag & drop + multi-file */}
            <div>
              <label className="block text-sm text-white/70 mb-2">Photos *</label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                  isDragging
                    ? "border-accent bg-accent/10"
                    : "border-white/20 hover:border-white/40 bg-gray-800/50"
                }`}
              >
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="pointer-events-none">
                  <svg
                    className="w-14 h-14 mx-auto text-white/40 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-white/80 font-medium">
                    Drop images here or click to select multiple
                  </p>
                  <p className="text-white/50 text-sm mt-1">
                    JPEG, PNG, WebP — select as many as you need
                  </p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-white/70">
                    {files.length} file{files.length !== 1 ? "s" : ""} selected
                  </p>
                  <div className="flex flex-col gap-4">
                    {files.map((f, i) => (
                      <div key={`${f.name}-${i}`}>
                        <div
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-sm"
                        >
                          <span className="text-white truncate max-w-[160px]">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="text-red-400 hover:text-red-300 ml-auto"
                            aria-label="Remove"
                          >
                            ×
                          </button>
                        </div>
                        {uploading && (
                           <div className="relative w-full h-2 mt-2 bg-gray-700 rounded-full">
                           <div
                             className="absolute top-0 left-0 h-full bg-accent rounded-full"
                             style={{ width: `${fileUploadProgress[f.name] || 0}%` }}
                           />
                         </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading || files.length === 0}
              className="px-8 py-3.5 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {uploading
                ? `Uploading ${uploadProgress.current}/${uploadProgress.total}…`
                : `Upload ${files.length} photo${files.length !== 1 ? "s" : ""}`}
            </button>
          </form>
        </section>

        {/* Photo list */}
        <section>
          <h2 className="font-display text-xl font-medium mb-6">
            Your Photos <span className="text-white/50 font-normal">({photos.length})</span>
          </h2>
          {loading ? (
            <p className="text-white/50">Loading…</p>
          ) : photos.length === 0 ? (
            <p className="text-white/50">No photos yet. Add some above.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.public_id}
                  className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={photo.secure_url}
                      alt={photo.context?.title || "Photo"}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{photo.context?.title || "Untitled"}</p>
                      <p className="text-sm text-white/60 truncate">
                        {photo.context?.category} • {new Date(photo.created_at).toLocaleDateString()}
                      </p>
                      {photo.context?.show_on_home === 'true' && (
                        <p className="text-sm text-accent font-medium">Shown on Home Page</p>
                      )}
                      {photo.context?.show_in_recent === 'true' && (
                        <p className="text-sm text-accent font-medium">Shown in Recent Work</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={photo.context?.show_on_home === 'true'}
                        onChange={() => handleToggle(photo.public_id, photo.context, 'show_on_home')}
                        className="rounded border-white/20 bg-gray-800 text-accent focus:ring-accent"
                      />
                      Home
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={photo.context?.show_in_recent === 'true'}
                        onChange={() => handleToggle(photo.public_id, photo.context, 'show_in_recent')}
                        className="rounded border-white/20 bg-gray-800 text-accent focus:ring-accent"
                      />
                      Recent Work
                    </label>
                    <button
                      onClick={() => handleDelete(photo.public_id)}
                      className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

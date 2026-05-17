
import { promises as fs } from 'fs';
import path from 'path';

const cacheFilePath = path.join(process.cwd(), 'photocache.json');
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface CacheData {
  timestamp: number;
  photos: any[];
}

export async function getCachedPhotos(): Promise<any[] | null> {
  try {
    const data = await fs.readFile(cacheFilePath, 'utf-8');
    const cache: CacheData = JSON.parse(data);
    const isCacheStale = Date.now() - cache.timestamp > CACHE_DURATION_MS;
    if (isCacheStale) {
      return null;
    }
    return cache.photos;
  } catch (error) {
    return null; // Cache miss or error reading file
  }
}

export async function setCachedPhotos(photos: any[]): Promise<void> {
  const cache: CacheData = {
    timestamp: Date.now(),
    photos,
  };
  await fs.writeFile(cacheFilePath, JSON.stringify(cache), 'utf-8');
}

export async function clearPhotoCache(): Promise<void> {
  try {
    await fs.unlink(cacheFilePath);
  } catch (error: any) {
    if (error.code !== 'ENOENT') { // Ignore if file doesn't exist
      console.error('Error clearing photo cache:', error);
    }
  }
}

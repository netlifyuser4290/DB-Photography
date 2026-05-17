
import { cloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';
import { getCachedPhotos, setCachedPhotos, clearPhotoCache } from '@/lib/photocache';

// GET photos
export async function GET() {
  try {
    const cachedPhotos = await getCachedPhotos();
    if (cachedPhotos) {
      return NextResponse.json({ resources: cachedPhotos });
    }

    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      max_results: 500,
      context: true,
    });
    
    const parsedResources = resources.map((resource: any) => {
      let context = {};
      if (resource.context && resource.context.custom) {
        context = Object.fromEntries(Object.entries(resource.context.custom));
      }
      return {
        ...resource,
        context,
      };
    });

    parsedResources.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    await setCachedPhotos(parsedResources);

    return NextResponse.json({ resources: parsedResources });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}

// POST to upload a new photo
export async function POST(req: Request) {
  try {
    const { file, title, description, category } = await req.json();
    
    const result = await cloudinary.uploader.upload(file, {
      folder: `db-studio/${category}`,
      context: {
        title,
        description: description || '',
        category,
        show_on_home: 'false',
        show_in_recent: 'false',
      },
    });

    await clearPhotoCache();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// DELETE a photo by public_id
export async function DELETE(req: Request) {
  try {
    const { publicId } = await req.json();
    if (!publicId) {
      return NextResponse.json({ error: 'publicId is required' }, { status: 400 });
    }
    
    await cloudinary.uploader.destroy(publicId);
    
    await clearPhotoCache();

    return NextResponse.json({ message: 'Photo deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

// PUT to update a photo's context by public_id
export async function PUT(req: Request) {
  try {
    const { publicId, key, value } = await req.json();
    if (!publicId || !key) {
      return NextResponse.json({ error: 'publicId and key are required' }, { status: 400 });
    }

    // Use explicit update to set context
    const result = await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      context: `${key}=${value}`,
    });

    await clearPhotoCache();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

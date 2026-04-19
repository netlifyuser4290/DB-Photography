
import { cloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

// GET photos
export async function GET() {
  try {
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'db-studio',
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

    return NextResponse.json({ resources: parsedResources }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json({ error: 'Error fetching photos' }, { 
        status: 500,
        headers: {
            'Cache-Control': 'no-store',
        }
    });
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

    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// PUT to update photo context (e.g., toggle show_on_home)
export async function PUT(req: Request) {
  try {
    const { publicId, key, value } = await req.json();
    if (!publicId || !key || typeof value === 'undefined') {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    const contextStr = `${key}=${value.toString()}`;
    await cloudinary.uploader.add_context(contextStr, [publicId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Context update error:', error);
    return NextResponse.json({ error: 'Context update failed' }, { status: 500 });
  }
}

// DELETE a photo
export async function DELETE(req: Request) {
    try {
        const { publicId } = await req.json();
        if (!publicId) {
            return NextResponse.json({ error: 'Missing publicId' }, { status: 400 });
        }
        await cloudinary.uploader.destroy(publicId);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}

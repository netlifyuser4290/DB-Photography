
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { publicId, key, value } = await req.json();

  if (!publicId || !key) {
    return NextResponse.json({ error: 'publicId and key are required' }, { status: 400 });
  }

  try {
    // To safely update a single context field, we first fetch the existing metadata.
    const resource = await cloudinary.api.resource(publicId, { context: true });
    
    // Merge the existing context with the new value.
    const currentContext = resource.context?.custom || {};
    const updatedContext = { ...currentContext, [key]: String(value) };

    // Update the asset with the complete new context.
    await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      context: updatedContext,
    });

    return NextResponse.json({ message: 'Photo updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Update failed', details: errorMessage }, { status: 500 });
  }
}


import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { publicId } = await req.json();

  if (!publicId) {
    return NextResponse.json({ error: 'publicId is required' }, { status: 400 });
  }

  try {
    await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Deletion error:', error);
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }
}

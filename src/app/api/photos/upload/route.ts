
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { file, title, description } = await req.json();

  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(file, {
      folder: 'db-studio',
      context: {
        alt: title,
        caption: description,
      },
    });

    return NextResponse.json({ public_id, secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

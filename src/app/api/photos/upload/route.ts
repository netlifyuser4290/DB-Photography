
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { filename, contentType, size } = await req.json();

  if (!filename || !contentType || !size) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const public_id = `db-studio/${filename}`;

  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id,
        folder: 'db-studio',
        tags: 'db-studio-gallery', // Add a tag for easy filtering
      },
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({
      timestamp,
      signature,
      public_id,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error("Error signing upload request:", error);
    return NextResponse.json({ error: "Failed to sign upload request" }, { status: 500 });
  }
}

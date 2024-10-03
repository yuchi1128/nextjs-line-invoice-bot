import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  try {
    const { profileImageUrl } = await req.json();

    const response = await fetch(profileImageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const processedImage = await sharp(buffer)
      .resize(210, 210, {
        fit: 'cover',
        position: 'center',
      })
      .grayscale()
      .threshold(128)
      .tint({ r: 255, g: 0, b: 0 })
      .blur(0.5)
      .toBuffer();

    const circleShape = Buffer.from(
      `<svg width="220" height="220"><circle cx="110" cy="110" r="100" fill="white"/></svg>`
    );

    const outerCircle = Buffer.from(
      `<svg width="220" height="220">
        <circle cx="110" cy="110" r="106" fill="none" stroke="black" stroke-width="4"/> <!-- 外側の円 -->
        <circle cx="110" cy="110" r="98" fill="none" stroke="black" stroke-width="2"/> <!-- 内側の円 -->
      </svg>`
    );

    const hankoImage = await sharp({
      create: {
        width: 220,
        height: 220,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      }
    })
    .composite([
      {
        input: processedImage,
        top: 5,
        left: 5,
        blend: 'over'
      },
      {
        input: circleShape,
        blend: 'dest-in'
      },
      {
        input: outerCircle,
        top: 0,
        left: 0,
      }
    ])
    .png()
    .toBuffer();

    return new NextResponse(JSON.stringify({
      hankoImage: `data:image/png;base64,${hankoImage.toString('base64')}`
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error processing image:', error);
    let errorMessage = 'Image processing failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

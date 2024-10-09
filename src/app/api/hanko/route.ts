import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { profileImageUrl } = await req.json();
    const response = await fetch(profileImageUrl);
    if (!response.ok) {
      throw new Error(`画像の取得に失敗しました: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 画像処理の修正部分
    const processedImage = await sharp(buffer)
      .resize(200, 200, { fit: 'cover', position: 'center' })
      .threshold(128)
      .toColorspace('b-w')
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = processedImage;
    const pixelArray = new Uint8ClampedArray(data);
    const newPixelArray = new Uint8ClampedArray(info.width * info.height * 4);

    for (let i = 0; i < pixelArray.length; i++) {
      const pixelValue = pixelArray[i];
      const newIndex = i * 4;
      if (pixelValue === 0) {
        // 黒のピクセルを赤に変換
        newPixelArray[newIndex] = 255;     // R
        newPixelArray[newIndex + 1] = 0;   // G
        newPixelArray[newIndex + 2] = 0;   // B
        newPixelArray[newIndex + 3] = 255; // A
      } else {
        // 白のピクセルは白のまま
        newPixelArray[newIndex] = 255;     // R
        newPixelArray[newIndex + 1] = 255; // G
        newPixelArray[newIndex + 2] = 255; // B
        newPixelArray[newIndex + 3] = 255; // A
      }
    }

    const newImageBuffer = await sharp(Buffer.from(newPixelArray), {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
      .png()
      .toBuffer();

    const circleShape = Buffer.from(
      `<svg width="220" height="220"><circle cx="110" cy="110" r="95" fill="white"/></svg>`
    );

    const outerCircle = Buffer.from(
      `<svg width="220" height="220">
        <circle cx="110" cy="110" r="107" fill="none" stroke="red" stroke-width="6"/>
        <circle cx="110" cy="110" r="93" fill="none" stroke="red" stroke-width="4"/>
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
        { input: newImageBuffer, top: 10, left: 10 },
        { input: circleShape, blend: 'dest-in' },
        { input: outerCircle, top: 0, left: 0 }
      ])
      .blur(0.3)
      .png()
      .toBuffer();

    // Supabaseに画像をアップロード
    const fileName = `${uuidv4()}.png`;
    const { error: uploadError } = await supabase.storage
      .from('hanko-images')
      .upload(fileName, hankoImage, {
        contentType: 'image/png',
      });

    if (uploadError) {
      throw new Error(`Supabaseへの画像アップロードに失敗しました: ${uploadError.message}`);
    }

    // 画像のパブリックURLを取得
    const publicUrlResponse = supabase.storage
      .from('hanko-images')
      .getPublicUrl(fileName);

    if (!publicUrlResponse.data || !publicUrlResponse.data.publicUrl) {
      throw new Error('画像のパブリックURLの取得に失敗しました');
    }

    const publicURL = publicUrlResponse.data.publicUrl;

    return new NextResponse(JSON.stringify({ imageUrl: publicURL }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('画像処理エラー:', error);
    let errorMessage = '画像処理に失敗しました';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
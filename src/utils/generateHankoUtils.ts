// src/utils/hankoUtils.ts
import sharp from 'sharp';

export async function processHankoImage(imageBuffer: Buffer) {
  // 画像の二値化と白黒処理
  const { data, info } = await sharp(imageBuffer)
    .resize(200, 200, { fit: 'cover', position: 'center' })
    .threshold(128)
    .toColorspace('b-w')
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 赤と白の変換処理
  const pixelArray = new Uint8ClampedArray(data);
  const newPixelArray = new Uint8ClampedArray(info.width * info.height * 4);

  for (let i = 0; i < pixelArray.length; i++) {
    const pixelValue = pixelArray[i];
    const newIndex = i * 4;
    if (pixelValue === 0) {
      newPixelArray[newIndex] = 255;     // R
      newPixelArray[newIndex + 1] = 0;   // G
      newPixelArray[newIndex + 2] = 0;   // B
      newPixelArray[newIndex + 3] = 255; // A
    } else {
      newPixelArray[newIndex] = 255;     // R
      newPixelArray[newIndex + 1] = 255; // G
      newPixelArray[newIndex + 2] = 255; // B
      newPixelArray[newIndex + 3] = 255; // A
    }
  }

  const processedImage = await sharp(Buffer.from(newPixelArray), {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .png()
    .toBuffer();

  // 印鑑の形状処理
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
      { input: processedImage, top: 10, left: 10 },
      { input: circleShape, blend: 'dest-in' },
      { input: outerCircle, top: 0, left: 0 }
    ])
    .blur(0.3)
    .png()
    .toBuffer();

  return hankoImage;
}
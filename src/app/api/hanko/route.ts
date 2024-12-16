// // app/api/hanko/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// import { supabase } from '@/lib/supabaseClient';
// import { processHankoImage } from '@/utils/generateHankoUtils';

// export async function POST(req: NextRequest) {
//   try {
//     const { profileImageUrl } = await req.json();
//     const response = await fetch(profileImageUrl);
//     if (!response.ok) {
//       throw new Error(`画像の取得に失敗しました: ${response.statusText}`);
//     }

//     const arrayBuffer = await response.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // 画像処理
//     const hankoImage = await processHankoImage(buffer);

//     // Supabaseへのアップロード処理
//     const fileName = `${uuidv4()}.png`;
//     const { error: uploadError } = await supabase.storage
//       .from('hanko-images')
//       .upload(fileName, hankoImage, {
//         contentType: 'image/png',
//       });

//     if (uploadError) {
//       throw new Error(`Supabaseへの画像アップロードに失敗しました: ${uploadError.message}`);
//     }

//     const publicUrlResponse = supabase.storage
//       .from('hanko-images')
//       .getPublicUrl(fileName);

//     if (!publicUrlResponse.data?.publicUrl) {
//       throw new Error('画像のパブリックURLの取得に失敗しました');
//     }

//     return new NextResponse(JSON.stringify({ 
//       imageUrl: publicUrlResponse.data.publicUrl 
//     }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error: unknown) {
//     console.error('画像処理エラー:', error);
//     const errorMessage = error instanceof Error ? error.message : '画像処理に失敗しました';
    
//     return new NextResponse(JSON.stringify({ error: errorMessage }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }









// // app/api/hanko/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// import { supabase } from '@/lib/supabaseClient';
// import { processHankoImage } from '@/utils/generateHankoUtils';

// export async function POST(req: NextRequest) {
//   try {
//     const authHeader = req.headers.get('authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
//     }

//     const { profileImageUrl } = await req.json();
//     if (!profileImageUrl) {
//       return NextResponse.json({ error: 'プロフィール画像URLが必要です' }, { status: 400 });
//     }

//     const response = await fetch(profileImageUrl);
//     if (!response.ok) {
//       throw new Error(`画像の取得に失敗しました: ${response.statusText}`);
//     }

//     const arrayBuffer = await response.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // 画像処理
//     const hankoImage = await processHankoImage(buffer);

//     // Supabaseへのアップロード処理
//     const fileName = `${uuidv4()}.png`;
//     const { error: uploadError } = await supabase.storage
//       .from('hanko-images')
//       .upload(fileName, hankoImage, {
//         contentType: 'image/png',
//       });

//     if (uploadError) {
//       throw new Error(`Supabaseへの画像アップロードに失敗しました: ${uploadError.message}`);
//     }

//     const publicUrlResponse = supabase.storage
//       .from('hanko-images')
//       .getPublicUrl(fileName);

//     if (!publicUrlResponse.data?.publicUrl) {
//       throw new Error('画像のパブリックURLの取得に失敗しました');
//     }

//     return new NextResponse(JSON.stringify({ 
//       imageUrl: publicUrlResponse.data.publicUrl 
//     }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error: unknown) {
//     console.error('画像処理エラー:', error);
//     const errorMessage = error instanceof Error ? error.message : '画像処理に失敗しました';
    
//     return new NextResponse(JSON.stringify({ error: errorMessage }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }









// app/api/hanko/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { processHankoImage } from '@/utils/generateHankoUtils';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const accessToken = authHeader.split(' ')[1];
    
    // LINEプロフィールを取得
    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!profileResponse.ok) {
      throw new Error('LINEプロフィールの取得に失敗しました');
    }

    const profile = await profileResponse.json();
    const profileImageUrl = profile.pictureUrl;

    if (!profileImageUrl) {
      return NextResponse.json({ error: 'プロフィール画像が見つかりません' }, { status: 400 });
    }

    const response = await fetch(profileImageUrl);
    if (!response.ok) {
      throw new Error(`画像の取得に失敗しました: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 画像処理
    const hankoImage = await processHankoImage(buffer);

    // Supabaseへのアップロード処理
    const fileName = `${uuidv4()}.png`;
    const { error: uploadError } = await supabase.storage
      .from('hanko-images')
      .upload(fileName, hankoImage, {
        contentType: 'image/png',
      });

    if (uploadError) {
      throw new Error(`Supabaseへの画像アップロードに失敗しました: ${uploadError.message}`);
    }

    const publicUrlResponse = supabase.storage
      .from('hanko-images')
      .getPublicUrl(fileName);

    if (!publicUrlResponse.data?.publicUrl) {
      throw new Error('画像のパブリックURLの取得に失敗しました');
    }

    return new NextResponse(JSON.stringify({ 
      imageUrl: publicUrlResponse.data.publicUrl 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('画像処理エラー:', error);
    const errorMessage = error instanceof Error ? error.message : '画像処理に失敗しました';
    
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
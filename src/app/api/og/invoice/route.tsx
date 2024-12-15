// app/api/og/invoice/route.ts
import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { InvoiceImage } from "@/components/InvoiceImage";

export const runtime = "edge";

export function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { searchParams } = new URL(req.url);

    const issueDate = searchParams.get("issueDate") || "";
    const dueDate = searchParams.get("dueDate") || "";
    const amount = searchParams.get("amount") || "";
    const message = searchParams.get("message") || "";
    const recipient = searchParams.get("recipient") || "";
    const hankoImage = searchParams.get("hankoImage") || "";
    const decodedHankoImage = decodeURIComponent(hankoImage);

    console.log(hankoImage);

    return new ImageResponse(
      (
        <InvoiceImage
          issueDate={issueDate}
          dueDate={dueDate}
          amount={amount}
          message={message}
          recipient={recipient}
          hankoImage={hankoImage}
          decodedHankoImage={decodedHankoImage}
        />
      ),
      {
        width: 1260,
        height: 960,
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    } else {
      console.log("An unknown error occurred");
    }
    return new Response("画像の生成に失敗しました", {
      status: 500,
    });
  }
}
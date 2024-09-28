import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

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

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#fff",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "left",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              width: "95%",
              maxWidth: "1150px",
              height: "95%",
              // border: "4px solid #000",
              padding: "20px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontSize: "78px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              ご請求書
            </h1>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "38px", alignItems: "flex-end" }}>
              <span style={{ paddingBottom: "8px" }}>発行日:</span>
              <div
                style={{
                  border: "3px solid #000",
                  padding: "6px",
                  minWidth: "180px",
                  marginLeft: "10px",
                  display: "flex",
                }}
              >
                {issueDate}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "38px", alignItems: "flex-end" }}>
              <span style={{ paddingBottom: "8px" }}>期日:</span>
              <div
                style={{
                  border: "3px solid #000",
                  padding: "6px",
                  minWidth: "180px",
                  marginLeft: "10px",
                  display: "flex",
                }}
              >
                {dueDate}
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "bold",
                margin: "15px 0",
              }}
            >
              下記の通り、ご請求申し上げます。
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                margin: "15px 0",
                fontSize: "55px",
                fontWeight: "bold",
              }}
            >
              <span style={{ paddingBottom: "11px" }}>ご請求金額</span>
              <div
                style={{
                  border: "3px solid #000",
                  padding: "10px",
                  minWidth: "280px",
                  marginLeft: "15px",
                  display: "flex",
                }}
              >
                ¥{amount}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "140px",
                border: "3px solid #000",
                marginTop: "15px",
                padding: "15px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                lineHeight: "1.3",
                overflow: "hidden",
              }}
            >
              <div style={{
                maxHeight: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}>
                {message}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
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
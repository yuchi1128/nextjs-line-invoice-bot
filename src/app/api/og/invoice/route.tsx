import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { searchParams } = new URL(req.url);

    const title = "ご請求書";
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
              width: "90%",
              maxWidth: "1100px",
              height: "90%",
              border: "2px solid #000",
              padding: "40px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "30px",
                fontSize: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {title}
            </h1>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", fontSize: "30px" }}>
              <span>発行日:</span>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                  minWidth: "200px",
                  marginLeft: "10px",
                  display: "flex",
                }}
              >
                {issueDate}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", fontSize: "30px" }}>
              <span>期日:</span>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                  minWidth: "200px",
                  marginLeft: "10px",
                  display: "flex",
                }}
              >
                {dueDate}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px 0",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              <span>ご請求金額</span>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                  minWidth: "200px",
                  marginLeft: "10px",
                  display: "flex",
                }}
              >
                ¥{amount}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "150px",
                border: "1px solid #000",
                marginTop: "30px",
                padding: "20px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              {message}
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

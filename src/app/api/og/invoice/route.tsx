import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // タイトルは固定
    const title = "ご請求書";

    // 発行日、期日、ご請求金額、メッセージを動的に取得
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
            flexWrap: "nowrap",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              border: "1px solid #000",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "40px" }}>
              {title}
            </h1>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", fontSize: "24px" }}>
              <span>発行日:</span>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  minWidth: "150px",
                  marginLeft: "10px",
                }}
              >
                {issueDate}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", fontSize: "24px" }}>
              <span>期日:</span>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  minWidth: "150px",
                  marginLeft: "10px",
                }}
              >
                {dueDate}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              <span>ご請求金額</span>
              <div
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  minWidth: "150px",
                  marginLeft: "10px",
                }}
              >
                {amount}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid #000",
                marginTop: "20px",
                padding: "10px",
                boxSizing: "border-box",
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
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

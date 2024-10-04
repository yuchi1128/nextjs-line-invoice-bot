// import { NextRequest } from "next/server";
// import { ImageResponse } from "@vercel/og";

// export const runtime = "edge";

// export function GET(req: NextRequest) {
//   if (req.method !== "GET") {
//     return new Response("Method Not Allowed", { status: 405 });
//   }

//   try {
//     const { searchParams } = new URL(req.url);

//     const issueDate = searchParams.get("issueDate") || "";
//     const dueDate = searchParams.get("dueDate") || "";
//     const amount = searchParams.get("amount") || "";
//     const message = searchParams.get("message") || "";
//     const recipient = searchParams.get("recipient") || "";

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             height: "100%",
//             width: "100%",
//             display: "flex",
//             textAlign: "left",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//             fontFamily: "Arial, sans-serif",
//           }}
//         >
//           <div
//             style={{
//               width: "95%",
//               maxWidth: "1150px",
//               height: "95%",
//               padding: "20px",
//               boxSizing: "border-box",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <h1
//               style={{
//                 marginTop: "40px", 
//                 textAlign: "center",
//                 marginBottom: "10px",
//                 fontSize: "95px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               ご請求書
//             </h1>
//             <div 
//               style={{ 
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 fontSize: "53px", 
//                 fontWeight: "bold", 
//                 marginBottom: "20px",
//                 marginLeft: "35px",
//                 marginTop: "50px", 
//               }}
//             >
//               {recipient} 様
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>発行日：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {issueDate}
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>支払い期限：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {dueDate}
//               </div>
//             </div>
//             <div
//               style={{
//                 textAlign: "center",
//                 fontSize: "37px",
//                 fontWeight: "bold",
//                 marginLeft: "10px",
//                 margin: "20px 10px 38px 35px",
//               }}
//             >
//               下記の通り、ご請求申し上げます。
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 margin: "15px 0",
//                 fontSize: "60px",
//                 fontWeight: "bold",
//                 position: "relative",
//               }}
//             >
//               <span style={{ paddingBottom: "20px" }}>ご請求金額</span>
//               <div
//                 style={{
//                   padding: "10px",
//                   minWidth: "280px",
//                   marginLeft: "15px",
//                   display: "flex",
//                   fontSize: "90px",
//                 }}
//               >
//                 ¥{amount}
//               </div>
//             </div>
//             <div
//               style={{
//                 content: '""',
//                 position: "absolute",
//                 bottom: "200px",
//                 width: "65%",
//                 height: "3px",
//                 backgroundColor: "black",
//                 left: "20%",
//               }}
//             />
//             <div
//               style={{
//                 width: "95%",
//                 height: "140px",
//                 left: "5%",
//                 border: "3px solid #000",
//                 marginTop: "15px",
//                 padding: "15px",
//                 boxSizing: "border-box",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "36px",
//                 lineHeight: "1.3",
//                 overflow: "hidden",
//               }}
//             >
//               <div style={{
//                 maxHeight: "100%",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 display: "-webkit-box",
//                 WebkitLineClamp: 4,
//                 WebkitBoxOrient: "vertical",
//               }}>
//                 {message}
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 750,
//       }
//     );
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.log(`${e.message}`);
//     } else {
//       console.log("An unknown error occurred");
//     }
//     return new Response("画像の生成に失敗しました", {
//       status: 500,
//     });
//   }
// }






// import { NextRequest } from "next/server";
// import { ImageResponse } from "@vercel/og";

// export const runtime = "edge";

// export function GET(req: NextRequest) {
//   if (req.method !== "GET") {
//     return new Response("Method Not Allowed", { status: 405 });
//   }

//   try {
//     const { searchParams } = new URL(req.url);

//     const issueDate = searchParams.get("issueDate") || "";
//     const dueDate = searchParams.get("dueDate") || "";
//     const amount = searchParams.get("amount") || "";
//     const message = searchParams.get("message") || "";
//     const recipient = searchParams.get("recipient") || "";
//     const hankoImage = searchParams.get("hankoImage") || "";

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             height: "100%",
//             width: "100%",
//             display: "flex",
//             textAlign: "left",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//             fontFamily: "Arial, sans-serif",
//           }}
//         >
//           <div
//             style={{
//               width: "95%",
//               maxWidth: "1150px",
//               height: "95%",
//               padding: "20px",
//               boxSizing: "border-box",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <h1
//               style={{
//                 marginTop: "40px", 
//                 textAlign: "center",
//                 marginBottom: "10px",
//                 fontSize: "95px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               ご請求書
//             </h1>
//             <div 
//               style={{ 
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 fontSize: "53px", 
//                 fontWeight: "bold", 
//                 marginBottom: "20px",
//                 marginLeft: "35px",
//                 marginTop: "50px", 
//               }}
//             >
//               {recipient} 様
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>発行日：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {issueDate}
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>支払い期限：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {dueDate}
//               </div>
//             </div>
//             <div
//               style={{
//                 textAlign: "center",
//                 fontSize: "37px",
//                 fontWeight: "bold",
//                 marginLeft: "10px",
//                 margin: "20px 10px 38px 35px",
//               }}
//             >
//               下記の通り、ご請求申し上げます。
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 margin: "15px 0",
//                 fontSize: "60px",
//                 fontWeight: "bold",
//                 position: "relative",
//               }}
//             >
//               <span style={{ paddingBottom: "20px" }}>ご請求金額</span>
//               <div
//                 style={{
//                   padding: "10px",
//                   minWidth: "280px",
//                   marginLeft: "15px",
//                   display: "flex",
//                   fontSize: "90px",
//                 }}
//               >
//                 ¥{amount}
//               </div>
//             </div>
//             <div
//               style={{
//                 content: '""',
//                 position: "absolute",
//                 bottom: "200px",
//                 width: "65%",
//                 height: "3px",
//                 backgroundColor: "black",
//                 left: "20%",
//               }}
//             />
//             <div
//               style={{
//                 width: "95%",
//                 height: "140px",
//                 left: "5%",
//                 border: "3px solid #000",
//                 marginTop: "15px",
//                 padding: "15px",
//                 boxSizing: "border-box",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "36px",
//                 lineHeight: "1.3",
//                 overflow: "hidden",
//               }}
//             >
//               <div style={{
//                 maxHeight: "100%",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 display: "-webkit-box",
//                 WebkitLineClamp: 4,
//                 WebkitBoxOrient: "vertical",
//               }}>
//                 {message}
//               </div>
//             </div>
//           </div>
//           <div
//             style={{
//               position: "absolute",
//               bottom: "40px",
//               right: "40px",
//               width: "150px",
//               height: "150px",
//               backgroundImage: `url(${hankoImage})`,
//               backgroundSize: "contain",
//               backgroundRepeat: "no-repeat",
//             }}
//           />
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 750,
//       }
//     );
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.log(`${e.message}`);
//     } else {
//       console.log("An unknown error occurred");
//     }
//     return new Response("画像の生成に失敗しました", {
//       status: 500,
//     });
//   }
// }









// // public
// import { NextRequest } from "next/server";
// import { ImageResponse } from "@vercel/og";

// export const runtime = "edge";

// export async function GET(req: NextRequest) {
//   if (req.method !== "GET") {
//     return new Response("Method Not Allowed", { status: 405 });
//   }

//   try {
//     const { searchParams } = new URL(req.url);

//     const issueDate = searchParams.get("issueDate") || "";
//     const dueDate = searchParams.get("dueDate") || "";
//     const amount = searchParams.get("amount") || "";
//     const message = searchParams.get("message") || "";
//     const recipient = searchParams.get("recipient") || "";
//     const hankoImage = searchParams.get("hankoImage") || "";

//     // ハンコ画像の処理
//     // let hankoBuffer;
//     // if (hankoImage) {
//     //   const hankoResponse = await fetch(hankoImage);
//     //   const hankoArrayBuffer = await hankoResponse.arrayBuffer();
//     //   hankoBuffer = Buffer.from(hankoArrayBuffer);
//     // }

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             height: "100%",
//             width: "100%",
//             display: "flex",
//             textAlign: "left",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//             fontFamily: "Arial, sans-serif",
//           }}
//         >
//           <div
//             style={{
//               width: "95%",
//               maxWidth: "1150px",
//               height: "95%",
//               padding: "20px",
//               boxSizing: "border-box",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <h1
//               style={{
//                 marginTop: "40px", 
//                 textAlign: "center",
//                 marginBottom: "10px",
//                 fontSize: "95px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               ご請求書
//             </h1>
//             <div 
//               style={{ 
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 fontSize: "53px", 
//                 fontWeight: "bold", 
//                 marginBottom: "20px",
//                 marginLeft: "35px",
//                 marginTop: "50px", 
//               }}
//             >
//               {recipient} 様
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>発行日：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {issueDate}
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>支払い期限：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {dueDate}
//               </div>
//             </div>
//             <div
//               style={{
//                 textAlign: "center",
//                 fontSize: "37px",
//                 fontWeight: "bold",
//                 marginLeft: "10px",
//                 margin: "20px 10px 38px 35px",
//               }}
//             >
//               下記の通り、ご請求申し上げます。
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 margin: "15px 0",
//                 fontSize: "60px",
//                 fontWeight: "bold",
//                 position: "relative",
//               }}
//             >
//               <span style={{ paddingBottom: "20px" }}>ご請求金額</span>
//               <div
//                 style={{
//                   padding: "10px",
//                   minWidth: "280px",
//                   marginLeft: "15px",
//                   display: "flex",
//                   fontSize: "90px",
//                 }}
//               >
//                 ¥{amount}
//               </div>
//             </div>
//             <div
//               style={{
//                 content: '""',
//                 position: "absolute",
//                 bottom: "200px",
//                 width: "65%",
//                 height: "3px",
//                 backgroundColor: "black",
//                 left: "20%",
//               }}
//             />
//             <div
//               style={{
//                 width: "95%",
//                 height: "140px",
//                 left: "5%",
//                 border: "3px solid #000",
//                 marginTop: "15px",
//                 padding: "15px",
//                 boxSizing: "border-box",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "36px",
//                 lineHeight: "1.3",
//                 overflow: "hidden",
//               }}
//             >
//               <div style={{
//                 maxHeight: "100%",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 display: "-webkit-box",
//                 WebkitLineClamp: 4,
//                 WebkitBoxOrient: "vertical",
//               }}>
//                 {message}
//               </div>
//             </div>
//           </div>
//           {/* {hankoBuffer && (
//             <div style={{
//               position: "absolute",
//               bottom: "60px",
//               right: "60px",
//               width: "100px",
//               height: "100px",
//             }}>
//               <img
//                 src={`data:image/png;base64,${hankoBuffer.toString('base64')}`}
//                 width="100"
//                 height="100"
//                 style={{ objectFit: "contain" }}
//               />
//             </div>
//           )} */}
//             <div style={{
//               position: "absolute",
//               bottom: "60px",
//               right: "60px",
//               width: "100px",
//               height: "100px",
//             }}>
//               <img
//                 src={hankoImage}
//                 width="100"
//                 height="100"
//                 style={{ objectFit: "contain" }}
//               />
//             </div>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 750,
//       }
//     );
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.log(`${e.message}`);
//     } else {
//       console.log("An unknown error occurred");
//     }
//     return new Response("画像の生成に失敗しました", {
//       status: 500,
//     });
//   }
// }








// // sonomama
// import { NextRequest } from "next/server";
// import { ImageResponse } from "@vercel/og";

// export const runtime = "edge";

// export async function GET(req: NextRequest) {
//   if (req.method !== "GET") {
//     return new Response("Method Not Allowed", { status: 405 });
//   }

//   try {
//     const { searchParams } = new URL(req.url);

//     const issueDate = searchParams.get("issueDate") || "";
//     const dueDate = searchParams.get("dueDate") || "";
//     const amount = searchParams.get("amount") || "";
//     const message = searchParams.get("message") || "";
//     const recipient = searchParams.get("recipient") || "";
//     const hankoImage = searchParams.get("hankoImage") || "";

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             height: "100%",
//             width: "100%",
//             display: "flex",
//             textAlign: "left",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//             fontFamily: "Arial, sans-serif",
//           }}
//         >
//           <div
//             style={{
//               width: "95%",
//               maxWidth: "1150px",
//               height: "95%",
//               padding: "20px",
//               boxSizing: "border-box",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <h1
//               style={{
//                 marginTop: "40px", 
//                 textAlign: "center",
//                 marginBottom: "10px",
//                 fontSize: "95px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               ご請求書
//             </h1>
//             <div 
//               style={{ 
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 fontSize: "53px", 
//                 fontWeight: "bold", 
//                 marginBottom: "20px",
//                 marginLeft: "35px",
//                 marginTop: "50px", 
//               }}
//             >
//               {recipient} 様
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>発行日：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {issueDate}
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>支払い期限：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {dueDate}
//               </div>
//             </div>
//             <div
//               style={{
//                 textAlign: "center",
//                 fontSize: "37px",
//                 fontWeight: "bold",
//                 marginLeft: "10px",
//                 margin: "20px 10px 38px 35px",
//               }}
//             >
//               下記の通り、ご請求申し上げます。
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 margin: "15px 0",
//                 fontSize: "60px",
//                 fontWeight: "bold",
//                 position: "relative",
//               }}
//             >
//               <span style={{ paddingBottom: "20px" }}>ご請求金額</span>
//               <div
//                 style={{
//                   padding: "10px",
//                   minWidth: "280px",
//                   marginLeft: "15px",
//                   display: "flex",
//                   fontSize: "90px",
//                 }}
//               >
//                 ¥{amount}
//               </div>
//             </div>
//             <div
//               style={{
//                 content: '""',
//                 position: "absolute",
//                 bottom: "200px",
//                 width: "65%",
//                 height: "3px",
//                 backgroundColor: "black",
//                 left: "20%",
//               }}
//             />
//             <div
//               style={{
//                 width: "95%",
//                 height: "140px",
//                 left: "5%",
//                 border: "3px solid #000",
//                 marginTop: "15px",
//                 padding: "15px",
//                 boxSizing: "border-box",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "36px",
//                 lineHeight: "1.3",
//                 overflow: "hidden",
//               }}
//             >
//               <div style={{
//                 maxHeight: "100%",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 display: "-webkit-box",
//                 WebkitLineClamp: 4,
//                 WebkitBoxOrient: "vertical",
//               }}>
//                 {message}
//               </div>
//             </div>
//           </div>
          
//           {hankoImage && (
//             <div style={{
//               position: "absolute",
//               bottom: "60px",
//               right: "60px",
//               width: "100px",
//               height: "100px",
//             }}>
//               <img
//                 src={hankoImage}
//                 width="100"
//                 height="100"
//                 style={{ objectFit: "contain" }}
//               />
//             </div>
//           )}
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 750,
//       }
//     );
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.log(`${e.message}`);
//     } else {
//       console.log("An unknown error occurred");
//     }
//     return new Response("画像の生成に失敗しました", {
//       status: 500,
//     });
//   }
// }








// //supabase
// import { NextRequest } from "next/server";
// import { ImageResponse } from "@vercel/og";

// export const runtime = "edge";

// export async function GET(req: NextRequest) {
//   if (req.method !== "GET") {
//     return new Response("Method Not Allowed", { status: 405 });
//   }

//   try {
//     const { searchParams } = new URL(req.url);

//     const issueDate = searchParams.get("issueDate") || "";
//     const dueDate = searchParams.get("dueDate") || "";
//     const amount = searchParams.get("amount") || "";
//     const message = searchParams.get("message") || "";
//     const recipient = searchParams.get("recipient") || "";
//     const hankoImage = searchParams.get("hankoImage") || "";

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             height: "100%",
//             width: "100%",
//             display: "flex",
//             textAlign: "left",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//             fontFamily: "Arial, sans-serif",
//           }}
//         >
//           <div
//             style={{
//               width: "95%",
//               maxWidth: "1150px",
//               height: "95%",
//               padding: "20px",
//               boxSizing: "border-box",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <h1
//               style={{
//                 marginTop: "40px", 
//                 textAlign: "center",
//                 marginBottom: "10px",
//                 fontSize: "95px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               ご請求書
//             </h1>
//             <div 
//               style={{ 
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 fontSize: "53px", 
//                 fontWeight: "bold", 
//                 marginBottom: "20px",
//                 marginLeft: "35px",
//                 marginTop: "50px", 
//               }}
//             >
//               {recipient} 様
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>発行日：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {issueDate}
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "50px", alignItems: "flex-end" }}>
//               <span style={{ paddingBottom: "2px" }}>支払い期限：</span>
//               <div
//                 style={{
//                   padding: "6px",
//                   minWidth: "180px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {dueDate}
//               </div>
//             </div>
//             <div
//               style={{
//                 textAlign: "center",
//                 fontSize: "37px",
//                 fontWeight: "bold",
//                 marginLeft: "10px",
//                 margin: "20px 10px 38px 35px",
//               }}
//             >
//               下記の通り、ご請求申し上げます。
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 margin: "15px 0",
//                 fontSize: "60px",
//                 fontWeight: "bold",
//                 position: "relative",
//               }}
//             >
//               <span style={{ paddingBottom: "20px" }}>ご請求金額</span>
//               <div
//                 style={{
//                   padding: "10px",
//                   minWidth: "280px",
//                   marginLeft: "15px",
//                   display: "flex",
//                   fontSize: "90px",
//                 }}
//               >
//                 ¥{amount}
//               </div>
//             </div>
//             <div
//               style={{
//                 content: '""',
//                 position: "absolute",
//                 bottom: "200px",
//                 width: "65%",
//                 height: "3px",
//                 backgroundColor: "black",
//                 left: "20%",
//               }}
//             />
//             <div
//               style={{
//                 width: "95%",
//                 height: "140px",
//                 left: "5%",
//                 border: "3px solid #000",
//                 marginTop: "15px",
//                 padding: "15px",
//                 boxSizing: "border-box",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "36px",
//                 lineHeight: "1.3",
//                 overflow: "hidden",
//               }}
//             >
//               <div style={{
//                 maxHeight: "100%",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 display: "-webkit-box",
//                 WebkitLineClamp: 4,
//                 WebkitBoxOrient: "vertical",
//               }}>
//                 {message}
//               </div>
//             </div>
//           </div>
          
//           {hankoImage && (
//             <div style={{
//               position: "absolute",
//               bottom: "60px",
//               right: "60px",
//               width: "100px",
//               height: "100px",
//             }}>
//               <img
//                 src={hankoImage}
//                 width="100"
//                 height="100"
//                 style={{ objectFit: "contain" }}
//               />
//             </div>
//           )}
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 1200,
//       }
//     );
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.log(`${e.message}`);
//     } else {
//       console.log("An unknown error occurred");
//     }
//     return new Response("画像の生成に失敗しました。", {
//       status: 500,
//     });
//   }
// }







//supabase2
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
    const recipient = searchParams.get("recipient") || "";
    const hankoImage = searchParams.get("hankoImage") || "";
    const decodedHankoImage = decodeURIComponent(hankoImage);

    console.log(hankoImage);

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
              padding: "20px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                marginTop: "40px", 
                textAlign: "center",
                marginBottom: "10px",
                fontSize: "95px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              ご請求書
            </h1>
            <div 
              style={{ 
                display: "flex",
                justifyContent: "flex-start",
                fontSize: "53px", 
                fontWeight: "bold", 
                marginBottom: "20px",
                marginLeft: "35px",
                marginTop: "50px", 
              }}
            >
              {recipient} 様
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0px", fontSize: "50px", alignItems: "flex-end" }}>
              <span style={{ paddingBottom: "2px" }}>発行日：</span>
              <div
                style={{
                  padding: "6px",
                  minWidth: "180px",
                  marginLeft: "10px",
                  display: "flex",
                }}
              >
                {issueDate}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "50px", alignItems: "flex-end" }}>
              <span style={{ paddingBottom: "2px" }}>支払い期限：</span>
              <div
                style={{
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
                fontSize: "37px",
                fontWeight: "bold",
                marginLeft: "10px",
                margin: "20px 10px 38px 35px",
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
                fontSize: "60px",
                fontWeight: "bold",
                position: "relative",
              }}
            >
              <span style={{ paddingBottom: "20px" }}>ご請求金額</span>
              <div
                style={{
                  padding: "10px",
                  minWidth: "280px",
                  marginLeft: "15px",
                  display: "flex",
                  fontSize: "90px",
                }}
              >
                ¥{amount}
              </div>
            </div>
            <div
              style={{
                content: '""',
                position: "absolute",
                bottom: "200px",
                width: "65%",
                height: "3px",
                backgroundColor: "black",
                left: "20%",
              }}
            />
            <div
              style={{
                width: "95%",
                height: "140px",
                left: "5%",
                border: "3px solid #000",
                marginTop: "15px",
                padding: "15px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
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


          {/* <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              width: "100px",
              height: "100px",
              backgroundImage: `url(${hankoImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          /> */}


          {/* {hankoImage && (
            <img
              src={`data:image/png;base64,${Buffer.from(hankoImage).toString('base64')}`}
              alt="Hanko"
              style={{
                position: "absolute",
                bottom: "40px",
                right: "40px",
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />
          )}
          <div style={{ position: "absolute", bottom: "10px", left: "10px", fontSize: "10px" }}>
            Debug: Hanko image {hankoImage ? "loaded" : "not loaded"}
          </div>
           */}


          {hankoImage && (
            <img
              src={decodedHankoImage}
              alt="Hanko"
              style={{
                position: "absolute",
                bottom: "40px",
                right: "40px",
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />
          )}


        </div>
      ),
      {
        width: 1200,
        height: 750,
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

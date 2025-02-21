type InvoiceImageProps = {
  issueDate: string;
  dueDate: string;
  amount: string;
  message: string;
  recipient: string;
  hankoImage: string;
  decodedHankoImage: string;
};

export function InvoiceImage({
  issueDate,
  dueDate,
  amount,
  message,
  recipient,
  hankoImage,
  decodedHankoImage,
}: InvoiceImageProps) {

  return (
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
            fontSize: "115px",
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
            fontSize: "67px",
            fontWeight: "bold",
            marginBottom: "20px",
            marginLeft: "35px",
            marginTop: "50px",
          }}
        >
          {recipient} 様
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0px", fontSize: "56px", alignItems: "flex-end" }}>
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
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", fontSize: "56px", alignItems: "flex-end" }}>
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
            fontSize: "43px",
            fontWeight: "bold",
            marginLeft: "10px",
            margin: "20px 10px 33px 35px",
          }}
        >
          下記の通り、ご請求申し上げます。
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            margin: "15px 0 15px 138px",
            fontSize: "64px",
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
              fontSize: "95px",
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
            width: "80%",
            height: "3px",
            backgroundColor: "black",
            left: "8%",
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

      {hankoImage && (
        <img
          src={decodedHankoImage}
          alt="Hanko"
          style={{
            position: "absolute",
            bottom: "196px",
            right: "40px",
            width: "260px",
            height: "260px",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
}
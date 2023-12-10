import { Breadcrumb, Button, Card } from "flowbite-react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router";

const sendTransactionToMockAPI = async (transactionData) => {
  try {
    const response = await fetch(
      "https://65312ee04d4c2e3f333c9120.mockapi.io/Transcationdetails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send transaction to mock API");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending transaction to mock API:", error);
    throw error;
  }
};

const TransactionStatus = () => {
  const navigate = useNavigate();

  const handleDownloadReceipt = async () => {
    const name = JSON.parse(localStorage.getItem("name")) || "";
    const province = JSON.parse(localStorage.getItem("province")) || "";
    const subdistrict = JSON.parse(localStorage.getItem("subdistrict")) || "";
    const phone = JSON.parse(localStorage.getItem("phone")) || "";
    const zipcode = JSON.parse(localStorage.getItem("zipcode")) || "";
    const district = JSON.parse(localStorage.getItem("district")) || "";
    const productData = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;

    const transactionData = {
      name,
      province,
      subdistrict,
      phone,
      zipcode,
      district,
      products: productData.map((item) => ({
        name: item.product_name,
        quantity: item.quantity,
      })),
      totalPrice,
    };

    const receiptText = `
     Nama: ${name}
     Provinsi: ${province}
     Kecamatan: ${subdistrict}
     Nomor Telepon: ${phone}
     Kode Pos: ${zipcode}
     Kota/Kabupaten: ${district}
     
     Produk: 
     ${productData
       .map((item) => `${item.product_name} (${item.quantity} pcs)`)
       .join("\n")}
     
     Total Pembayaran: Rp ${totalPrice.toLocaleString("id-ID")}
   `;

    // Download receipt
    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "receipt.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Kirim data transaksi ke mock API
    try {
      const response = await sendTransactionToMockAPI(transactionData);
      console.log("Transaction sent to mock API:", response);
    } catch (error) {
      console.error("Error handling download receipt:", error);
    }

localStorage.removeItem("cart");
localStorage.removeItem("totalPrice");
  };

  return (
    <div className="mx-7">
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 py-3 dark:bg-gray-800"
      >
        <Breadcrumb.Item href="#" icon={FaCartShopping}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Cart</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Address</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Checkout</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Payment</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Payment Status</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex items-center justify-center mt-28 mb-16">
        <div className="items-center justify-center">
          <Card className="items-center">
            <div className="text-center justify-center items-center space-y-4">
              <div className="justify-center items-center">
                <h1 className="text-3xl font-bold">Payment Status</h1>
              </div>
              <div className="items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8215/8215539.png"
                  width={100}
                  className="justify-center items-center mx-auto mt-10"
                  alt="Payment Success"
                />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-semibold mb-3">
                  Payment was successful
                </h1>
                <p className="text-md font-semibold">
                  Payment has been received successfully. Thank you for your
                  payment
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <Button href="/">Back to Home</Button>
                {}
                <div className="flex justify-center gap-3">
                  <Button color="blue" onClick={handleDownloadReceipt}>
                    Download Receipt
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}



export default TransactionStatus;

import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Label, Modal, Select } from "flowbite-react";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import axios from "axios";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

function Checkout(props) {
  const [openModal, setOpenModal] = useState(false);
  const [courierData, setCourierData] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  // Additional data from localStorage
  const name = JSON.parse(localStorage.getItem("name")) || "";
  const phone = JSON.parse(localStorage.getItem("phone")) || "";
  const province = JSON.parse(localStorage.getItem("province")) || "";
  const district = JSON.parse(localStorage.getItem("district")) || "";
  const subdistrict = JSON.parse(localStorage.getItem("subdistrict")) || "";
  const zipcode = JSON.parse(localStorage.getItem("zipcode")) || "";

  // Manggil product data dari local storage
  const productData = JSON.parse(localStorage.getItem("cart")) || [];

  // Manggil data price dari local storage
  const totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;

  useEffect(() => {
    axios(
      "https://furnivul-web-app-production.up.railway.app/courier-services",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((result) => {
        setCourierData(result.data.data);
      })
      .catch((error) => {
        console.error("Error fetching courier data:", error);
        console.log("Error response data:", error.response.data);
      });

    // Mengambil total harga dari localStorage
    const storedTotalPrice =
      JSON.parse(localStorage.getItem("totalPrice")) || 0;
    setSelectedCourier(JSON.parse(localStorage.getItem("priceCourier")) || "");
    localStorage.setItem("totalPrice", JSON.stringify(storedTotalPrice));
  }, [token]);

  const calculateTotalPrice = () => {
    // Mengambil total harga dari localStorage
    const totalPriceWithoutCourier =
      productData.reduce(
        (acc, item) => acc + item.product_price * (item.quantity || 1),
        0
      ) - (JSON.parse(localStorage.getItem("voucherDiscount")) || 0);

    const courierCost =
      (selectedCourier &&
        courierData.find((data) => data._id === selectedCourier)?.cost) ||
      0;

    const totalPrice = totalPriceWithoutCourier + courierCost;

    return totalPrice;
  };

  const selectCourier = (event) => {
    const selectedCourierValue = event.target.value;
    setSelectedCourier(selectedCourierValue);

    // Recalculate total price based on the selected courier
    const newTotalPrice = calculateTotalPrice();

    localStorage.setItem("priceCourier", JSON.stringify(selectedCourierValue));
    localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));
  };

  return (
    <div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="w-full">
        <Card>
          <h1 className="text-2xl font-semibold">
            Tingkatkan keamanan akun anda!
          </h1>
          <p>
            Tingkatkan keamanan akun anda dengan mengaktifkan autentikasi dua
            faktor. Dengan menggunakan autentikasi dua faktor dapat memberikan
            proteksi terhadap akun anda. Untuk lebih lengkapnya klik disini!.
          </p>
          <div>
            <Button className="" onClick={() => setOpenModal(true)}>
              Mengerti
            </Button>{" "}
          </div>
        </Card>

        {/* Display additional data from localStorage */}
        <div className="text-md font-semibold my-3">
          <Card className="w-full">
            <h1 className="text-2xl font-semibold">Address</h1>
            <p>Name : {name}</p>
            <p>Phone : {phone}</p>
            <p>
              Address : {province}&nbsp; {district}&nbsp;
              {subdistrict} &nbsp;{zipcode}
            </p>
          </Card>
        </div>

        {/* Display product data */}
        <Card className="mt-3 justify-center">
          {productData.map((item, index) => (
            <div key={index} className="flex items-center">
              <img
                src={item.product_image}
                style={{ height: 200, width: 200 }}
                alt=""
              />
              <div className="text-1xl ml-2 flex-grow">
                <div className="flex justify-between items-center">
                  <p className="font-bold">{item.product_name}</p>
                </div>
                <div className="mt-3">
                  <p>{item.product_category}</p>
                </div>
                <div className="mt-3">
                  <p>{formatCurrency(item.product_price)},-</p>
                  <div>
                    - Voucher:{" "}
                    <span className="font-semibold">
                      {formatCurrency(
                        JSON.parse(localStorage.getItem("voucherDiscount")) || 0
                      )}
                    </span>
                  </div>
                  <span
                    className="mx-2 font-bold flex items-center mt-6"
                    style={{ fontSize: "1.2em" }}
                  >
                    {item.quantity || 0} <p className="ml-3"> PCS </p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Card>

        <div className="max-w-sm">
          <div className="mb-2 block">
            <Label htmlFor="selectCourier" value="Select your courier" />
          </div>
          <Select
            id="selectCourier"
            required
            onChange={selectCourier}
            value={selectedCourier}
          >
            <option value="" disabled>
              Select your courier
            </option>
            {courierData.map((data) => (
              <option key={data._id} value={data._id}>
                {`${data.name} - ${data.description} (${
                  data.etd
                }, Cost: ${formatCurrency(data.cost)})`}
              </option>
            ))}
          </Select>
        </div>

        <Card className="mt-3">
          <div>
            Total:{" "}
            <span className="font-semibold">
              {formatCurrency(calculateTotalPrice())}
            </span>
          </div>
          <div>
            <Button className="">
              <NavLink to={"payment"}>
                <span>Payment</span>
              </NavLink>
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  );
}

export default Checkout;

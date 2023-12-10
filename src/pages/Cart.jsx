import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Modal, Radio } from "flowbite-react";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button as FlowbiteButton } from "flowbite-react";

function Cart() {
  const [datas, setData] = useState({ message: "", data: [] });
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [voucherModal, setVoucherModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [voucherData, setVoucherData] = useState(null);
  const [useVoucher, setUseVoucher] = useState(false);

  const productCart = JSON.parse(localStorage.getItem("cart") || "[]");

  const token = JSON.parse(localStorage.getItem("token"));

  const fetchVoucherData = () => {
    return axios
      .get("https://furnivul-web-app-production.up.railway.app/voucher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setVoucherData(result.data);
      })
      .catch((error) => {
        console.error("Error mengambil data voucher:", error);
        if (error.response) {
          console.error("Detail respons:", error.response.data);
        }
        return Promise.reject(error);
      });
  };

  useEffect(() => {
    fetchVoucherData();

    // Perbarui state datas.data dari localStorage saat komponen dimuat
    setData({ ...datas, data: productCart });
  }, []);

  const handleIncrement = (index) => {
    const updatedData = [...datas.data];
    const product = updatedData[index];

    const existingProductIndex = productCart.findIndex(
      (item) => item.product_id === (product && product.product_id)
    );

    if (existingProductIndex !== -1) {
      // Produk sudah ada di keranjang, tambahkan kuantitas
      productCart[existingProductIndex].quantity += 1;
      setData({
        ...datas,
        data: updatedData.map((item, i) =>
          item.product_id === productCart[existingProductIndex].product_id
            ? { ...item, quantity: productCart[existingProductIndex].quantity }
            : item
        ),
      });
    } else {
      // Produk belum ada di keranjang, tambahkan baru
      const newProduct = { ...product, quantity: 1 };
      productCart.push(newProduct);
      setData({
        ...datas,
        data: [...productCart],
      });
    }

    localStorage.setItem("cart", JSON.stringify(productCart));
    fetchVoucherData();
  };

  // ...

  const handleDecrement = (index) => {
    const updatedData = [...datas.data];
    const product = updatedData[index];

    const existingProductIndex = productCart.findIndex(
      (item) => item.product_id === (product && product.product_id)
    );

    if (existingProductIndex !== -1) {
      if (productCart[existingProductIndex].quantity > 1) {
        // Produk sudah ada di keranjang, kurangi kuantitas
        productCart[existingProductIndex].quantity -= 1;
        setData({
          ...datas,
          data: updatedData.map((item, i) =>
            item.product_id === productCart[existingProductIndex].product_id
              ? {
                  ...item,
                  quantity: productCart[existingProductIndex].quantity,
                }
              : item
          ),
        });
      } else {
        // Set deleteIndex ke nilai yang sesuai
        setDeleteIndex(existingProductIndex);
        setOpenModal(true);
        return;
      }
    }

    localStorage.setItem("cart", JSON.stringify(productCart));
    fetchVoucherData();
  };

  const handleDeleteItem = () => {
    if (deleteIndex !== null) {
      const updatedData = datas.data.filter(
        (_, index) => index !== deleteIndex
      );
      setData({ ...datas, data: updatedData });
      setDeleteIndex(null);
      setOpenModal(false);

      // Perbarui localStorage setelah menghapus item
      const updatedCart = [...productCart];
      updatedCart.splice(deleteIndex, 1);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      fetchVoucherData();
    }
  };

const handleVoucherSelect = (voucher) => {
  setSelectedVoucher(voucher);
  setVoucherModal(false);

  // Menyimpan harga voucher ke localStorage
  localStorage.setItem("voucherDiscount", JSON.stringify(voucher.discount));
};

  const handleVoucherCheckbox = () => {
    setUseVoucher(!useVoucher);
    setSelectedVoucher(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

const calculateTotalPrice = () => {
  const totalPriceWithoutDiscount = Array.isArray(datas.data)
    ? datas.data.reduce(
        (total, item) =>
          total + (item.quantity || 0) * (item.product_price || 0),
        0
      )
    : 0;

  const voucherDiscount =
    JSON.parse(localStorage.getItem("voucherDiscount")) || 0;

  return useVoucher
    ? Math.max(totalPriceWithoutDiscount - voucherDiscount, 0)
    : Math.max(totalPriceWithoutDiscount, 0);
};


  localStorage.setItem("totalPrice", calculateTotalPrice());

  return (
    <>
      <Breadcrumb
        aria-label="Contoh breadcrumb dengan latar belakang solid"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
      >
        <Breadcrumb.Item key="home" href="/" icon={FaCartShopping}>
          Beranda
        </Breadcrumb.Item>
        <Breadcrumb.Item key="cart" href="#" className="">
          Keranjang
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="mt-3 mx-8 justify-center">
        {productCart.map((item, index) => (
          <Card className="flex flex-col mt-2  ">
            <div key={index} className="flex items-center ">
              <img
                src={item.product_image}
                style={{ height: 200, width: 200 }}
                alt=""
              />
              <div className="text-1xl ml-2 flex-grow">
                <div className="flex justify-between items-center">
                  <p className="font-bold">{item.product_name}</p>
                  <div className="flex items-center">
                    <button
                      style={{ fontSize: "1.5em", padding: "0.2em 0.5em" }}
                      onClick={() => handleDecrement(index)}
                    >
                      -
                    </button>
                    <span
                      className="mx-2 font-bold"
                      style={{ fontSize: "1.2em" }}
                    >
                      {item.quantity || 0}
                    </span>
                    <button
                      style={{ fontSize: "1.5em", padding: "0.2em 0.5em" }}
                      onClick={() => handleIncrement(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <p>{item.product_category}</p>
                </div>
                <div className="mt-3 ">
                  <p> {formatCurrency(item.product_price)},-</p>
                  <span
                    className="mx-2 font-bold flex items-center mt-6 "
                    style={{ fontSize: "1.2em" }}
                  >
                    {item.quantity || 0} <p className="ml-3"> Barang </p>
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal show={voucherModal} onClose={() => setVoucherModal(false)}>
        <Modal.Header>Pilih Voucher</Modal.Header>
        <Modal.Body>
          {voucherData && voucherData.data && voucherData.data.length > 0 ? (
            <>
              <ul>
                {voucherData.data.map((voucher) => (
                  <li key={voucher.code}>
                    <label>
                      <input
                        type="radio"
                        name="voucher"
                        onChange={() => handleVoucherSelect(voucher)}
                      />
                      {voucher.name} - Diskon {formatCurrency(voucher.discount)}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Data voucher kosong atau tidak valid.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <FlowbiteButton onClick={() => setVoucherModal(false)}>
            Tutup
          </FlowbiteButton>
        </Modal.Footer>
      </Modal>

      <div className="  sm:rounded-lg mt-2 mx-8">
        {useVoucher && selectedVoucher && (
          <Card className="flex  ">
            <div className="text-center text-green-500">
              Anda Mendapatkan "{selectedVoucher.name}" dengan diskon{" "}
              {formatCurrency(selectedVoucher.discount)}.
            </div>
          </Card>
        )}
        <Card>
          <div className="justify-between gap-8 mx-8 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2  ">
            <div>
              <Card className=" flex w-fit">
                <div className="flex gap-2 w-fit">
                  <label className="text-xl mt-2">
                    <Radio
                      type="checkbox"
                      checked={useVoucher}
                      onChange={handleVoucherCheckbox}
                    />
                    {"  "}
                    Gunakan Voucher
                  </label>
                  <br /> {/* Add a line break */}
                  <Button
                    type="button"
                    className=""
                    id="voucher-button"
                    onClick={() => setVoucherModal(true)}
                    disabled={!useVoucher}
                  >
                    Pilih Voucher
                  </Button>
                </div>
              </Card>
            </div>
            <div className="   w-full flex-end">
              <Card className=" ">
                <div className="mb-4 text-3xl font-bold text-center">
                  Total: {formatCurrency(calculateTotalPrice())}
                </div>
                <Button href="cart/address" className="">
                  Checkout
                </Button>
              </Card>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        show={openModal || deleteIndex !== null}
        onClose={() => {
          setOpenModal(false);
          setDeleteIndex(null);
        }}
      >
        <Modal.Header>Hapus Item</Modal.Header>
        <Modal.Body>
          {deleteIndex !== null ? (
            <p>Apakah Anda yakin ingin menghapus item ini?</p>
          ) : (
            <p>Jumlah akan dikurangi menjadi 0. Apakah Anda yakin?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <FlowbiteButton onClick={handleDeleteItem}>Ya</FlowbiteButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;

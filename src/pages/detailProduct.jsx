import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Modal } from "flowbite-react";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button as FlowbiteButton } from "flowbite-react";
import Swal from "sweetalert2";

function DetailProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [discusses, setDiscusses] = useState([]);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  const isUserLoggedIn = localStorage.getItem("token") ? true : false;

  // console.log("isUserLoggedIn:", isUserLoggedIn);

  const Avatar = JSON.parse(localStorage.getItem("image"));

  useEffect(() => {
    axios(
      `https://furnivul-web-app-production.up.railway.app/products/${productId}`
    )
      .then((result) => {
        setProductData(result.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        console.log("Product ID:", product.product_id);
        console.log("Existing Cart:", existingCart);
        console.log("Existing Product Index:", existingProductIndex);
      });

    axios(`https://furnivul-web-app-production.up.railway.app/reviews`)
      .then((result) => {
        setReviews(result.data.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });

    axios(`https://furnivul-web-app-production.up.railway.app/discusses`)
      .then((result) => {
        setDiscusses(result.data.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [productId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddToCart = (product) => {
    if (!isUserLoggedIn) {
      new Swal({
        icon: "error",
        title: "Oops...",
        text: "You must login first!",
        timer: 3000,
      });
      navigate("/login");
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Success! Added to cart",
        text: "Your product has been added to the cart.",
        timer: 3000,
      });
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // Product with the same ID is already in the cart, increase its quantity
      existingCart[existingProductIndex].quantity += 1;
    } else {
      // Product is not in the cart, add it with quantity 1
      const newProduct = { ...product, quantity: 1 };
      existingCart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setAddToCartSuccess(true);
    setTimeout(() => {
      setAddToCartSuccess(false);
    }, 3000);
  };

  return (
    <>
      <Breadcrumb
        aria-label="Breadcrumb contoh dengan latar belakang solid"
        className="bg-gray-50 ml-3 px-5 py-3 dark:bg-gray-800"
      >
        <Breadcrumb.Item href="/" icon={FaCartShopping}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/category-product">Kategori</Breadcrumb.Item>
        <Breadcrumb.Item href="/category-product/list-product">
          Daftar Produk
        </Breadcrumb.Item>
        <Breadcrumb.Item>Detail Produk</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mx-6">
        {productData ? (
          <div className="flex mt-6 mx-4">
            <div className="">
              <div className="flex sm:flex-col lg:flex-row ">
                <div className="">
                  <h1 className="text-3xl font-bold mb-4">
                    {productData.product_name}
                  </h1>
                  <p className="mb-2 text-lg">
                    Rate: {productData.product_rate}
                  </p>
                  <p className="mb-2 text-lg">
                    sold: {productData.product_sold}
                  </p>
                  <p className="mb-4 text-2xl font-bold">
                    Price: Rp {productData.product_price.toLocaleString()},-
                  </p>{" "}
                  <Button
                    className="mt-8 text-black bg-yellow-300 border border-gray-800 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleAddToCart(productData)}
                  >
                    Add to cart &nbsp;
                    <FaCartShopping />
                  </Button>
                </div>
                <div className="mx-auto ">
                  <img
                    src={productData.product_image}
                    alt={productData.product_name}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              {/* Button.Group and Buttons */}
              <div className="w-full bg-blue-500 rounded-xl">
                <div className="mt-6 w-full">
                  <Button.Group>
                    <Button
                      color={activeTab === "description" ? "blue" : "gray"}
                      onClick={() => handleTabChange("description")}
                      className=""
                    >
                      Deskripsi
                    </Button>
                    <Button
                      color={activeTab === "review" ? "blue" : "gray"}
                      onClick={() => handleTabChange("review")}
                    >
                      Ulasan
                    </Button>
                    <Button
                      color={activeTab === "discussion" ? "blue" : "gray"}
                      onClick={() => handleTabChange("discussion")}
                    >
                      Diskusi
                    </Button>
                  </Button.Group>
                </div>
              </div>
              {/* End of Button.Group and Buttons */}
              {/* Konten berdasarkan activeTab */}
              <div className="mt-4 w-full">
                {activeTab === "description" && (
                  <div className="">
                    <h1 className="mt-6 mb-2 font-bold ">
                      {productData.product_name}
                    </h1>
                    <div className="font-bold">Deskripsi :</div>
                    <p className="mt-1 mb-2">
                      {productData.product_description}
                    </p>
                    <div className="font-bold">Material:</div>
                    <p className=" mb-4">{productData.product_material}</p>
                  </div>
                )}
              </div>
              {activeTab === "review" && (
                <div>
                  <h1 className="mt-6 mb-2 font-bold">Ulasan</h1>
                  {/* Tampilkan ulasan di sini */}
                  {reviews.map((review) => (
                    <div key={review.id} className="mt-1 mb-2 space-y-2 ">
                      <div className="flex items-center gap-2">
                        {" "}
                        <img src={Avatar} className="w-10 h-10 rounded-full" />
                        {review._userId.fullname}
                      </div>
                      <p>Rating: {review.rating}</p>
                      <p>Ulasan: {review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Mengambil data...</p>
        )}
        {activeTab === "discussion" && (
          <div className="mx-4 mb-8 w-full">
            <h1 className=" mb-2  font-bold">Diskusi</h1>
            {}
            {discusses.map((discusses) => (
              <div key={discusses.id} className=" mb-2">
                <p>Anonim "{discusses.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default DetailProduct;

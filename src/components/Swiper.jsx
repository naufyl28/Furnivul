import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import axios from "axios";
import arrowright from "../assets/svg/arrow-right.svg";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://furnivul-web-app-production.up.railway.app/products")
      .then((response) => {
        const data = response.data.data;
        setData(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    data &&
    data.length > 0 && (
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        spaceBetween={5}
        slidesPerView={5}
        loop={true}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          620: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {data.map((item, index) => {
          let price = item.product_price;
          let formattedPrice = price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          });
          return (
            <SwiperSlide key={index}>
              <div className="swiper-slide xl:mx-8 lg:mx-8 md:mx-8 ">
                <div className="flex lg:flex-col flex-col p-4 bg-[#023047] border border-black rounded-lg  my-2 w-[300px] lg:w-[350px] xl:mx-8 lg:mx-8 md:mx-8  sm:mx-0">
                  <div className="my-2 text-white p-3">
                    <img
                      src={item.product_image}
                      alt="living room"
                      className="flex bg-white mx-auto rounded-lg w-full h-[150px] object-contain"
                    />

                    <h3 className="text-2xl font-semibold my-4">
                      {item.product_name.slice(0, 30) + "..."}
                    </h3>
                    <p className="text-lg font-medium my-4">
                      {item._categoryId.category}
                    </p>
                    <h3 className="text-2xl font-medium my-4">
                      {formattedPrice}
                    </h3>
                    <p className="text-lg font-medium my-4">
                      Tersedia banyak pilihan
                    </p>
                    {/* Atur disini */}
                    <Link
                      to={`/category-product/list-product/detail-product/${item._id}`}
                    >
                      <Button
                        href="#"
                        className="bg-[#ffb703] mt-8 py-2 px-4 rounded-xl border border-black text-black shadow w-max flex items-center gap-6 ml-auto"
                      >
                        <span className="text-lg">Detail Product </span> &nbsp;
                        <img src={arrowright} alt="" />
                      </Button>
                    </Link>
                    {/* Batas */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    )
  );
};

import React, { useEffect, useState } from "react";
import { Breadcrumb, Button } from "flowbite-react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

function Address() {
  const name = JSON.parse(localStorage.getItem("name"));
  const phone = JSON.parse(localStorage.getItem("phone"));
  const province = JSON.parse(localStorage.getItem("province"));
  const district = JSON.parse(localStorage.getItem("district"));
  const subdistrict = JSON.parse(localStorage.getItem("subdistrict"));
  const zipcode = JSON.parse(localStorage.getItem("zipcode"));

  return (
    <>
      <div className="mx-auto overflow-hidden ">
        {/* Tampilkan data di sini */}
      </div>

      <div className="p-8">
        <a
          className="text-gray-900 bg-white w-full border border-yellow-400 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          style={{ display: "block", textAlign: "center" }}
        >
          <Link to={"add-address"}>Tambah alamat baru</Link>
        </a>
      </div>
      <div>
        <div className="my-4 flex items-center justify-between max-w-screen-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover-bg-gray-700">
          {/* Tampilkan data di sini */}
          <div className="flex flex-col">
            <div className="text-2xl font-bold mb-4"> ALAMAT ANDA : </div>
            <div className="flex flex-col">
              <div className="flex items-between mb-2">
                <span className="font-semibold">Name   : </span> {name}
              </div>
              <div className="flex items-between mb-2">
                <span className="font-semibold">Phone   : </span> {phone}
              </div>
              <div className="flex items-between mb-2">
                <span className="font-semibold">Province   : </span> {province}
              </div>
              <div className="flex items-between mb-2">
                <span className="font-semibold">District     :  </span> {district}
              </div>
              <div className="flex items-between mb-2">
                <span className="font-semibold">Subdistrict   :  </span>{" "}
                {subdistrict}
              </div>
              <div className="flex items-between mb-2">
                <span className="font-semibold">Zipcode    :  </span> {zipcode}
              </div>
            </div>
          </div>
          <div className=" mr-10 ">
            <Button>
              <NavLink to={"/cart/address/add-address/checkout"}>
                <span> Select </span>
              </NavLink>
            </Button>
          </div>
        </div>
      </div>

      
    </>
  );
}

function AddressPage() {
  return (
    <div className="">
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
      >
        <Breadcrumb.Item href="#" icon={FaCartShopping}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Cart</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Address</Breadcrumb.Item>
      </Breadcrumb>
      
      <Address />
    </div>
  );
}

export default AddressPage;

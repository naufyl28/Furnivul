// AddAddress.jsx
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, TextInput } from "flowbite-react";
import { FaCartShopping } from "react-icons/fa6";
import { Form, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddAddress() {
  const token = JSON.parse(localStorage.getItem("token"));

  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [zipCode, setZipCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        "https://furnivul-web-app-production.up.railway.app/users",
        {
          phone: phone,
          province: province,
          district: district,
          subdistrict: subdistrict,
          zipcode: zipCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/cart/address");

      // kirim ke localstorage
      localStorage.setItem("phone", JSON.stringify(phone));
      localStorage.setItem("province", JSON.stringify(province));
      localStorage.setItem("district", JSON.stringify(district));
      localStorage.setItem("subdistrict", JSON.stringify(subdistrict));
      localStorage.setItem("zipcode", JSON.stringify(zipCode));

      Swal.fire({
        title: "Success! add address",
        text: "Your address has been added.",
        icon: "success",
        timer: 3000,
      });

      console.log(result);
    } catch (error) {
      new Swal("Oops Sorry!", "failed add address.", "error", {
        error,
      });
      console.error("Error adding address:", error);
    }
  };

  return (
    <div>
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
      >
        <Breadcrumb.Item href="#" icon={FaCartShopping}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Cart</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Address</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Add Address</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="w-full">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold">Add Address</h1>
          <div className="text-3xl font-semibold my-3 space-y-3">
            <div>
              <TextInput
                label="Phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <TextInput
                label="Province"
                placeholder="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div>
              <TextInput
                label="District"
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div>
              <TextInput
                label="Subdistrict"
                placeholder="Subdistrict"
                value={subdistrict}
                onChange={(e) => setSubdistrict(e.target.value)}
              />
            </div>

            <div>
              <TextInput
                label="Zip code"
                placeholder="Zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Address
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default AddAddress;

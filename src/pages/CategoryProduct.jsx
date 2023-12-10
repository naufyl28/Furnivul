// CategoryProduct.jsx
import React, { useEffect, useState } from "react";
import { Button, Card, Breadcrumb } from "flowbite-react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CategoryProduct() {
  const [datas, setData] = useState([]);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    axios
      .get(
        "https://furnivul-web-app-production.up.railway.app/product-categories"
      )
      .then((result) => {
        setData(result.data.data);
      });
  }, []);

  return (
    <div>
      <Breadcrumb
        aria-label="Breadcrumb dengan latar belakang solid"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800 ml-1"
      >
        <Breadcrumb.Item href="#" icon={FaCartShopping}>
          Beranda
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Category</Breadcrumb.Item>
      </Breadcrumb>

      <div className="my-3 ml-6 text-3xl font-semibold">
        <h1>Category Product</h1>
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-4 mb-4">
        {datas.map((data) => (
          <Card key={data._id} className="mt-3 mx-2">
            <img
              src={data.image_url}
              alt="produk"
              style={{ height: 200 }}
              className="object-cover rounded-t-md"
            />
            <div className="font-semibold text-xl">
              <p>{data.category}</p>
            </div>
            <div>
              <p>{data.description}</p>
            </div>
            <Link
              to={`/category-product/list-product/${data._id}`}
              categoryId={data._id}
            >
              <Button className="mt-3">Lihat Produk</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CategoryProduct;

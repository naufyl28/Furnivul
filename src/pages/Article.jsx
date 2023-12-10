import { Banner, Button, Card } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Article() {
  const [datas, setData] = useState([]);

  useEffect(() => {
    axios("https://64e224b4ab0037358818bf67.mockapi.io/articleFurniture")
      .then((result) => {
        // console.log("success fetching :", result.data);
        setData(result.data);
      })
      .catch((error) => {
        console.log("failed fetching :", error);
      });
  }, []);

  return (
    <>
      <Banner>
        <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
          <div className="mx-auto flex items-center">
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <MdAnnouncement className="mr-4 h-4 w-4" />
              <span className="[&_p]:inline">
                &nbsp; Lihat apa saja yang baru dari Furnivul&nbsp;
                <a
                  href="/category-product"
                  className="decoration-600 dark:decoration-500 inline font-medium text-cyan-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-cyan-500"
                >
                  di sini
                </a>
              </span>
            </p>
          </div>
          <Banner.CollapseButton
            color="gray"
            className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
          >
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton>
        </div>
      </Banner>
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 px-5 py-3 mx-4 dark:bg-gray-800"
      >
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Articles</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 mx-8 mb-8 ">
          {/* article axios */}

          {datas.map((datas) => (
            <div key={datas.id}>
              <Card
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mt-4 h-full"
                renderImage={() => (
                  <img
                    src={datas.image_article}
                    alt="image 1"
                    className="w-full h-56 object-cover"
                  />
                )}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {datas.title_article}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {datas.desc_title}
                </p>
                <div className="flex flex-end">
                  <NavLink to={`/article/detail-article/${datas.id}`}>
                    <Button>
                      {" "}
                      <span>DetailArticle</span>{" "}
                    </Button>
                  </NavLink>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Article;

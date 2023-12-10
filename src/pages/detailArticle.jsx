import { Breadcrumb, Card } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Assuming you use react-router-dom for routing

function DetailArticle() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios(`https://64e224b4ab0037358818bf67.mockapi.io/articleFurniture/${id}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
      >
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>

        <Breadcrumb.Item href="/article">Articles</Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="text-3xl font-semibold mt-4 mx-5">
        <p>{data.title_article}</p>

        <div className=" rounded-md mt-4 mb-2">
          <img
            className="rounded-md"
            width={450}
            height={350}
            src={data.image_article}
            alt="image 1"
          />
        </div>
        <div className="text-sm font-semibold mt-4">
          <p>{data.desc_title}</p>
        </div>
        <div className="text-sm font-semibold mt-4">
          <p>{data.content_article}</p>
        </div>
        <div className="text-sm font-semibold mt-4">
          <p>{data.creatAt}</p>
        </div>

        <div className="text-sm font-semibold mt-4">
          <p>{data.docs}</p>
        </div>
        <div className="text-sm font-semibold mt-4">
          <p>{data.author}</p>
        </div>
      </Card>
    </>
  );
}

export default DetailArticle;

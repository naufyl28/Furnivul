import { Footer } from "flowbite-react";
import Logo from "../assets/images/logo.png";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

function Component() {
  return (
    <Footer
      container
       fluid="true"
      style={{ backgroundColor: "#023047", color: "#ffffff" }}
    >
      <div className="w-full h-full">
        <div className="grid lg:grid-cols-3 w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 gap-4 items-stretch">
          <div className="mt-4">
            <Footer.Brand
              href="#"
              src={Logo}
              alt="Furnivul Logo"
              name={<span className="text-yellow-300">Furnivul</span>}
              className="text-white"
            />
            <div className="my-8">
              <span className="text-yellow-300">Furnivul</span> berdiri sejak
              nenek moyang <br></br> telah lahir menggunakan goresan tangan{" "}
              <br></br> sesepuh, dengan kearifan lokal yang mendunia.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Home" className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="category-product/list-product/655a2f5d7b4f6c96f968e716"
                  className="text-white"
                >
                  Kitchen
                </Footer.Link>
                <Footer.Link
                  href="category-product/list-product/6553eeb0d3596984234008c1"
                  className="text-white"
                >
                  Bed Room
                </Footer.Link>
                <Footer.Link
                  href="category-product/list-product/6553b0d780fad5b839ade6e0"
                  className="text-white"
                >
                  Living Room
                </Footer.Link>
                <Footer.Link
                  href="category-product/list-product/655a2f6d7b4f6c96f968e718"
                  className="text-white"
                >
                  Dining Room
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Category" className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="category-product/list-product/655a2f4f7b4f6c96f968e714"
                  className="text-white"
                >
                  Work Space
                </Footer.Link>
                <Footer.Link href="category-product" className="text-white">
                  OutDoor
                </Footer.Link>
                <Footer.Link href="category-product" className="text-white">
                  Child Room
                </Footer.Link>
                <Footer.Link href="category-product" className="text-white">
                  Accesories
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Utilities" className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="article" className="text-white">
                  Article
                </Footer.Link>
                <Footer.Link href="category-product" className="text-white">
                  Category
                </Footer.Link>
                <Footer.Link href="#" className="text-white">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" className="text-white">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex justify-center gap-4 sm:items-center sm:flex-end">
          <Footer.Copyright
            href="#"
            by="Furnivul™ All rights reserved"
            year={2023}
            className="text-white"
          />
          <div className="mt-4  flex gap-2 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              style={{ color: "#FFB703" }}
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              style={{ color: "#FFB703" }}
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
              style={{ color: "#FFB703" }}
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
              style={{ color: "#FFB703" }}
            />
            <Footer.Icon
              href="#"
              icon={BsDribbble}
              style={{ color: "#FFB703" }}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Component;

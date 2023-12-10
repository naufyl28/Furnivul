import React from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

function NavbarComponent({ isAdmin }) {
  const isLoggedIn = JSON.parse(localStorage.getItem("idUser"));
  const profileUser = JSON.parse(localStorage.getItem("image"));
  const nameUser = JSON.parse(localStorage.getItem("name"));
  const emailUser = JSON.parse(localStorage.getItem("email"));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  let component = "";

if (isLoggedIn) {
  component = (
    <div className="flex items-center">
      <div className="mx-3 text-white">{nameUser}</div>
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt="User settings" img={profileUser} rounded />}
      >
        <Dropdown.Header>
          <span className="block text-sm font-bold mb-3 text-center">
            {nameUser}
          </span>
          <span className="block truncate text-sm font-medium">
            {emailUser}
          </span>
        </Dropdown.Header>
        {nameUser === "admin" && (
          <>
            <Dropdown.Item>
              <NavLink to={"/dashboard"}>Admin</NavLink>
            </Dropdown.Item>
          </>
        )}
        {nameUser !== "admin" && !nameUser?.toLowerCase()?.includes("toko") && (
          <>
            <NavLink to={"/status"}>
              <Dropdown.Item>Status Pemesanan</Dropdown.Item>
            </NavLink>
          </>
        )}

        {isLoggedIn && !nameUser?.toLowerCase()?.includes("toko") && (
          <>
            <NavLink to={"/cart"}>
              <span>
                <Dropdown.Item>Cart</Dropdown.Item>
              </span>
            </NavLink>
          </>
        )}
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
} else {
  component = (
    <div className="flex gap-1">
      <Button className="">
        <NavLink to={"/login"} className="text-white">
          <span>Login</span>
        </NavLink>
      </Button>
      <Button>
        <NavLink to={"/register"} className="text-white">
          <span>Register</span>
        </NavLink>
      </Button>
    </div>
  );
  // Hide category and cart options for not logged-in users
}
  return (
    <div className="my-0 mx-0">
      <Navbar fluid style={{ backgroundColor: "#023047" }}>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img
            src={Logo}
            className="mr-3 sm:h-9 flex-start"
            style={{ height: 35, width: 38 }}
            alt="Flowbite React Logo"
          />
          <span className="text-2xl font-bold text-white">Furnivul</span>
        </Navbar.Brand>

        <Navbar.Collapse className="">
          <NavLink to={"/"} className="mt-1">
            <Navbar.Link>
              <span className="text-white">Home</span>
            </Navbar.Link>
          </NavLink>
          <NavLink to={"/category-product"} className="mt-1">
            <Navbar.Link>
              <span className="text-white">Category</span>
            </Navbar.Link>
          </NavLink>
          <NavLink to={"/article"} className="mt-1">
            <Navbar.Link>
              <span className="text-white">Article</span>
            </Navbar.Link>
          </NavLink>

          {nameUser && nameUser.toLowerCase().includes("toko") && (
            <NavLink to={"/mystore"} className="mt-1">
              <Navbar.Link>
                <span className="text-white">My Store</span>
              </Navbar.Link>
            </NavLink>
          )}
        </Navbar.Collapse>

        {<div className="text-white">{component}</div>}

        <Navbar.Toggle />
      </Navbar>
    </div>
  );
}

export default NavbarComponent;

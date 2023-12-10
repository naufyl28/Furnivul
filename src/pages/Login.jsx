import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Form } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios
      .post("https://furnivul-web-app-production.up.railway.app/auth/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        // console.log(result);
        const token = result.data.data.token;
        const decoded = jwtDecode(token);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("idUser", JSON.stringify(decoded.id));
        pushDataUser();

        new Swal(
          "Success! login",
          "your account has been login.",
          "success",
          {
            timer: 3000,
          },
          navigate("/")
        );
      })
      .catch((error) => {
        // console.log(error);
        new Swal(
          "Opps Sorry!",
          "your account has been failed login.",
          "error",
          {
            error,
          }
        );
      });
  };

  const pushDataUser = async () => {
    const id = JSON.parse(localStorage.getItem("idUser"));
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(id);
    // console.log(token);
    await axios
      .get(`https://furnivul-web-app-production.up.railway.app/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result.data.data);
        localStorage.setItem("name", JSON.stringify(result.data.data.fullname));
        localStorage.setItem("email", JSON.stringify(result.data.data.email));

        localStorage.setItem(
          "image",
          JSON.stringify(result.data.data.image_url)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="bg-cyan-800 dark:bg-gray-900 pt-8  justify-center bg-background bg-no-repeat bg-cover bg-center ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:gap-8 justify-center ">
        <div className="  mb-8">
          <div className="w-full lg:max-w-xl p-6 space-y-4 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800  pt-8 justify-center">
            <div className="">
              <div className="flex w-full h-full  justify-center text-center mr-2">
                <img src={Logo} alt="" className="h-10 w-10 mr-2" />
                <div>
                  <p className="font-bold text-4xl justify-center  allign-center dark:text-white mt-1">
                    Furnivul
                  </p>
                </div>
              </div>
            </div>

            <div className="flex text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              <Label
                htmlFor="name"
                className="block text-2xl font-bold text-gray-900 dark:text-white "
              >
                Log In
              </Label>
            </div>
            <Form
              id="login-form"
              onSubmit={handleLogin}
              className="space-y-6"
              action="#"
            >
              <div>
                <Label
                  htmlFor="email1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white justify-center"
                >
                  Your email
                </Label>
                <TextInput
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan Email"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="password1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                >
                  Your password
                </Label>
                <TextInput
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  required
                />
              </div>
              <div className="flex items-start mt-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Remember this device
                </Label>
                &nbsp;
                <a
                  href="#"
                  className="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div>
              <Button
                type="submit"
                id="btn-submit"
                className="submit-button mt-3"
              >
                Log In
              </Button>
              <div className="flex text-sm mt-3 font-medium">
                <div className=" text-gray-900 dark:text-white">
                  Not registered yet?
                </div>
                &nbsp;
                <a
                  href="/register"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Create account
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

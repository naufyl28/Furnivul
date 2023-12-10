import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let image_url =
      "https://img.icons8.com/?size=512&id=tZuAOUGm9AuS&format=png";

    await axios
      .post(
        "https://furnivul-web-app-production.up.railway.app/auth/register",
        {
          fullname: fullname,
          email: email,
          password: password,
          image_url: image_url,
        }
      )
      .then((result) => {
        new Swal(
          "Success!",
          "your account has been successfully created.",
          "success",
          {
            timer: 3000,
          },
          navigate("/login")
        );
      })
      .catch((error) => {
        new Swal(
          "Opps Sorry!",
          "your account has been failed created.",
          "error",
          {
            error,
          }
        );
      });
  };

  return (
    <section className="bg-cyan-800 dark:bg-gray-900 justify-center  ">
      <div className="justify-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:gap-8 ">
        <div className=" pt-2 mb-8">
          <div className="w-full mb-6 lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800 mt-8 pt-8 justify-center">
            <div className="flex gap-4 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center justify-center"></div>
            <form className="" onSubmit={handleRegister}>
              <div>
                <Label
                  htmlFor="name"
                  className="block mb-2 text-3xl font-bold text-gray-900 dark:text-white justify-center"
                >
                  Sign Up
                </Label>
                <Label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                >
                  Your name
                </Label>
                <TextInput
                  id="fullname"
                  placeholder="Full Name"
                  className="input-field"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                >
                  Email address
                </Label>
                <TextInput
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Password"
                  required
                />
              </div>

              <div className="flex items-start mt-4 mb-4">
                <Checkbox
                  id="remember"
                  aria-describedby="remember"
                  name="remember"
                  type="checkbox"
                  className="checkbox-field"
                  required
                />
                <Label htmlFor="remember" className="ml-2 text-sm">
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
              <Button type="submit" id="btn-submit" className="">
                Register
              </Button>
              <div className="text-sm mt-3 font-medium text-gray-900 dark:text-white gap-1">
                Have an account?
                <a
                  href="../login/login.html"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  <NavLink to={"/login"}>
                    &nbsp;<span>Login</span>
                  </NavLink>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

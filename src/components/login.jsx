import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "./api/axios";
import { useState, useRef } from "react";

function LoginForm({ setLoggedIn }) {
  const [message, setMessage] = useState("");
  const messageBox = useRef(null);
  const showMessage = (type) => {
    const color = type === "success" ? "bg-green-700" : "bg-red-700";
    messageBox.current.classList.add(color);
    messageBox.current.classList.remove("hidden");
    setTimeout(() => {
      messageBox.current.classList.add("hidden");
      messageBox.current.classList.remove("bg-green-700", "bg-red-700");
    }, 3000);
  };

  const handleLoginSubmit = async (data) => {
    try {
      await axiosInstance.post("/login", data, {
        withCredentials: true,
      });
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data);
      showMessage();
    }
  };
  return (
    <div className="bg-gray-200">
      <div className="container h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col w-96 bg-white shadow-xl rounded-lg p-4 space-y-6">
          <div>
            <p className="text-2xl font-medium mb-2">Log in</p>
            <p className="text-xs text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .max(50, "Must be 50 characters or less")
                .required("Required")
                .matches(
                  /^[\w-\.]+@([\w-]+\.)+[\w]{2,4}$/,
                  "Invalid email address"
                ),
              password: Yup.string()
                .required("Required")
                .min(8, "Must be 8 characters or more"),
            })}
            onSubmit={(values) => handleLoginSubmit(values)}
          >
            <Form className="flex flex-col space-y-5">
              <Field
                name="email"
                type="email"
                className="outline-none bg-gray-100 rounded p-2"
                placeholder="Email"
              />
              <ErrorMessage name="email" />
              <Field
                name="password"
                type="password"
                className="outline-none bg-gray-100 rounded p-2"
                placeholder="Password"
              />
              <ErrorMessage name="password" className="text-red-400" />
              <Link
                to="/reset-password"
                className="text-sm cursor-pointer font-medium text-blue-700"
              >
                Forgot Password?
              </Link>
              <button
                type="submit"
                className="bg-blue-700  text-white rounded p-3"
              >
                Login
              </button>
            </Form>
          </Formik>
          <div>
            <span className="text-sm text-gray-500">Not a member yet?</span>
            <Link
              to="/signup"
              className="text-sm text-blue-700 font-medium ml-2 cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <p
        ref={messageBox}
        className="hidden absolute bottom-5 right-5 px-4 py-2 text-white rounded"
      >
        {message}
      </p>
    </div>
  );
}

export default LoginForm;

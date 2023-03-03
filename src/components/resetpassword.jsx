import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "./api/axios";
import { useState, useRef } from "react";
function ResetPassword() {
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

  const handleResetPasswordSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/reset-password", data);
      setMessage(response.data);
      showMessage("success");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data);
      showMessage();
    }
  };
  return (
    <div className="bg-gray-200">
      <div className="container h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col shadow-xl rounded-lg p-4 space-y-6 bg-white sm:w-96">
          <div>
            <p className="text-2xl font-medium mb-2">Reset Password</p>
            <p className="text-xs text-gray-500">
              Ohh! Someone forgot their password :P
            </p>
          </div>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={Yup.object({
              first_name: Yup.string()
                .max(50, "Must be 50 characters or less")
                .required("Required"),
              last_name: Yup.string()
                .max(50, "Must be 50 characters or less")
                .required("Required"),
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
              confirm_password: Yup.string()
                .required("Required")
                .min(8, "Must be 8 characters or more")
                .oneOf([Yup.ref("password")], "Password must match"),
            })}
            onSubmit={(values) => handleResetPasswordSubmit(values)}
          >
            <Form className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-5 sm:flex-row sm:space-x-2 sm:space-y-0">
                <div className="flex flex-col basis-1/2">
                  <Field
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    className="outline-none rounded bg-gray-100 p-2 w-full"
                  />
                  <ErrorMessage name="first_name" />
                </div>
                <div className="flex flex-col basis-1/2">
                  <Field
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    className="outline-none rounded bg-gray-100 p-2 w-full"
                  />
                  <ErrorMessage name="last_name" />
                </div>
              </div>
              <Field
                name="email"
                type="text"
                placeholder="Email"
                className="outline-none p-2 bg-gray-100 rounded"
              />
              <ErrorMessage name="email" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="outline-none p-2 bg-gray-100 rounded"
              />
              <ErrorMessage name="password" />
              <Field
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                className="outline-none p-2 bg-gray-100 rounded"
              />
              <ErrorMessage name="confirm_password" />
              <button
                type="submit"
                className="bg-blue-700 text-white p-3 rounded"
              >
                Reset Password
              </button>
            </Form>
          </Formik>
          <Link
            to="/"
            className="ml-auto text-blue-700 font-medium text-sm cursor-pointer"
          >
            Try another way
          </Link>
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
export default ResetPassword;

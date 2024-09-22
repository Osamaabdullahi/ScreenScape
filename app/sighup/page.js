"use client";

import { useAppStore } from "@/store";
import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const SignIn = () => {
  const router = useRouter();
  const isDarkMode = true;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    CreateAccount();
  };

  const CreateAccount = async () => {
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (response.ok) {
      toast.success("account created ");
      router.push("sighin");
    } else if (!response.ok) {
      toast.error("wrong credentials");
    }

    setIsLoading(false);
  };

  const handleGoogleSignIn = () => {};

  const handleFacebookSignIn = () => {};

  return (
    <Suspense>
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100"
        } py-12 px-4 sm:px-6 lg:px-8`}
      >
        <ToastContainer />
        <div className="max-w-sm w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              {isDarkMode ? "Create your account" : "Create your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/sighin"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign in to an existing account
              </Link>{" "}
              if you already have one.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    required
                    className={`text-black appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 text-white"
                        : "border-gray-300"
                    } placeholder-gray-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    required
                    className={`text-black appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      isDarkMode
                        ? "border-gray-700 text-white"
                        : "border-gray-300"
                    } placeholder-gray-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`text-black appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    isDarkMode
                      ? "border-gray-700 text-white"
                      : "border-gray-300"
                  } placeholder-gray-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`text-black appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    isDarkMode
                      ? "border-gray-700 text-white"
                      : "border-gray-300"
                  } placeholder-gray-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="text-black h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              {/* <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isDarkMode
                  ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              Sign in
            </button> */}
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
                disabled={false}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm10 4a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                ) : (
                  "  Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="flex justify-between mt-6">
            <button
              className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium ${
                isDarkMode
                  ? "text-gray-700 hover:bg-gray-700 hover:text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FaGoogle className="mr-2" />
              Log in with Google
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium ${
                isDarkMode
                  ? "text-gray-700 hover:bg-gray-700 hover:text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FaFacebookF className="mr-2" />
              Log in with Facebook
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SignIn;

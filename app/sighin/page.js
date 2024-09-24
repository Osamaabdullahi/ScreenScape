"use client";

import { useAppStore } from "@/store";
import Link from "next/link";
import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuthStore } from "@/store";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const Login = () => {
  const isDarkMode = true;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/`;
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
      const decoded = jwt.decode(result.access);
      const { email, first_name, last_name, user_id, admin } = decoded;
      login({
        email,
        first_name,
        last_name,
        user_id,
        refresh: result.refresh,
        admin,
      });
      router.push("/");
      if (response.ok) {
        toast.success("you have been logged in");
      }
    }
    toast.error("account doesnt exist");
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {};

  const handleFacebookLogin = () => {};

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
              {isDarkMode ? "Log in to your account" : "Log in to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link
                href="/sighup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                create new account
              </Link>
              if you don&apos;t have one.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
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
                  } rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
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
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
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
                  "  log in"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center mt-6">
            <div
              className={`w-full border-t border-gray-300 ${
                isDarkMode ? "border-gray-700" : ""
              }`}
            ></div>
            <span
              className={`mx-4 ${
                isDarkMode ? "text-gray-500" : "text-gray-700"
              }`}
            >
              OR
            </span>
            <div
              className={`w-full border-t border-gray-300 ${
                isDarkMode ? "border-gray-700" : ""
              }`}
            ></div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleGoogleLogin}
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
              onClick={handleFacebookLogin}
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

export default Login;

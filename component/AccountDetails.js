"use client";

import React from "react";
import useCartStore, { useAppStore, useAuthStore } from "@/store";
const AccountDetails = () => {
  const isDarkMode = useAppStore((state) => state.night);
  const user = useAuthStore((state) => state.user);

  const test =
    localStorage.getItem("auth-storage") !== null
      ? JSON.parse(localStorage.getItem("auth-storage")).state.user
      : null;

  return (
    <div
      className={`flex flex-col items-center md:flex-row md:items-start md:space-x-8 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* User Avatar and Info */}
      <div
        className={`flex flex-col items-center p-6 shadow-md rounded-lg w-full md:w-1/3 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <img
          className="w-32 h-32 rounded-full mb-4"
          src="https://via.placeholder.com/150"
          alt="User Avatar"
        />
        <h3 className="text-2xl font-semibold mb-2">{user.email}</h3>
        <p className="text-gray-600 mb-1">{user.first_name}</p>
        <p className="text-gray-600">{user.last_name}</p>
      </div>

      {/* User Details and Payment Info */}
      <div
        className={`p-6 shadow-md rounded-lg w-full md:w-2/3 mt-6 md:mt-0 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h3 className="text-2xl font-semibold mb-4">Account Details</h3>
        <div className="mb-4">
          <h4 className="text-xl font-medium mb-2">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <p
                className={`p-2 rounded ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {user.first_name}
              </p>
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <p
                className={`p-2 rounded ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {user.last_name}
              </p>
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <p
                className={`p-2 rounded ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-medium mb-2">Payment Information</h4>
          <div
            className={`p-4 rounded ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <p>
              <strong>Card Holder:</strong> John Doe
            </p>
            <p>
              <strong>Card Number:</strong> **** **** **** 1234
            </p>
            <p>
              <strong>Expiry Date:</strong> 12/23
            </p>
            <p>
              <strong>Billing Address:</strong> 123 Main St, San Francisco, CA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;

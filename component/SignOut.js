import React from "react";
import { useAppStore, useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

const SignOut = () => {
  const isDarkMode = useAppStore((state) => state.night);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("logged out succesfully");
    router.push("sighin");
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <ToastContainer />
      <h3 className="text-2xl font-semibold mb-4">Sign Out</h3>
      {/* <p>
        {isDarkMode
          ? "Sign out content goes here in dark mode..."
          : "Sign out content goes here..."}
      </p> */}
      <button
        onClick={() => handleLogout()}
        className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 ${
          isDarkMode ? "dark:bg-gray-600" : ""
        }`}
      >
        Log out
      </button>
    </div>
  );
};

export default SignOut;

"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <Head>
        <title>Sign In - CineVerse</title>
      </Head>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md" // Full width in mobile, max-width in larger screens
        style={{ width: "100%", padding: 20 }} // Inline styles for padding
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600" // Increased padding
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600" // Increased padding
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Sign In
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-red-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

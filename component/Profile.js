"use client";
import React from "react";
import { UserCircle, Film, Clock, Heart, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button className="flex items-center px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors duration-300">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <UserCircle className="h-24 w-24 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">
                  John Doe
                </h2>
                <p className="text-gray-400 text-center">Premium Member</p>
              </div>
              <div className="border-t border-gray-700 px-6 py-4">
                <p className="text-sm">
                  <span className="text-gray-400">Email:</span>{" "}
                  johndoe@example.com
                </p>
                <p className="text-sm mt-2">
                  <span className="text-gray-400">Member since:</span> January
                  1, 2023
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold">Viewing Activity</h3>
              </div>
              <ul className="divide-y divide-gray-700">
                {[
                  {
                    icon: Film,
                    title: "Inception",
                    subtitle: "Watched on May 15, 2023",
                  },
                  {
                    icon: Clock,
                    title: "Stranger Things",
                    subtitle: "Continue watching - Season 2, Episode 5",
                  },
                  {
                    icon: Heart,
                    title: "The Shawshank Redemption",
                    subtitle: "Added to favorites on June 1, 2023",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="px-6 py-4 hover:bg-gray-750 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <item.icon className="h-6 w-6 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

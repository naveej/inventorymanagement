import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import {
  Backpack,
  BookText,
  House,
  Library,
  Settings,
  User,
} from "lucide-react";
import { ModeToggle } from "./modeTogglebutton";

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-background border-r dark:border-gray-700">
      <Link href="/">
        <div className="flex justify-center item-center">
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className="w-20 aspect-square cursor-pointer"
          />
        </div>
      </Link>

      <Link
        href="#"
        className="flex mt-2 justify-center items-center px-4 -mx-2"
      >
        <span className="mx-2 font-medium justify-center text-center text-gray-800 dark:text-gray-200">
          Jeevan Kumar
        </span>
      </Link>

      <div className="relative mt-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            Dashboard
          </h2>
          <Link href="/dashboard/skillmatrix">Skill Matrix</Link>
          <br></br>
          <Link href="/dashboard/assetMaintenance">Asset Maintenance</Link>
          <br></br>
          <Link href="/dashboard/caliberation_Schedule">
            Caliberation Schedule
          </Link>
          <br></br>
          <Link href="/dashboard/ncOutput">NC Output</Link>
          <nav className="mt-4">
            <h3 className="text-lg font-medium text-white">Forms</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/Skillmatrixform">
                  <div className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <BookText />
                    <span className="mx-4 font-medium">Skill Matrix Form</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/AssetMaintenanceform">
                  <div className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <BookText />
                    <span className="mx-4 font-medium">
                      Asset Maintenance Form
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/CaliberationScheduleform">
                  <div className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <BookText />
                    <span className="mx-4 font-medium">
                      Caliberation Schedule Form
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/NCOutputform">
                  <div className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <BookText />
                    <span className="mx-4 font-medium">NC Output Form</span>
                  </div>
                </Link>
              </li>
            </ul>
            <h3 className="mt-6 text-lg font-medium text-white">General</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <House />
                  <span className="mx-4 font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <Settings />
                  <span className="mx-4 font-medium">Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <User />
                  <span className="mx-4 font-medium">Accounts</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <Library />
                  <span className="mx-4 font-medium">Categories</span>
                </Link>
              </li>
              <ModeToggle />
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

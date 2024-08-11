import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="bg-gray-900 p-4 border border-gray-600">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-300 text-2xl font-bold">
          Inventory Management
        </div>
        <div className="space-x-4 flex items-center">
          <div className="relative">
            <button
              onClick={() => setIsFormsOpen(!isFormsOpen)}
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 whitespace-nowrap"
            >
              Forms
            </button>
            {isFormsOpen && (
              <div className="absolute top-full mt-2 bg-gray-800 shadow-lg !text-sm rounded-md w-32">
                <Link
                  href="/Skillmatrixform"
                  className="block px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap"
                >
                  Skill <br></br> Matrix
                </Link>
                <Link
                  href="/AssetMaintenanceform"
                  className="block px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap"
                >
                  Asset <br></br> Maintenance
                </Link>
                <Link
                  href="/CaliberationScheduleform"
                  className="block px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap"
                >
                  Caliberation <br></br> Schedule
                </Link>
                <Link
                  href="/NCOutputform"
                  className="block px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap"
                >
                  NC <br></br> Output
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap"
                >
                  Form 4
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-white hover:bg-gray-700 whitespace-nowrap"
                >
                  Form 5
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 whitespace-nowrap"
          >
            Home
          </Link>
          <Link
            href="/SignIn"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 whitespace-nowrap"
          >
            Login
          </Link>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 whitespace-nowrap"
            >
              Dashboard
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 mx-[-6] !text-sm rounded-lg shadow-lg">
                <Link href="/dashboard/skillmatrix">
                  <span className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
                    Skill Matrix
                  </span>
                </Link>
                <Link href="/dashboard/assetMaintenance">
                  <span className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
                    Asset Maintenance
                  </span>
                </Link>
                <Link href="/dashboard/caliberation_Schedule">
                  <span className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
                    Calibration Schedule
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";
import UserManagement from "@/components/customUI/UserManagement";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const UserCreate = () => {
  const [role, setRole] = useState("User");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "User",
    departmentName: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <motion.div
        className="p-6 max-w-lg mx-auto mt-12 bg-white dark:bg-gray-900 shadow-lg rounded-md"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.8,

          ease: "easeInOut",
        }}
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center dark:text-gray-200 mb-4">
          User Creation
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300"
            htmlFor="role"
          >
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={(e) => {
              setRole(e.target.value);
              handleInputChange(e);
            }}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Department">Department</option>
          </select>
        </div>

        {/* Department Name*/}
        {role === "Department" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300"
              htmlFor="departmentName"
            >
              Department Name
            </label>
            <select
              name="departmentName"
              id="departmentName"
              value={formData.departmentName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
            >
              <option value="Engineering">Engineering</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Civil">Civil</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
        )}
        <div className="flex mx-auto justify-center">
          <Button className="rounded" variant="secondary">
            Submit
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default UserCreate;

"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const UserManagement = () => {
  const users:any = fetch('/api/get/authUser/users');
  console.log(users)

  const handleUserAction = (action: string, userId: number) => {
    switch (action) {
      case "view":
        // Handle view user
        console.log(`Viewing user with ID: ${userId}`);
        break;
      case "edit":
        // Handle edit user
        console.log(`Editing user with ID: ${userId}`);
        break;
      case "delete":
        // Handle delete user
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto mt-12 bg-white dark:bg-gray-900 shadow-lg rounded-md"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        User Management
      </h2>

      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              First Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Last Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Email
            </th>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Role
            </th>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user:any) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                {user.firstName}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                {user.lastName}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                {user.role}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                <Button
                  className="mr-2 !bg-green-400/70 hover:!bg-green-700"
                  variant="secondary"
                  onClick={() => handleUserAction("view", user.id)}
                >
                  View
                </Button>
                <Button
                  className="mr-2 !bg-yellow-300/70 hover:!bg-yellow-300"
                  variant="secondary"
                  onClick={() => handleUserAction("edit", user.id)}
                >
                  Edit
                </Button>
                <Button
                  className="mr-2 !bg-red-500/70 hover:!bg-red-800"
                  variant="secondary"
                  onClick={() => handleUserAction("delete", user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default UserManagement;

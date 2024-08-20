"use client";
import UserManagement from "@/components/customUI/UserManagement";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import {signIn, useSession} from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
 export const UserProfile = ()=>{
    const {data: session, update} = useSession();
    const router = useRouter();
    
    const [formData, setFormData] = useState({
    firstName: session?.user?.firstName as string,
    lastName: session?.user?.lastName as string,
    email: session?.user?.email as string,
    role: session?.user?.role as string,
    departmentName: session?.user?.departmentName as string
});

    const handleUpdate = async (e:any) =>{
        e.preventDefault();
        if(!formData.firstName || !formData.lastName || !formData.email){
            toast.error("Please fill all the fields");
            return;
        }
        try {
          const response = axios.put(`/api/post/update/userProfile`, { ...formData, _id: session?.user?.id });
          toast.promise(response, {
            loading: "Loading...",
            success: async()=>{
              return "Profile updated successfully";
            },
            error: "Failed to update profile"
          });
          const result = await response;
          console.log("Result", result);
          router.push('/');
        } catch (error) {
          console.error('Error updating profile:', error);
          toast.error("Failed to update profile");
        }
        update();
        }
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    
    return(
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
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          User Profile
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

        {/* Role */}
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300"
            htmlFor="role"
          >
            Role
          </label>
          <input
            name="role"
            id="role"
            value={formData.role}
            disabled
            className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
          />
        </div>

        {/* Department Name*/}
        {formData.role === "department" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300"
              htmlFor="departmentName"
            >
              Department Name
            </label>
            <input
              name="departmentName"
              id="departmentName"
              value={formData.departmentName}
              disabled
              className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
            />

          </div>
        )}
        <div className="flex mx-auto justify-center">
          <Button onClick={handleUpdate} className="rounded" variant="secondary">
            Update
          </Button>
        </div>
      </motion.div>
        </>
    )
}
export default UserProfile;
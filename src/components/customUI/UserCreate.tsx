"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/app/_types/userRole";

// Define the form schema using zod
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required." }),
  lastName: z.string().min(1, { message: "Last Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["admin", "department"]),
  departmentName: z.string().optional(),
});

const UserCreate = () => {
  const router = useRouter();
  const [role, setRole] = useState("User");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      departmentName: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/post/authUser/register", data);
      toast.success("User registered successfully");
      router.push("/success"); // Redirect to a success page or another route
    } catch (error) {
      toast.error("Failed to register user");
    }
  };

  return (
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <FormInput
              label="First Name"
              id="firstName"
              placeholder="First Name"
              defaultValue={field.value}
              onChangeFunction={field.onChange}
              required
            />
          )}
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <FormInput
              label="Last Name"
              id="lastName"
              placeholder="Last Name"
              defaultValue={field.value}
              onChangeFunction={field.onChange}
              required
            />
          )}
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormInput
              label="Email"
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={field.value}
              onChangeFunction={field.onChange}
              required
            />
          )}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormInput
              label="Password"
              type="password"
              id="password"
              placeholder="Password"
              defaultValue={field.value}
              onChangeFunction={field.onChange}
              required
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mb-4">
              <label
                htmlFor="role"
                className="mb-1 ml-1 text-[0.9rem] text-foreground/80"
              >
                Role
              </label>
              <select
                {...field}
                onChange={(e) => {
                  setRole(e.target.value);
                  field.onChange(e);
                }}
                className="p-2 rounded text-foreground bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              >
                <option value="admin">Admin</option>
                <option value="department">Department</option>
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>
          )}
        />

        {role === UserRole.Department && (
          <Controller
            name="departmentName"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="departmentName"
                  className="mb-1 ml-1 text-[0.9rem] text-foreground/80"
                >
                  Department Name
                </label>
                <select
                  {...field}
                  className="p-2 rounded text-foreground bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
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
                {errors.departmentName && (
                  <p className="text-red-500">
                    {errors.departmentName.message}
                  </p>
                )}
              </div>
            )}
          />
        )}

        <div className="flex mx-auto justify-center">
          <Button type="submit" className="rounded" variant="secondary">
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserCreate;

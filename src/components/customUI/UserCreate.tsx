"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "./FormInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the form schema using zod
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required." }),
  lastName: z.string().min(1, { message: "Last Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["Admin", "User", "Department"]),
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
      role: "User",
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField name="firstName" control={control}>
          {({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage>{errors.firstName?.message}</FormMessage>
            </FormItem>
          )}
        </FormField>

        <FormField name="lastName" control={control}>
          {({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage>{errors.lastName?.message}</FormMessage>
            </FormItem>
          )}
        </FormField>
        <FormInput
          label="Last Name"
          id="Last Name"
          placeholder="Last Name"
          onChangeFunction={setName}
        />
        <FormField name="email" control={control}>
          {({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        </FormField>

        <FormField name="password" control={control}>
          {({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
          )}
        </FormField>

        <FormField name="role" control={control}>
          {({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => {
                    setRole(e.target.value);
                    field.onChange(e);
                  }}
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Department">Department</option>
                </select>
              </FormControl>
              <FormMessage>{errors.role?.message}</FormMessage>
            </FormItem>
          )}
        </FormField>

        {role === "Department" && (
          <FormField name="departmentName" control={control}>
            {({ field }) => (
              <FormItem>
                <FormLabel>Department Name</FormLabel>
                <FormControl>
                  <select
                    {...field}
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
                </FormControl>
                <FormMessage>{errors.departmentName?.message}</FormMessage>
              </FormItem>
            )}
          </FormField>
        )}

        <div className="flex mx-auto justify-center">
          <Button type="submit" className="rounded" variant="secondary">
            Submit
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default UserCreate;

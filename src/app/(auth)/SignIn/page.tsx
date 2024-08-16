"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/dist/client/link";
import useUserStore from "@/store/useUserStore";
import { type userTypes } from "@/store/useUserStore";

const Login = () => {
  const { setUser, setIsAdmin } = useUserStore();

  
  // const handleLogin = async () => {
  //   const result = await fetch("./some/login/path")
  //   const user: userTypes = {
  //     name: result?.name || ,
  //     registerNo: result?.regno,
  //     email: result?.email,
  //     role: result?.role,
  //   }

  //   // After Successful login, save user to Zustand store
  //   setUser(user);
  //   if(user.role == "admin"){
  //     setIsAdmin(true)
  //   }
  // };

  return (
    <section className="bg-card">
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md overflow-hidden rounded-lg shadow-lg bg-card"
        >
          <div className="bg-card px-8 py-10 dark:bg-slate-900">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-card-foreground">Login</h3>
              <p className="text-sm text-muted-foreground">
                Access your account
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-card-foreground"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 text-foreground bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-card-foreground"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-foreground bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-primary-foreground bg-primary rounded focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Login
              </button>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                href="/SignUp"
                className="text-primary font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Login;

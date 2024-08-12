"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/dist/client/link";

const SignUp = () => {
  return (
    <section className="bg-card">
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md overflow-hidden rounded-lg bg-card dark:bg-card shadow-black shadow-2xl"
        >
          <div className="px-8 py-10 dark:bg-slate-900">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-card-foreground">
                Sign Up
              </h3>
              <p className="text-sm text-gray-500 dark:text-muted-foreground">
                Create an account
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-white dark:text-card-foreground"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white dark:text-card-foreground"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white dark:text-card-foreground"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-white dark:text-card-foreground"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign Up
              </button>
            </div>
            <p className="text-sm text-center text-gray-400 dark:text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/SignIn"
                className="text-blue-500 font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default SignUp;

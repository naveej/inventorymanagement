"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/dist/client/link";
import useUserStore from "@/store/useUserStore";
import { type userTypes } from "@/store/useUserStore";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/');
    }
  }, [router, session, status])

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (!email)
      setEmailError("Email is required");

    if (!password)
      setPasswordError("Password is required");

    try {
      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success('Login successful!');
        router.push('/');
      } else
        toast.error(result?.error || 'Failed to login');
    } catch (error) {
      console.error('LoginError', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <section className="bg-card">
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onSubmit={handleLogin}
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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-foreground bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-foreground bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-primary-foreground bg-primary rounded focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Login
              </button>
            </div>
            {/* <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                href="/SignUp"
                className="text-primary font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p> */}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Login;

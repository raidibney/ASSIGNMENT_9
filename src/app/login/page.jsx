"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { data, error } = await authClient.signIn.email({
    email,
    password,
  });

  if (error) {
    toast.error(error.message || "Login failed.");
  } else {
    toast.success("Welcome back!");
    // No need for window.location.href or dispatchEvent!
    // The authClient.useSession() in your Navbar will detect the change automatically.
    router.push("/"); 
  }
  setLoading(false);
};
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-md space-y-6 p-8 rounded-2xl border border-divider bg-muted/20 backdrop-blur-md shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Log in to manage your pets</p>
        </div>

        {error && (
          <div className="p-3 text-sm rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-divider bg-background focus:outline-none focus:border-primary transition-colors text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-divider bg-background focus:outline-none focus:border-primary transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 inline-flex items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Dont have an account yet?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
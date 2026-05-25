"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    if (authError) {
      toast.error(authError.message || "Login failed.");
      setError(authError.message);
      setLoading(false);
    } else {
      toast.success("Welcome back!");
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 bg-background overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-secondary/20 rounded-full blur-[128px]" />

      <div className="relative w-full max-w-md space-y-8 p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Log in to manage your pets</p>
        </div>

        {error && (
          <div className="p-3 text-sm rounded-lg bg-danger/10 border border-danger/20 text-danger text-center animate-in fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase mb-1 text-muted-foreground">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1 text-muted-foreground">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full h-11 font-bold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            {loading ? "Logging In..." : "Log In"}
          </Button>

          <div className="relative flex items-center justify-center text-xs text-muted-foreground uppercase before:border-t before:flex-1 before:mr-3 after:border-t after:flex-1 after:ml-3">
            Or
          </div>

          <Button
            variant="bordered"
            className="w-full h-11 rounded-xl flex items-center justify-center gap-2 border-divider hover:bg-muted/50"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={20} /> Sign in with Google
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Do not have an account yet?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
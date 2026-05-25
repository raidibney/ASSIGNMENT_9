"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc"; 

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
    });

    if (authError) {
      const errorMessage = authError.message || "An error occurred during sign up.";
      toast.error(errorMessage);
      setError(errorMessage);
      setLoading(false);
    } else {
      toast.success("Account created successfully!");
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google" 
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 bg-background overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-secondary/20 rounded-full blur-[128px]" />

      <div className="relative w-full max-w-md space-y-8 p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Create an Account</h1>
          <p className="text-sm text-muted-foreground">Join PawsomeAdopt today</p>
        </div>

        {error && (
          <div className="p-3 text-sm rounded-lg bg-danger/10 border border-danger/20 text-danger text-center animate-in fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase mb-1 text-muted-foreground">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1 text-muted-foreground">Profile Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

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

          <div>
            <label className="block text-xs font-semibold uppercase mb-1 text-muted-foreground">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full h-11 font-bold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <div className="relative flex items-center justify-center text-xs text-muted-foreground uppercase before:border-t before:flex-1 before:mr-3 after:border-t after:flex-1 after:ml-3">
            Or
          </div>

          <Button 
            variant="bordered" 
            className="w-full h-11 rounded-xl flex items-center justify-center gap-2 border-divider hover:bg-muted/50"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={20} /> Sign up with Google
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
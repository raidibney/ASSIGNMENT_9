"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSignUp = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  // Call the signup method
  const { data, error: authError } = await authClient.signUp.email({
    email,
    password,
    name,
    // Note: callbackURL is handled automatically by authClient
  });

  if (authError) {
    // If there is an error, show it to the user
    setError(authError.message || "An error occurred during sign up.");
    setLoading(false);
  } else {
    // On success, simply redirect the user to the home page.
    // The session state will update automatically in the Navbar.
    toast.success("Account created successfully!");
    router.push("/"); 
  }
};

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-md space-y-6 p-8 rounded-2xl border border-divider bg-muted/20 backdrop-blur-md shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Create an Account</h1>
          <p className="text-sm text-muted-foreground">Join PawsomeAdopt today</p>
        </div>

        {error && (
          <div className="p-3 text-sm rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-divider bg-background focus:outline-none focus:border-primary transition-colors text-sm"
              placeholder="John Doe"
            />
          </div>

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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
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
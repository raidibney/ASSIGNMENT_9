"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PawPrint, LogOut, LayoutDashboard, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Simulation of authentication state (Replace with your actual auth logic later)
  const isLoggedIn = true; 

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to style active links (TypeScript type syntax removed)
  const linkStyle = (path) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      pathname === path ? "text-primary font-semibold" : "text-muted-foreground"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo & Website Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
              <PawPrint className="h-6 w-6" />
              <span>PawsomeAdopt</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={linkStyle("/")}>Home</Link>
            <Link href="/all-pets" className={linkStyle("/all-pets")}>All Pets</Link>
            
            {/* Private Links */}
            {isLoggedIn && (
              <>
                <Link href="/my-requests" className={linkStyle("/my-requests")}>My Requests</Link>
                <Link href="/add-pet" className={linkStyle("/add-pet")}>Add Pet</Link>
              </>
            )}
          </div>

          {/* Auth Button / Profile Dropdown (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                {/* Profile Trigger Button */}
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-accent focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    <User className="h-5 w-5" />
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border bg-popover p-1 shadow-md opacity-0 scale-95 pointer-events-none group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-150">
                  <Link
  href="/dashboard"
  className="flex w-full items-center px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground"
>
  <LayoutDashboard className="mr-2 h-4 w-4" />
  Dashboard
</Link>
                  <button
                    onClick={() => console.log("Logging out...")}
                    className="flex w-full items-center px-3 py-2 text-sm rounded-sm text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b bg-background px-4 pt-2 pb-4 space-y-3 shadow-lg">
          <Link href="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent">Home</Link>
          <Link href="/all-pets" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent">All Pets</Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/my-requests" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent">My Requests</Link>
              <Link href="/add-pet" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent">Add Pet</Link>
              <hr className="my-2 border-muted" />
              <Link href="/dashboard" onClick={toggleMenu} className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-accent">
                <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
              </Link>
              <button
                onClick={() => { toggleMenu(); console.log("Logging out..."); }}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-5 w-5" /> Logout
              </button>
            </>
          ) : (
            <div className="pt-2">
              <Link
                href="/login"
                onClick={toggleMenu}
                className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground shadow"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
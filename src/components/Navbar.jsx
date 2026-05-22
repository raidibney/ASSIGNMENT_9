"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PawPrint, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("See you again!");
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Pets", path: "/all-pets" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight transition-transform hover:scale-[1.02]">
            <div className="bg-primary/10 p-2 rounded-xl">
              <PawPrint className="h-6 w-6 text-primary" />
            </div>
            <span>Pawsome<span className="text-primary">Adopt</span></span>
          </Link>

          {/* Desktop Centered Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${pathname === link.path ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.name}
                {pathname === link.path && <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            {!isPending && (
              isLoggedIn ? (
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 bg-muted/40 hover:bg-muted/70 px-4 py-2 rounded-full transition-all border border-border/50">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium max-w-[80px] truncate">{session?.user?.name?.split(' ')[0] || "User"}</span>
                    <ChevronDown className={`h-3 w-3 opacity-50 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg text-sm" onClick={() => setProfileOpen(false)}>
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-destructive/10 rounded-lg text-sm text-destructive">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-sm font-medium hover:text-primary">Login</Link>
                  <Link href="/signup" className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90">Sign Up</Link>
                </div>
              )
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button className="md:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className="block px-4 py-2 font-medium hover:bg-muted rounded-lg" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <hr className="border-border" />
            {!isPending && (
              isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="px-4 py-2 font-medium hover:bg-muted rounded-lg" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <button onClick={handleLogout} className="text-left px-4 py-2 text-destructive font-medium hover:bg-destructive/10 rounded-lg">Logout</button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" className="px-4 py-2 text-center font-medium border rounded-lg">Login</Link>
                  <Link href="/signup" className="px-4 py-2 text-center font-medium bg-primary text-primary-foreground rounded-lg">Sign Up</Link>
                </div>
              )
            )}
            <div className="px-4 mt-2">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
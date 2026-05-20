"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PawPrint, LogOut, LayoutDashboard, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isLoggedIn = true; 

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Pets", path: "/all-pets" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-divider bg-background/70 backdrop-blur-md text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand/Logo Area */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-foreground font-bold text-lg tracking-tight group">
              <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground duration-300">
                <PawPrint className="h-5 w-5" />
              </div>
              <span className="font-extrabold tracking-tight">
                Pawsome<span className="text-primary font-medium">Adopt</span>
              </span>
            </Link>
          </div>

          {/* Ultra-Clean Sliding Hover Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-1 relative h-full">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Sliding Background Hover Highlight */}
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="navHoverBg"
                      className="absolute inset-0 bg-muted/60 dark:bg-zinc-800/50 rounded-lg -z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Sliding Active Line Tracker */}
                  {isActive && (
                    <motion.span
                      layoutId="activeLine"
                      className="absolute bottom-[-18px] left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Tools Cluster */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="p-1 rounded-lg bg-muted/40 border border-divider/50">
              <ThemeSwitcher />
            </div>

            {isLoggedIn ? (
              <div className="relative group py-2">
                <button className="flex items-center focus:outline-none">
                  <div className="h-9 w-9 rounded-xl bg-muted/60 border border-divider flex items-center justify-center text-foreground hover:border-primary/50 transition-all duration-300">
                    <User className="h-4 w-4" />
                  </div>
                </button>

                {/* Micro-Animated Minimalist Dropdown Panel */}
                <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-divider bg-background p-1.5 shadow-xl opacity-0 scale-95 pointer-events-none group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 text-foreground">
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors group/item"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                    Dashboard
                  </Link>
                  <div className="my-1 border-t border-divider" />
                  <button
                    onClick={() => console.log("Logging out...")}
                    className="flex w-full items-center px-3 py-2 text-sm rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Collapse Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-muted focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dynamic Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-divider bg-background/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-1 shadow-lg text-foreground overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                href={link.path} 
                onClick={toggleMenu} 
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.path ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <>
                <Link href="/my-requests" onClick={toggleMenu} className="block px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-all">My Requests</Link>
                <Link href="/add-pet" onClick={toggleMenu} className="block px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-all">Add Pet</Link>
                <hr className="my-2 border-divider" />
                <Link href="/dashboard" onClick={toggleMenu} className="flex items-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-all">
                  <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" /> Dashboard
                </Link>
                <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-muted/50 my-1">
                  <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                  <ThemeSwitcher />
                </div>
                <button
                  onClick={() => { toggleMenu(); console.log("Logging out..."); }}
                  className="flex w-full items-center px-4 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                  <ThemeSwitcher />
                </div>
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
                >
                  Login
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
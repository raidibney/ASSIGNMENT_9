"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClipboardList, PlusCircle, FolderHeart, User } from "lucide-react";

export default function DashboardLayout({ children }) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "my-requests"; // Default view

  const sidebarLinks = [
    {
      name: "My Requests",
      href: "/dashboard?tab=my-requests",
      id: "my-requests",
      icon: ClipboardList,
    },
    {
      name: "Add Pet",
      href: "/dashboard?tab=add-pet",
      id: "add-pet",
      icon: PlusCircle,
    },
    {
      name: "My Listings",
      href: "/dashboard?tab=my-listings",
      id: "my-listings",
      icon: FolderHeart,
    },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-background p-4 space-y-6">
        <div className="flex items-center space-x-2 px-2 py-4 border-b">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            <User className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">User Dashboard</h2>
            <p className="text-xs text-muted-foreground">Manage your pets</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Container */}
      <main className="flex-1 p-6 md:p-8">
        {/* Mobile Navigation Row */}
        <div className="flex md:hidden border-b bg-background p-2 mb-6 -mx-6 -mt-6 items-center justify-around text-xs">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-md transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
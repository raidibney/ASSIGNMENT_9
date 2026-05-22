import Link from "next/link";
import { LayoutDashboard, PlusCircle, Heart, List } from "lucide-react";

export default function DashboardLayout({ children }) {
  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Add Pet", path: "/dashboard/add-pet", icon: PlusCircle },
    { name: "My Listings", path: "/dashboard/my-listings", icon: List },
    { name: "My Requests", path: "/dashboard/my-requests", icon: Heart },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - Fixed width */}
      <aside className="w-64 border-r border-divider p-6 hidden md:block">
        <div className="mb-8">
          <h2 className="text-xl font-bold tracking-tight">PetNest</h2>
        </div>
        
        <nav className="space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
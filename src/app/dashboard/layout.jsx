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
          
          {/* Mobile Dashboard Menu Tabs (Only visible on small devices) */}
          <div className="md:hidden flex items-center space-x-2 overflow-x-auto pb-4 mb-6 border-b border-divider">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-background border border-divider hover:bg-muted transition-colors text-xs font-medium whitespace-nowrap"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
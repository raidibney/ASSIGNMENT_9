"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { PawPrint, Heart, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const [stats, setStats] = useState({
    listings: 0,
    requests: 0,
    adoptions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Wait for auth check to finish
    if (isPending) return;

    // 2. Define the async function inside the effect
    const fetchDashboardData = async () => {
      // 3. Move the logic inside to avoid top-level state updates
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

        // Fetch both sets of data
        const [listingsRes, requestsRes] = await Promise.all([
          fetch(`${baseUrl}/my-pets/${session.user.email}`),
          fetch(`${baseUrl}/adoption-requests?email=${session.user.email}`)
        ]);

        const listingsData = await listingsRes.json();
        const requestsData = await requestsRes.json();

        // Calculate stats
       setStats({
  listings: listingsData.length || 0,

  requests:
    requestsData.filter(
      (req) => req.status?.toLowerCase() === "pending"
    ).length || 0,

  adoptions:
    requestsData.filter(
      (req) => req.status?.toLowerCase() === "accepted"
    ).length || 0,
});
      } catch (err) {
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session, isPending]);

  if (isPending || loading) return <div className="p-20 text-center">Loading dashboard...</div>;

  const statItems = [
    { name: "Active Listings", value: stats.listings, icon: PawPrint, color: "text-blue-500" },
    { name: "Pending Requests", value: stats.requests, icon: Clock, color: "text-yellow-500" },
    { name: "Total Adoptions", value: stats.adoptions, icon: Heart, color: "text-red-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statItems.map((stat) => (
          <div key={stat.name} className="p-6 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground text-sm font-medium">{stat.name}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="border rounded-xl bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
        <p className="text-muted-foreground text-sm">
          Welcome back, {session?.user?.name || "User"}! You currently have {stats.listings} active listings 
          and {stats.requests} pending adoption requests.
        </p>
      </div>
    </div>
  );
}
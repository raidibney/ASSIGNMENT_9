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
    if (isPending) return;

    const fetchDashboardData = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

        const [listingsRes, requestsRes] = await Promise.all([
          fetch(`${baseUrl}/my-pets/${session.user.email}`),
          fetch(`${baseUrl}/adoption-requests?email=${session.user.email}`)
        ]);

        const listingsData = await listingsRes.json();
        const requestsData = await requestsRes.json();

        setStats({
          listings: listingsData.length || 0,
          requests: requestsData.filter((req) => req.status?.toLowerCase() === "pending").length || 0,
          adoptions: requestsData.filter((req) => req.status?.toLowerCase() === "accepted").length || 0,
        });
      } catch (err) {
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session, isPending]);

  if (isPending || loading) return <div className="flex min-h-screen items-center justify-center">Loading your dashboard...</div>;

  const statItems = [
    { name: "Active Listings", value: stats.listings, icon: PawPrint, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Pending Requests", value: stats.requests, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Total Adoptions", value: stats.adoptions, icon: Heart, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div className="relative min-h-screen p-6 md:p-10 bg-background overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session?.user?.name || "User"}!</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statItems.map((stat) => (
          <div key={stat.name} className="relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">{stat.name}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-4xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-3">Account Summary</h2>
        <p className="text-muted-foreground leading-relaxed">
          You currently have <strong>{stats.listings} active listings</strong> 
          {" "}and <strong>{stats.requests} pending adoption requests</strong>. 
          Stay on top of your pet adoptions through your personalized dashboard.
        </p>
      </div>
    </div>
  );
}
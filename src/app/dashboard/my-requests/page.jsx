"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const fetchRequests = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests?email=${session.user.email}`);
        
        if (!res.ok) throw new Error("Failed to fetch requests");
        
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        toast.error("Error loading your requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session, isPending]);

  if (isPending || loading) return <div className="p-20 text-center">Loading your requests...</div>;

  if (!session?.user?.email) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-semibold">Please sign in to view your requests.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">My Adoption Requests</h1>
        <p className="text-muted-foreground mt-1">Track the status of your adoption applications.</p>
      </header>

      {requests.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-3xl bg-white/5">
          <p className="text-muted-foreground">You have not requested to adopt any pets yet.</p>
        </div>
      ) : (
        <div className="border border-white/10 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-5 font-bold uppercase text-xs text-muted-foreground">Pet Name</th>
                <th className="p-5 font-bold uppercase text-xs text-muted-foreground">Date Requested</th>
                <th className="p-5 font-bold uppercase text-xs text-muted-foreground">Pickup Date</th>
                <th className="p-5 font-bold uppercase text-xs text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-bold text-foreground">{req.petName}</td>
                  <td className="p-5 text-muted-foreground">
                    {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-5 font-medium text-foreground">
                    {req.pickupDate || 'Not set'}
                  </td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                      req.status?.toLowerCase() === 'accepted' 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
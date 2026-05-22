"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // 1. Wait for auth session to be ready
    if (isPending) return;

    // 2. Define the data fetching logic inside the effect
    const fetchRequests = async () => {
      // If no user is logged in, we set loading to false and stop
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/adoption-requests?email=${session.user.email}`);
        
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

  // Loading state
  if (isPending || loading) return <div className="p-20 text-center">Loading your requests...</div>;

  // Unauthenticated state
  if (!session?.user?.email) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-semibold">Please sign in to view your requests.</h2>
      </div>
    );
  }

  // Render the table
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Adoption Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">You havent requested to adopt any pets yet.</p>
      ) : (
        <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="p-4 font-semibold">Pet Name</th>
                <th className="p-4 font-semibold">Date Requested</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-muted/30">
                  <td className="p-4 font-medium">{req.petName}</td>
                  <td className="p-4 text-gray-600">
                    {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      req.status === 'Accepted' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
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
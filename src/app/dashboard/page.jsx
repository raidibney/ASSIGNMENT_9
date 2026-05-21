"use client";

export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import AddPetsPage from "../add-pets/page"; 

function MyRequestsView() {
  const { data: session, isPending } = authClient.useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchMyRequests = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests?email=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          setRequests(data);
        }
      } catch (err) {
        console.error("Error loading requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, [session]);

  if (isPending || loading) {
    return <div className="p-6 text-sm text-muted-foreground text-center">Loading adoption requests...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Adoption Requests</h1>
        <p className="text-sm text-muted-foreground">Track the status updates on your submitted pet adoption requests.</p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground bg-background">
          No adoption applications submitted yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-background">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b bg-muted/50 text-muted-foreground font-medium">
                <th className="p-4">Pet Image</th>
                <th className="p-4">Pet Name</th>
                <th className="p-4">Breed</th>
                <th className="p-4">Adoption Fee</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <img 
                      src={request.imageUrl} 
                      alt={request.petName} 
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="p-4 font-semibold text-foreground capitalize">{request.petName}</td>
                  <td className="p-4 text-muted-foreground capitalize">{request.breed}</td>
                  <td className="p-4 text-foreground font-medium">{request.adoptionFee} BDT</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      request.status === "Approved" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                      request.status === "Rejected" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {request.status}
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

function AddPetView() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">Add a Pet for Adoption</h1>
      <p className="text-sm text-muted-foreground">Fill out the form details below to list a new pet on the marketplace.</p>
      <div className="rounded-lg border p-6 bg-background">
        <AddPetsPage />
      </div>
    </div>
  );
}

function MyListingsView() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">My Pet Listings</h1>
      <p className="text-sm text-muted-foreground">Manage and edit the active pet profiles you have listed.</p>
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground bg-background">
        You havent listed any pets for adoption yet.
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "my-requests";

  switch (currentTab) {
    case "my-requests":
      return <MyRequestsView />;
    case "add-pet":
      return <AddPetView />;
    case "my-listings":
      return <MyListingsView />;
    default:
      return <MyRequestsView />;
  }
}
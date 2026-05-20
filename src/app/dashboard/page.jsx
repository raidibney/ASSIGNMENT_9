// src/app/dashboard/page.jsx
"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
// 1. Import your existing add pet page component
import AddPetsPage from "../add-pets/page"; 

function MyRequestsView() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">My Adoption Requests</h1>
      <p className="text-sm text-muted-foreground">Track the updates on your submitted pet adoption requests.</p>
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground bg-background">
        No adoption applications submitted yet.
      </div>
    </div>
  );
}

// 2. Render it inside the view instead of the placeholder
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
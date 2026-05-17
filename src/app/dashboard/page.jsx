"use client";

import { useSearchParams } from "next/navigation";

// Sub-components representing your layout requirements
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

function AddPetView() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">Add a Pet for Adoption</h1>
      <p className="text-sm text-muted-foreground">Fill out the form details below to list a new pet on the marketplace.</p>
      <div className="rounded-lg border p-6 bg-background">
        {/* You can drop your form inputs right here */}
        <p className="text-sm text-muted-foreground">Pet profile form placeholder.</p>
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
  const currentTab = searchParams.get("tab") || "my-requests"; // Default tab matching layout fallback

  // Dynamically switch sections based on active URL tab param
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
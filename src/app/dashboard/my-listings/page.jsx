"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyListingsPage() {
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // 1. Wait for the authentication check to complete
    if (isPending) return;

    // 2. Define the async function inside the effect
    const fetchMyPets = async () => {
      // If no user is logged in, stop loading and exit
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/my-pets/${session.user.email}`);
        
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        setMyPets(data);
      } catch (err) {
        toast.error("Error loading your listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPets();
  }, [session, isPending]);

  // Show loading indicator while session is checking or data is fetching
  if (isPending || loading) return <div className="p-20 text-center">Loading your pets...</div>;

  // If user isn't logged in, show a message
  if (!session?.user?.email) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-semibold">Please sign in to view your listings.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>
      
      {myPets.length === 0 ? (
        <p className="text-gray-500">You havent listed any pets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
          {myPets.map((pet) => (
            <div key={pet._id} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={pet.imageUrl} 
                alt={pet.petName} 
                className="h-40 w-full object-cover rounded-lg mb-4" 
              />
              <h3 className="font-bold text-lg">{pet.petName}</h3>
              <p className="text-sm text-gray-600">Breed: {pet.breed}</p>
              <p className="text-sm text-gray-600">Location: {pet.location}</p>
              <div className="mt-3">
                 <span className="text-xs bg-gray-100 px-2 py-1 rounded">{pet.species}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
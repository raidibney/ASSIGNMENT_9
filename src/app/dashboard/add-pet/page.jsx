"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // 1. ADDED IMPORT

export default function AddPetPage() {
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession(); // 2. ADDED HOOK

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 3. ADDED AUTH CHECK
    if (!session?.user?.email) {
      toast.error("You must be logged in to add a pet.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    const petData = Object.fromEntries(formData.entries());
    
    // 4. ADDED OWNER EMAIL TO THE DATA
    petData.ownerEmail = session.user.email;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/add-pets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        toast.success("Pet listing created successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add pet");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... rest of your existing JSX code remains exactly the same
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add a Pet Listing</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-card border p-6 rounded-xl shadow-sm">
        {/* ... rest of your form fields ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Pet Name *</label>
            <input name="petName" required className="w-full p-2.5 rounded-lg border bg-background" placeholder="e.g. mr Charly" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Species *</label>
            <select name="species" className="w-full p-2.5 rounded-lg border bg-background">
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Breed</label>
            <input name="breed" className="w-full p-2.5 rounded-lg border bg-background" placeholder="e.g. Golden Retriever" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Age (years)</label>
            <input name="age" type="number" className="w-full p-2.5 rounded-lg border bg-background" placeholder="2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select name="gender" className="w-full p-2.5 rounded-lg border bg-background">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Vaccination Status</label>
            <select name="vaccinationStatus" className="w-full p-2.5 rounded-lg border bg-background">
              <option value="Fully Vaccinated">Fully Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Health Status</label>
            <select name="healthStatus" className="w-full p-2.5 rounded-lg border bg-background">
              <option value="Healthy">Healthy</option>
              <option value="Needs Attention">Needs Attention</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input name="location" className="w-full p-2.5 rounded-lg border bg-background" placeholder="Dhaka" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Pet Image URL *</label>
          <input name="imageUrl" required className="w-full p-2.5 rounded-lg border bg-background" placeholder="https://..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Adoption Fee ($)</label>
          <input name="adoptionFee" type="number" className="w-full p-2.5 rounded-lg border bg-background" placeholder="25000" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea name="description" required rows={4} className="w-full p-2.5 rounded-lg border bg-background" placeholder="Describe the pet..." />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
}
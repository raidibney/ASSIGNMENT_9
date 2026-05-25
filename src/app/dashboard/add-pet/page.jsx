"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; 
import { Button } from "@heroui/react";

export default function AddPetPage() {
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!session?.user?.email) {
      toast.error("You must be logged in to add a pet.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    const petData = Object.fromEntries(formData.entries());
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
    <div className="relative min-h-screen p-6 md:p-10 bg-background overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight">Add a Pet Listing</h1>
          <p className="text-muted-foreground mt-2">Find a forever home for a friend in need.</p>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Pet Name *</label>
              <input name="petName" required className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all" placeholder="e.g. Mr. Charly" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Species *</label>
              <select name="species" className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all">
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Breed</label>
              <input name="breed" className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all" placeholder="e.g. Golden Retriever" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Age (years)</label>
              <input name="age" type="number" className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all" placeholder="2" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Gender</label>
              <select name="gender" className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Vaccination Status</label>
              <select name="vaccinationStatus" className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all">
                <option value="Fully Vaccinated">Fully Vaccinated</option>
                <option value="Partially Vaccinated">Partially Vaccinated</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Health Status</label>
              <select name="healthStatus" className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all">
                <option value="Healthy">Healthy</option>
                <option value="Needs Attention">Needs Attention</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Location</label>
              <input name="location" className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all" placeholder="Dhaka" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Pet Image URL *</label>
            <input name="imageUrl" required className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all" placeholder="https://..." />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Adoption Fee ($)</label>
            <input name="adoptionFee" type="number" className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all" placeholder="25000" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">Description *</label>
            <textarea name="description" required rows={4} className="w-full p-3 rounded-xl border bg-background/50 focus:border-primary outline-none transition-all" placeholder="Describe the pet..." />
          </div>

         <Button 
  type="submit" 
  isLoading={loading}
  color="primary"
  size="lg"
  className="w-full font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all"
>
  {loading ? "Adding Listing..." : "Add Pet Listing"}
</Button>
        </form>
      </div>
    </div>
  );
}
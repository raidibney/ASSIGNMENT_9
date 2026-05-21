"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("all");
    const [loading, setLoading] = useState(true);

  
   // Inside your AllPets component
useEffect(() => {
    const fetchPets = async () => {
        try {
            // Updated endpoint to match backend
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet`);
            
            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const data = await res.json();
            setPets(data);
        } catch (error) {
            console.error("Failed to fetch pets:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchPets();
}, []);

   
    const uniqueSpecies = ["all", ...new Set(pets.map((pet) => pet.species?.toLowerCase()).filter(Boolean))];

   
    const filteredPets = pets.filter((pet) => {
        const matchesSearch = 
            pet.petName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
            pet.breed?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesSpecies = 
            selectedSpecies === "all" || 
            pet.species?.toLowerCase() === selectedSpecies.toLowerCase();

        return matchesSearch && matchesSpecies;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-lg text-muted-foreground animate-pulse">Loading available pets...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-extrabold text-foreground mb-8 text-center sm:text-left">
                All Pets Available for Adoption
            </h1>

         
            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-card p-4 rounded-xl border">
                {/* Search Input */}
                <div className="flex-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Search Pets
                    </label>
                    <input
                        type="text"
                        placeholder="Search by name or breed..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                
                {/* Species Dropdown Filter */}
                <div className="w-full sm:w-64">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Filter by Species
                    </label>
                    <select
                        value={selectedSpecies}
                        onChange={(e) => setSelectedSpecies(e.target.value)}
                        className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 capitalize"
                    >
                        {uniqueSpecies.map((species) => (
                            <option key={species} value={species}>
                                {species === "all" ? "All Species" : species}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

           
            {filteredPets.length === 0 && (
                <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed mb-8">
                    <p className="text-muted-foreground text-base">No matching pets found. Try changing your search query or filters.</p>
                </div>
            )}

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                    <div 
                        key={pet._id} 
                        className="flex flex-col bg-card text-card-foreground border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Pet Image */}
                        <div className="relative h-48 w-full bg-muted">
                            <img
                                src={pet.imageUrl}
                                alt={pet.petName}
                                className="w-full h-full object-cover"
                            />
                            {/* Adoption Fee Badge */}
                            <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full shadow">
                                ৳ {Number(pet.adoptionFee).toLocaleString()}
                            </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-2xl font-bold capitalize truncate">
                                        {pet.petName?.trim()}
                                    </h2>
                                    <span className="text-xs bg-muted text-muted-foreground font-medium px-2.5 py-1 rounded">
                                        {pet.gender}
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-muted-foreground capitalize mb-3">
                                    {pet.breed} • {pet.age} Years Old
                                </p>

                                {/* Status Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                        pet.vaccinationStatus === "Fully Vaccinated" 
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    }`}>
                                        {pet.vaccinationStatus}
                                    </span>
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                        pet.healthStatus === "Healthy" 
                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" 
                                            : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
                                    }`}>
                                        {pet.healthStatus}
                                    </span>
                                </div>

                                <p className="text-sm text-foreground/80 line-clamp-3 italic mb-4">
                                    {"\""}{pet.description?.trim()}{"\""}
                                </p>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="border-t pt-4 mt-auto flex flex-col gap-3">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        <span>{pet.location}</span>
                                    </div>
                                    <span className="font-semibold text-primary uppercase text-[11px] tracking-wider">
                                        {pet.species}
                                    </span>
                                </div>

                                <Link href={`/all-pets/${pet._id}`}>
                                    <Button 
                                        color="primary" 
                                        variant="flat" 
                                        className="w-full font-semibold text-sm rounded-lg"
                                    >
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPets;
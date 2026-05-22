"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pets`);
                if (!res.ok) throw new Error(`Server status: ${res.status}`);
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
            selectedSpecies === "all" || pet.species?.toLowerCase() === selectedSpecies.toLowerCase();
        return matchesSearch && matchesSpecies;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-lg text-default-500 animate-pulse">Loading available pets...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-black text-foreground mb-10">All Pets Available for Adoption</h1>

            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 bg-content1 p-6 rounded-3xl border border-default-200">
                <div className="flex-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-default-500 mb-2">Search Pets</label>
                    <input
                        type="text"
                        placeholder="Search by name or breed..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-default-100 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="w-full sm:w-64">
                    <label className="block text-xs font-bold uppercase tracking-widest text-default-500 mb-2">Filter by Species</label>
                    <select
                        value={selectedSpecies}
                        onChange={(e) => setSelectedSpecies(e.target.value)}
                        className="w-full px-4 py-3 bg-default-100 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary capitalize"
                    >
                        {uniqueSpecies.map((species) => (
                            <option key={species} value={species}>{species === "all" ? "All Species" : species}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredPets.length === 0 && (
                <div className="text-center py-20 bg-default-100 rounded-3xl border-2 border-dashed">
                    <p className="text-xl text-default-500">No matching pets found. Try adjusting your search.</p>
                </div>
            )}

            {/* Premium Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPets.map((pet) => (
                    <div 
                        key={pet._id} 
                        className="group relative bg-content1 rounded-3xl border border-default-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Image Container */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={pet.imageUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600"}
                                alt={pet.petName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full font-bold shadow-lg">
                                ৳ {Number(pet.adoptionFee || 0).toLocaleString()}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold capitalize">{pet.petName}</h3>
                                    <p className="text-default-500 font-medium">{pet.breed || "Mixed Breed"}</p>
                                </div>
                                <span className="bg-default-100 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                    {pet.gender}
                                </span>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <span className="text-xs bg-success-50 text-success-700 px-3 py-1 rounded-lg font-semibold">
                                    {pet.healthStatus || "Healthy"}
                                </span>
                                <span className="text-xs bg-warning-50 text-warning-700 px-3 py-1 rounded-lg font-semibold">
                                    {pet.age} Years Old
                                </span>
                            </div>
                            
                            <p className="text-sm text-default-600 italic mb-6 line-clamp-2">
                                {pet.description || "Looking for a loving home."}
                            </p>

                            <Link href={`/all-pets/${pet._id}`}>
                                <Button fullWidth color="primary" variant="ghost" className="font-bold">
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPets;
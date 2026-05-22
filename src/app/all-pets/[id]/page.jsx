"use client";

import { useState, useEffect, use } from "react";
import { authClient } from "@/lib/auth-client";
import PetdetailsModal from "@/components/PetdetailsModal";
import DeleteAlert from "@/components/DeleteAlert"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Detailspage = ({ params }) => {
    const resolvedParams = use(params);
    const id = resolvedParams?.id;
    const router = useRouter();

    const [petDetails, setPetDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); 
    const [submittingRequest, setSubmittingRequest] = useState(false);

    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (!id || id === "undefined" || !process.env.NEXT_PUBLIC_SERVER_URL) return;

        const fetchPetDetails = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pets/${id}`, { cache: "no-store" });
                if (!res.ok) {
                    setError(`Error: ${res.status}`);
                    return;
                }
                const data = await res.json();
                setPetDetails(data);
            } catch (err) {
                setError("Failed to connect to server.");
            } finally {
                setLoading(false);
            }
        };
        fetchPetDetails();
    }, [id]);

    const handleAdoptPet = async () => {
        if (!session?.user) {
            toast.error("Please login first to adopt this pet.");
            router.push("/login");
            return;
        }

        // --- NECESSARY ADDITION: Check if user is the owner ---
        if (petDetails.ownerEmail === session.user.email) {
            toast.error("You cannot adopt a pet you listed yourself.");
            return;
        }

        setSubmittingRequest(true);
        const requestPayload = {
            petId: petDetails._id || petDetails.id,
            petName: petDetails.petName,
            imageUrl: petDetails.imageUrl,
            breed: petDetails.breed,
            adoptionFee: petDetails.adoptionFee,
            userEmail: session.user.email,
            userName: session.user.name,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestPayload),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to submit.");
                return;
            }
            toast.success(`Application for ${petDetails.petName} submitted!`);
            router.push("/dashboard?tab=my-requests");
        } catch (err) {
            toast.error("Network error occurred.");
        } finally {
            setSubmittingRequest(false);
        }
    };

    const handlePetDetailsUpdate = (updatedData) => {
        setPetDetails((prev) => ({ ...prev, ...updatedData }));
    };

    if (loading) return <div className="p-20 text-center text-default-500">Loading precious details...</div>;
    if (error || !petDetails) return <div className="p-20 text-center text-danger">Error: {error || "Pet not found"}</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="bg-content1 rounded-3xl border border-default-200 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative min-h-[400px]">
                    <img 
                        src={petDetails.imageUrl} 
                        alt={petDetails.petName} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-4xl font-black text-foreground capitalize">{petDetails.petName}</h1>
                            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                                {petDetails.species}
                            </span>
                        </div>
                        
                        <p className="text-default-600 italic mb-8 leading-relaxed">
                            &quot;{petDetails.description}&quot;
                        </p>

                        <div className="grid grid-cols-2 gap-6 text-sm">
                            {[
                                { label: "Breed", value: petDetails.breed },
                                { label: "Age", value: `${petDetails.age} Years` },
                                { label: "Gender", value: petDetails.gender },
                                { label: "Location", value: petDetails.location },
                                { label: "Health", value: petDetails.healthStatus },
                                { label: "Vaccinated", value: petDetails.vaccinationStatus },
                            ].map((item, i) => (
                                <div key={i}>
                                    <p className="text-default-400 font-bold uppercase text-[10px] tracking-widest">{item.label}</p>
                                    <p className="font-semibold text-foreground">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-default-200">
                        <div className="flex items-center justify-between mb-6 bg-default-100 p-4 rounded-2xl">
                            <span className="font-bold text-default-600">Adoption Fee</span>
                            <span className="text-2xl font-black text-primary">৳ {Number(petDetails.adoptionFee).toLocaleString()}</span>
                        </div>

                        <div className="flex flex-col gap-3">
                            {/* Green Adopt Button */}
                            <button 
                                onClick={handleAdoptPet}
                                disabled={submittingRequest}
                                className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition-all disabled:bg-gray-400"
                            >
                                {submittingRequest ? "Processing..." : "Adopt This Pet Now"}
                            </button>
                            
                            <div className="flex gap-3">
                                {/* Blue Edit Button */}
                                <button 
                                    onClick={() => setIsModalOpen(true)} 
                                    className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-2xl hover:bg-blue-700 transition-all"
                                >
                                    Edit Details
                                </button>
                                {/* Red Delete Button */}
                                <button 
                                    onClick={() => setIsDeleteOpen(true)} 
                                    className="flex-1 bg-red-600 text-white font-bold py-3 rounded-2xl hover:bg-red-700 transition-all"
                                >
                                    Delete Pet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <PetdetailsModal 
                    petData={petDetails} 
                    petId={petDetails._id || petDetails.id}
                    onClose={() => setIsModalOpen(false)} 
                    onUpdateSuccess={handlePetDetailsUpdate}
                />
            )}

            {isDeleteOpen && (
                <DeleteAlert 
                    petId={petDetails._id || petDetails.id} 
                    petName={petDetails.petName} 
                    onClose={() => setIsDeleteOpen(false)} 
                />
            )}
        </div>
    );
};

export default Detailspage;
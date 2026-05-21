"use client";

import { useState, useEffect, use } from "react";
import { authClient } from "@/lib/auth-client";
import PetdetailsModal from "@/components/PetdetailsModal";
import DeleteAlert from "@/components/DeleteAlert"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Detailspage = ({ params }) => {
    // Safely unwrap Next.js dynamic params promise hook structure
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
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet/${id}`, {
                    cache: "no-store"
                });

                if (!res.ok) {
                    setError(`The backend returned status code: ${res.status}`);
                    return;
                }

                const data = await res.json();
                setPetDetails(data);
            } catch (err) {
                setError("Failed to connect to backend server.");
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
                toast.error(data.message || "Failed to submit adoption application.");
                return;
            }

            toast.success(`Application for ${petDetails.petName} submitted successfully!`);
            router.push("/dashboard?tab=my-requests");
        } catch (err) {
            console.error(err);
            toast.error("Network communication failure with application endpoint.");
        } finally {
            setSubmittingRequest(false);
        }
    };

    const handlePetDetailsUpdate = (updatedData) => {
        setPetDetails((prev) => ({ ...prev, ...updatedData }));
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading pet details...</div>;
    if (error || !petDetails) {
        return (
            <div className="p-8 text-center text-red-500">
                <h1 className="text-xl font-bold">Failed to load pet details</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Pet Details</h1>
            
            <div className="border rounded-xl bg-card overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="w-full h-64 md:h-full min-h-[300px] relative rounded-lg overflow-hidden border">
                    <img src={petDetails.imageUrl} alt={petDetails.petName} className="w-full h-full object-cover"/>
                </div>

                <div className="flex flex-col justify-between space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-bold text-primary capitalize">{petDetails.petName}</h2>
                            <span className="badge badge-secondary px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                                {petDetails.species}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-4">{petDetails.description}</p>
                        <hr className="my-3 border-muted/30" />
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                            <p><strong>Breed:</strong> <span className="capitalize">{petDetails.breed}</span></p>
                            <p><strong>Age:</strong> {petDetails.age} Years</p>
                            <p><strong>Gender:</strong> {petDetails.gender}</p>
                            <p><strong>Location:</strong> {petDetails.location}</p>
                            <p><strong>Health Status:</strong> <span className="text-green-600 font-medium">{petDetails.healthStatus}</span></p>
                            <p><strong>Vaccination:</strong> {petDetails.vaccinationStatus}</p>
                        </div>
                        <hr className="my-4 border-muted/30" />
                        <div className="bg-muted/40 p-3 rounded-lg flex justify-between items-center bg-gray-50 border">
                            <span className="font-semibold text-gray-700">Adoption Fee:</span>
                            <span className="text-xl font-bold text-success text-green-600">{petDetails.adoptionFee} BDT</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-4 border-t border-muted/30">
                        <button 
                            onClick={handleAdoptPet}
                            disabled={submittingRequest}
                            className="flex-1 btn btn-success bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors"
                        >
                            {submittingRequest ? "Processing..." : "Adopt Pet"}
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="flex-1 btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors">
                            Edit Details
                        </button>
                        <button 
                            onClick={() => setIsDeleteOpen(true)} 
                            className="flex-1 btn btn-error bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors"
                        >
                            Delete Pet
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <PetdetailsModal 
                    petData={petDetails} 
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
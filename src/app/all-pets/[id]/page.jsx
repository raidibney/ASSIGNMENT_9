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

    const [pickupDate, setPickupDate] = useState("");
    const [message, setMessage] = useState("");

    const { data: session } = authClient.useSession();
    
    const isOwner = session?.user?.email && petDetails?.ownerEmail === session.user.email;

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

    const handleAdoptPet = async (e) => {
        e.preventDefault();
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
            pickupDate,
            message,
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

    if (loading) return <div className="p-20 text-center text-default-500">Loading...</div>;
    if (error || !petDetails) return <div className="p-20 text-center text-danger">Error loading pet details.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* Left Side: Pet Info */}
                <div className="bg-content1 rounded-3xl border border-default-200 overflow-hidden shadow-lg">
                    <img src={petDetails.imageUrl} alt={petDetails.petName} className="w-full h-96 object-cover" />
                    <div className="p-8">
                        <h1 className="text-4xl font-black capitalize mb-2 text-foreground">{petDetails.petName}</h1>
                        <p className="text-default-600 mb-6 italic">&quot;{petDetails.description}&quot;</p>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                            <div><p className="text-xs font-bold uppercase text-default-400">Breed</p><p className="font-semibold text-foreground">{petDetails.breed}</p></div>
                            <div><p className="text-xs font-bold uppercase text-default-400">Age</p><p className="font-semibold text-foreground">{petDetails.age} Years</p></div>
                            <div><p className="text-xs font-bold uppercase text-default-400">Gender</p><p className="font-semibold text-foreground">{petDetails.gender}</p></div>
                            <div><p className="text-xs font-bold uppercase text-default-400">Location</p><p className="font-semibold text-foreground">{petDetails.location}</p></div>
                            <div><p className="text-xs font-bold uppercase text-default-400">Health</p><p className="font-semibold text-foreground">{petDetails.healthStatus}</p></div>
                            <div><p className="text-xs font-bold uppercase text-default-400">Vaccinated</p><p className="font-semibold text-foreground">{petDetails.vaccinationStatus}</p></div>
                        </div>

                        {isOwner && (
                            <div className="flex gap-4 pt-6 border-t border-default-200">
                                <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">Edit Details</button>
                                <button onClick={() => setIsDeleteOpen(true)} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700">Delete Pet</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Conditional Content */}
                <div className="bg-content1 p-8 rounded-3xl border border-default-200 shadow-lg">
                    {isOwner ? (
                        <div className="text-center py-10">
                            <div className="text-amber-500 text-4xl mb-4">⚠️</div>
                            <h2 className="text-2xl font-bold mb-2 text-foreground">This is your pet</h2>
                            <p className="text-default-600 mb-6">You cannot adopt your own listing. Use the buttons on the left to manage or remove this profile.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-foreground">Request to Adopt {petDetails.petName}</h2>
                            <form onSubmit={handleAdoptPet} className="space-y-4">
                                <div><label className="text-xs font-bold uppercase text-default-400">Pet Name</label><input disabled value={petDetails.petName} className="w-full bg-default-100 p-3 rounded-lg border border-default-200 text-foreground" /></div>
                                <div><label className="text-xs font-bold uppercase text-default-400">Your Name</label><input disabled value={session?.user?.name || ""} className="w-full bg-default-100 p-3 rounded-lg border border-default-200 text-foreground" /></div>
                                <div><label className="text-xs font-bold uppercase text-default-400">Your Email</label><input disabled value={session?.user?.email || ""} className="w-full bg-default-100 p-3 rounded-lg border border-default-200 text-foreground" /></div>
                                <div><label className="text-xs font-bold uppercase text-default-400">Preferred Pickup Date</label><input type="date" required onChange={(e) => setPickupDate(e.target.value)} className="w-full p-3 rounded-lg border border-default-200 bg-transparent text-foreground" /></div>
                                <div><label className="text-xs font-bold uppercase text-default-400">Message to Owner</label><textarea required onChange={(e) => setMessage(e.target.value)} placeholder="Tell the owner why you'd be a great match..." className="w-full p-3 rounded-lg border border-default-200 bg-transparent text-foreground h-24" /></div>
                                <button type="submit" disabled={submittingRequest} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 disabled:opacity-50">
                                    {submittingRequest ? "Processing..." : "Adopt This Pet Now"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {isModalOpen && <PetdetailsModal petData={petDetails} petId={petDetails._id || petDetails.id} onClose={() => setIsModalOpen(false)} onUpdateSuccess={(d) => setPetDetails({...petDetails, ...d})} />}
            {isDeleteOpen && <DeleteAlert petId={petDetails._id || petDetails.id} petName={petDetails.petName} ownerEmail={petDetails.ownerEmail} onClose={() => setIsDeleteOpen(false)} />}
        </div>
    );
};

export default Detailspage;
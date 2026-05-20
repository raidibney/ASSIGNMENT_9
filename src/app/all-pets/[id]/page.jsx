import Link from "next/link";

const detailspage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/add-pet/${id}`, {
        cache: "no-store"
    });

    // 1. Guard check: If the server returns HTML or a 404/500 error, stop here!
    if (!res.ok) {
        return (
            <div className="p-8 text-center text-red-500">
                <h1 className="text-xl font-bold">Failed to load pet details</h1>
                <p>The backend returned status code: {res.status}</p>
            </div>
        );
    }

    // 2. Safe to parse now because we know the response status is 200 OK
    const petDetails = await res.json();    
    console.log(petDetails);

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Pet Details</h1>
            
            <div className="border rounded-xl bg-card overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Left Side: Image */}
                <div className="w-full h-64 md:h-full min-h-[300px] relative rounded-lg overflow-hidden border">
                    <img 
                        src={petDetails.imageUrl} 
                        alt={petDetails.petName} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side: Detailed Info */}
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

                    {/* Action Buttons */}
                    <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-4 border-t border-muted/30">
                        <button 
                            className="flex-1 btn btn-success bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors order-first sm:order-none"
                        >
                            Adopt Pet
                        </button>
                        <Link 
                            href={`/edit-pet/${id}`} 
                            className="flex-1 btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors"
                        >
                            Edit Details
                        </Link>
                        <button 
                            className="flex-1 btn btn-error bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors"
                        >
                            Delete Pet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default detailspage;
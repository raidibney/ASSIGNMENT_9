"use client";

const PetdetailsModal = ({ petData, onClose, onUpdateSuccess }) => {
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        
      
        const formData = new FormData(e.target);
        const updatedPet = {
            petName: formData.get("petName"),
            breed: formData.get("breed"),
            age: formData.get("age"),
            location: formData.get("location"),
            adoptionFee: formData.get("adoptionFee"),
            description: formData.get("description"),
        };

        try {
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet/${petData._id || petData.id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPet),
            });

            if (res.ok) {
                const updatedDataFromBackend = await res.json();
                
                
                onUpdateSuccess(updatedDataFromBackend); 
                onClose(); 
            } else {
                alert("Failed to update pet details on the server.");
            }
        } catch (error) {
            console.error("Error updating pet:", error);
            alert("Something went wrong while saving changes.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative border border-gray-100">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold">
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit {petData?.petName || "Pet"} Details</h2>
                <hr className="mb-4 border-gray-200" />

                <form onSubmit={handleUpdate} className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pet Name</label>
                        <input 
                            type="text" 
                            name="petName" 
                            defaultValue={petData?.petName} 
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Breed</label>
                            <input 
                                type="text" 
                                name="breed" 
                                defaultValue={petData?.breed} 
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age (Years)</label>
                            <input 
                                type="number" 
                                name="age" 
                                defaultValue={petData?.age} 
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input 
                            type="text" 
                            name="location" 
                            defaultValue={petData?.location} 
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adoption Fee (BDT)</label>
                        <input 
                            type="number" 
                            name="adoptionFee" 
                            defaultValue={petData?.adoptionFee} 
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea 
                            rows="3"
                            name="description" 
                            defaultValue={petData?.description} 
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white"
                        ></textarea>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PetdetailsModal;
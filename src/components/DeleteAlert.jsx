"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const DeleteAlert = ({ petId, petName, ownerEmail, onClose }) => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const handleDelete = async () => {
        if (session?.user?.email !== ownerEmail) {
            toast.error("Unauthorized: You are not the owner.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pets/${petId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Pet deleted successfully!");
                onClose();
                window.location.href = "/all-pets"; 
            } else {
                toast.error("Failed to delete pet from server.");
            }
        } catch (error) {
            console.error("Error deleting pet:", error);
            toast.error("Something went wrong while deleting.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 relative border border-gray-100 text-center animate-fadeIn">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete {petName}?</h3>
                <p className="text-sm text-gray-500 mb-6">Are you sure you want to remove this pet? This cannot be undone.</p>
                <div className="flex gap-3 justify-center">
                    <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium text-sm">Cancel</button>
                    <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm">Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAlert;
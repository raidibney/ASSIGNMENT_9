"use client";

import { authClient } from "@/lib/auth-client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteAlert = ({
  petId,
  petName,
  ownerEmail,
  onClose,
}) => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const handleDelete = async () => {
    if (session?.user?.email !== ownerEmail) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/add-pets/${petId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        toast.error("Failed to delete pet");
        return;
      }

      toast.success("Pet deleted successfully!");

      // TRUE = deleted
      onClose(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background border border-border rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 mb-5">
          <Trash2 className="h-8 w-8 text-red-500" />
        </div>

        <h3 className="text-2xl font-black text-center mb-3">
          Delete {petName}?
        </h3>

        <p className="text-center text-muted-foreground mb-8">
          This action cannot be undone.
        </p>

        <div className="flex gap-4">
          {/* CANCEL */}
          <button
            onClick={() => onClose(false)}
            className="flex-1 h-12 rounded-xl border border-border hover:bg-muted transition-all font-bold"
          >
            Cancel
          </button>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
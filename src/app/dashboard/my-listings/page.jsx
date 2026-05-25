"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  Eye,
  Pencil,
  Trash2,
  Users,
  MapPin,
  PawPrint,
  X,
  Check,
} from "lucide-react";
import Link from "next/link";
import PetdetailsModal from "@/components/PetdetailsModal";
import DeleteAlert from "@/components/DeleteAlert";

export default function MyListingsPage() {
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPet, setSelectedPet] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [requestsModal, setRequestsModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const fetchMyPets = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL ||
            "http://localhost:5000"
          }/my-pets/${session.user.email}`
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        setMyPets(data);
      } catch (err) {
        toast.error("Error loading your listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPets();
  }, [session, isPending]);

  // ===========================
  // OPEN REQUEST MODAL
  // ===========================
  const handleOpenRequests = async (pet) => {
    setSelectedPet(pet);
    setRequestsModal(true);

    try {
      setLoadingRequests(true);

      // FIXED API URL
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/pet/${pet._id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await res.json();

      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
      setRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  // ===========================
  // ACCEPT / REJECT REQUEST
  // ===========================
  const handleRequestAction = async (requestId, status) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        toast.error("Failed to update request");
        return;
      }

      toast.success(`Request ${status}`);

      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status } : req
        )
      );

      // UPDATE PET STATUS
      if (status === "accepted") {
        setMyPets((prev) =>
          prev.map((pet) =>
            pet._id === selectedPet._id
              ? { ...pet, adoptionStatus: "Adopted" }
              : pet
          )
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // ===========================
  // LOADING
  // ===========================
  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">
            Loading your listings...
          </p>
        </div>
      </div>
    );
  }

  // ===========================
  // NOT LOGGED IN
  // ===========================
  if (!session?.user?.email) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-background border border-border rounded-3xl p-10 text-center max-w-md">
          <h2 className="text-2xl font-black mb-3">
            Please Sign In
          </h2>

          <p className="text-muted-foreground">
            Login first to manage your pet listings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">
                My Listings
              </h1>

              <p className="text-muted-foreground mt-2">
                Manage your pets, requests and adoption status.
              </p>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-card border border-border rounded-2xl px-6 py-4 min-w-[150px]">
                <p className="text-sm text-muted-foreground">
                  Total Listings
                </p>
                <h3 className="text-3xl font-black text-pink-500">
                  {myPets.length}
                </h3>
              </div>

              <div className="bg-card border border-border rounded-2xl px-6 py-4 min-w-[150px]">
                <p className="text-sm text-muted-foreground">
                  Available
                </p>
                <h3 className="text-3xl font-black text-emerald-500">
                  {
                    myPets.filter(
                      (pet) => pet.adoptionStatus !== "Adopted"
                    ).length
                  }
                </h3>
              </div>

              <div className="bg-card border border-border rounded-2xl px-6 py-4 min-w-[150px]">
                <p className="text-sm text-muted-foreground">
                  Adopted
                </p>
                <h3 className="text-3xl font-black text-red-500">
                  {
                    myPets.filter(
                      (pet) => pet.adoptionStatus === "Adopted"
                    ).length
                  }
                </h3>
              </div>
            </div>
          </div>

          {/* EMPTY */}
          {myPets.length === 0 ? (
            <div className="bg-card border border-border rounded-3xl p-16 text-center">
              <h3 className="text-2xl font-black mb-3">
                No Pets Listed Yet
              </h3>

              <p className="text-muted-foreground">
                Start adding your pets for adoption.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {myPets.map((pet) => (
                <div
                  key={pet._id}
                  className="group relative overflow-hidden rounded-[30px] bg-card border border-border shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={pet.imageUrl}
                      alt={pet.petName}
                      className="h-60 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* STATUS */}
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                        pet.adoptionStatus === "Adopted"
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }`}
                    >
                      {pet.adoptionStatus || "Available"}
                    </div>

                    {/* NAME */}
                    <div className="absolute bottom-5 left-5">
                      <h2 className="text-3xl font-black text-white">
                        {pet.petName}
                      </h2>

                      <p className="text-white/80 text-sm">
                        {pet.species} • {pet.breed}
                      </p>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" />
                        {pet.location}
                      </div>

                      <div className="text-pink-500 font-black text-lg">
                        {pet.adoptionFee === 0 ||
                        pet.adoptionFee === "Free"
                          ? "Free"
                          : `$${pet.adoptionFee}`}
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* VIEW */}
                     <Link
 href={`/all-pets/${pet._id}`}
  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-sm font-bold hover:bg-muted transition-all"
>
  <Eye className="h-4 w-4" />
  View
</Link>

                      {/* EDIT */}
                      <button
                        onClick={() => {
                          setSelectedPet(pet);
                          setIsEditOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-3 text-sm font-bold hover:bg-blue-700 transition-all"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>

                      {/* REQUESTS */}
                      <button
                        onClick={() => handleOpenRequests(pet)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-bold hover:opacity-90 transition-all"
                      >
                        <Users className="h-4 w-4" />
                        Requests
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => {
                          setSelectedPet(pet);
                          setIsDeleteOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 text-white py-3 text-sm font-bold hover:bg-red-700 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && selectedPet && (
        <PetdetailsModal
          petData={selectedPet}
          petId={selectedPet._id}
          onClose={() => setIsEditOpen(false)}
          onUpdateSuccess={(updatedData) => {
            setMyPets((prev) =>
              prev.map((pet) =>
                pet._id === selectedPet._id
                  ? { ...pet, ...updatedData }
                  : pet
              )
            );

            setIsEditOpen(false);

            toast.success("Pet updated successfully");
          }}
        />
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && selectedPet && (
        <DeleteAlert
          petId={selectedPet._id}
          petName={selectedPet.petName}
          ownerEmail={selectedPet.ownerEmail}
          onClose={(deleted = false) => {
            setIsDeleteOpen(false);

            // ONLY REMOVE IF ACTUALLY DELETED
            if (deleted) {
              setMyPets((prev) =>
                prev.filter((pet) => pet._id !== selectedPet._id)
              );
            }
          }}
        />
      )}

      {/* REQUEST MODAL */}
      {requestsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl rounded-[32px] border border-border bg-background p-8 max-h-[90vh] overflow-y-auto">
            {/* TOP */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-foreground">
                  Adoption Requests
                </h2>

                <p className="text-muted-foreground mt-1">
                  Manage incoming requests for{" "}
                  <span className="font-bold">
                    {selectedPet?.petName}
                  </span>
                </p>
              </div>

              <button
                onClick={() => setRequestsModal(false)}
                className="h-11 w-11 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* REQUESTS */}
            {loadingRequests ? (
              <div className="text-center py-20">
                <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />

                <p className="text-muted-foreground">
                  Loading requests...
                </p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                <PawPrint className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

                <h3 className="text-2xl font-black mb-2">
                  No Requests Yet
                </h3>

                <p className="text-muted-foreground">
                  Nobody has requested this pet yet.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {requests.map((request) => (
                  <div
                    key={request._id}
                    className="border border-border rounded-3xl p-5 bg-card"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* USER */}
                      <div>
                        <h3 className="text-xl font-black">
                          {request.userName}
                        </h3>

                        <p className="text-muted-foreground text-sm mt-1">
                          {request.userEmail}
                        </p>

                        <div className="mt-4 space-y-2">
                          <p className="text-sm">
                            <span className="font-bold">
                              Pickup Date:
                            </span>{" "}
                            {request.pickupDate}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {request.message}
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      {/* ACTIONS */}
<div className="flex flex-col gap-3 min-w-[180px]">
  {request.status === "accepted" ? (
    <div className="bg-emerald-500 text-white rounded-xl py-3 text-center font-bold">
      Accepted
    </div>
  ) : request.status === "rejected" ? (
    <div className="bg-red-500 text-white rounded-xl py-3 text-center font-bold">
      Rejected
    </div>
  ) : requests.some((req) => req.status === "accepted") ? (
    <div className="bg-gray-400 text-white rounded-xl py-3 text-center font-bold">
      Another Request Accepted
    </div>
  ) : (
    <>
      <button
        onClick={() =>
          handleRequestAction(
            request._id,
            "accepted"
          )
        }
        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-bold transition-all"
      >
        <Check className="h-4 w-4" />
        Accept
      </button>

      <button
        onClick={() =>
          handleRequestAction(
            request._id,
            "rejected"
          )
        }
        className="rounded-xl bg-red-600 hover:bg-red-700 text-white py-3 font-bold transition-all"
      >
        Reject
      </button>
    </>
  )}
</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
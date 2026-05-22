import { Button } from "@heroui/react";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const FeaturedPets = async () => {
    let featuredPets = [];

    try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/add-pets`;
        const res = await fetch(url, { cache: 'no-store' });

        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) featuredPets = data.slice(0, 3);
        }
    } catch (error) {
        console.error("Fetch failed:", error.message);
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-black text-foreground mb-2">Featured Friends</h2>
                    <p className="text-muted-foreground text-lg">Meet our most recent additions waiting for a home.</p>
                </div>
                <Link href="/all-pets">
                    <Button color="primary" variant="flat" size="lg" className="font-bold">
                        View All Pets →
                    </Button>
                </Link>
            </div>

            {featuredPets.length === 0 ? (
                <div className="text-center py-20 bg-default-100 rounded-3xl border-2 border-dashed">
                    <p className="text-xl text-default-500">No pets currently featured. Check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPets.map((pet) => (
                        <div key={pet._id} className="group relative bg-content1 rounded-3xl border border-default-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
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

                                <div className="flex gap-2 mb-6">
                                    <span className="text-xs bg-success-50 text-success-700 px-3 py-1 rounded-lg font-semibold">
                                        {pet.healthStatus || "Healthy"}
                                    </span>
                                    <span className="text-xs bg-warning-50 text-warning-700 px-3 py-1 rounded-lg font-semibold">
                                        {pet.age} Years Old
                                    </span>
                                </div>

                                <Link href={`/all-pets/${pet._id}`}>
                                    <Button fullWidth color="primary" variant="ghost" className="font-bold">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedPets;
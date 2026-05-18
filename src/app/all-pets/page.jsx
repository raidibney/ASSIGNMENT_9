const allPets = async () => {
    const res = await fetch("http://localhost:5000/add-pet");
    const pets = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-extrabold text-foreground mb-8 text-center sm:text-left">
                All Pets Available for Adoption
            </h1>

            {/* Responsive Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => (
                    <div 
                        key={pet._id} 
                        className="flex flex-col bg-card text-card-foreground border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Pet Image */}
                        <div className="relative h-48 w-full bg-muted">
                            <img
                                src={pet.imageUrl}
                                alt={pet.petName}
                                className="w-full h-full object-cover"
                            />
                            {/* Adoption Fee Badge */}
                            <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full shadow">
                                ৳ {Number(pet.adoptionFee).toLocaleString()}
                            </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-2xl font-bold capitalize truncate">
                                        {pet.petName.trim()}
                                    </h2>
                                    <span className="text-xs bg-muted text-muted-foreground font-medium px-2.5 py-1 rounded">
                                        {pet.gender}
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-muted-foreground capitalize mb-3">
                                    {pet.breed} • {pet.age} Years Old
                                </p>

                                {/* Status Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                        pet.vaccinationStatus === "Fully Vaccinated" 
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    }`}>
                                        {pet.vaccinationStatus}
                                    </span>
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                        pet.healthStatus === "Healthy" 
                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" 
                                            : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
                                    }`}>
                                        {pet.healthStatus}
                                    </span>
                                </div>

                               <p className="text-sm text-foreground/80 line-clamp-3 italic mb-4">
    {"\""}{pet.description.trim()}{"\""}
</p>
                            </div>

                            {/* Card Footer */}
                            <div className="border-t pt-4 mt-auto flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span>{pet.location}</span>
                                </div>
                                <span className="font-semibold text-primary uppercase text-[11px] tracking-wider">
                                    {pet.species}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default allPets;
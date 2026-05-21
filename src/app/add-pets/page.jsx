"use client";

import { Button, Input, Label, ListBox, TextArea, TextField, Select } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddPetsPage = () => {
  const [isPending, setIsPending] = useState(false);
  
  // Unified state for all form fields
  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    vaccinationStatus: "",
    imageUrl: "",
    healthStatus: "",
    location: "",
    adoptionFee: "",
    ownerEmail: "",
    description: ""
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Pet added successfully!");
        // Reset form
        setFormData({
          petName: "", species: "", breed: "", age: "", gender: "",
          vaccinationStatus: "", imageUrl: "", healthStatus: "",
          location: "", adoptionFee: "", ownerEmail: "", description: ""
        });
      } else {
        toast.error("Failed to add pet.");
      }
    } catch (error) {
      toast.error("Network error.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 space-y-8 text-white max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold">Add a <span className="text-pink-400">Pet Listing</span></h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField isRequired label="Pet Name *" value={formData.petName} onChange={(v) => handleChange("petName", v)}>
          <Input placeholder="e.g. Buddy" />
        </TextField>

        <Select isRequired label="Species *" selectedKey={formData.species} onSelectionChange={(k) => handleChange("species", k)}>
          <ListBox>
            <ListBox.Item id="Dog">Dog</ListBox.Item>
            <ListBox.Item id="Cat">Cat</ListBox.Item>
            <ListBox.Item id="Bird">Bird</ListBox.Item>
          </ListBox>
        </Select>

        <TextField label="Breed" value={formData.breed} onChange={(v) => handleChange("breed", v)}><Input /></TextField>
        <TextField label="Age" type="number" value={formData.age} onChange={(v) => handleChange("age", v)}><Input /></TextField>

        <Select label="Gender" selectedKey={formData.gender} onSelectionChange={(k) => handleChange("gender", k)}>
          <ListBox>
            <ListBox.Item id="Male">Male</ListBox.Item>
            <ListBox.Item id="Female">Female</ListBox.Item>
          </ListBox>
        </Select>

        <Select label="Vaccination Status" selectedKey={formData.vaccinationStatus} onSelectionChange={(k) => handleChange("vaccinationStatus", k)}>
          <ListBox>
            <ListBox.Item id="Fully Vaccinated">Fully Vaccinated</ListBox.Item>
            <ListBox.Item id="Not Vaccinated">Not Vaccinated</ListBox.Item>
          </ListBox>
        </Select>

        <div className="md:col-span-2">
          <TextField isRequired label="Pet Image URL" type="url" value={formData.imageUrl} onChange={(v) => handleChange("imageUrl", v)}><Input /></TextField>
        </div>

        <Select isRequired label="Health Status *" selectedKey={formData.healthStatus} onSelectionChange={(k) => handleChange("healthStatus", k)}>
          <ListBox>
            <ListBox.Item id="Healthy">Healthy</ListBox.Item>
            <ListBox.Item id="Under Treatment">Under Treatment</ListBox.Item>
          </ListBox>
        </Select>

        <TextField isRequired label="Location *" value={formData.location} onChange={(v) => handleChange("location", v)}><Input /></TextField>
        
        <div className="md:col-span-2">
          <TextField label="Adoption Fee ($)" type="number" value={formData.adoptionFee} onChange={(v) => handleChange("adoptionFee", v)}><Input /></TextField>
        </div>
        
        <div className="md:col-span-2">
          <TextField isRequired label="Contact Email *" type="email" value={formData.ownerEmail} onChange={(v) => handleChange("ownerEmail", v)}><Input /></TextField>
        </div>

        <div className="md:col-span-2">
          <TextField isRequired label="Description *" value={formData.description} onChange={(v) => handleChange("description", v)}>
            <TextArea className="min-h-[100px]" />
          </TextField>
        </div>
      </div>

      <Button type="submit" isLoading={isPending} className="w-full bg-pink-500 font-bold text-lg h-12">
        Add Pet Listing
      </Button>
    </form>
  );
};

export default AddPetsPage;
"use client";

import { Button, FieldError, Input, Label, ListBox, TextArea, TextField } from '@heroui/react';
import React, { useState } from 'react';
import { Select } from '@heroui/react';
import toast from 'react-hot-toast'; // Ensure you have this installed

const AddPetsPage = () => {
  const [isPending, setIsPending] = useState(false);
  
  // State to track Select components specifically
  const [selectValues, setSelectValues] = useState({
    species: "",
    gender: "",
    vaccinationStatus: "",
    healthStatus: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Merge form inputs with select values
    const finalData = { ...data, ...selectValues };
    
    console.log("Submitting payload:", finalData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData)
      });

      if (res.ok) {
        toast.success("Pet added successfully!");
        // Optional: Reset form or navigate away
      } else {
        toast.error("Failed to add pet.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error.");
    } finally {
      setIsPending(false);
    }
  };

  // Helper to update state for selects
  const handleSelectChange = (key, value) => {
    setSelectValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 space-y-8 text-white">
      <h2 className="text-3xl font-bold">Add a <span className="text-pink-400">Pet Listing</span></h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TextField name="petName" isRequired>
          <Label>Pet Name *</Label>
          <Input placeholder="e.g. Buddy" className="rounded-2xl" />
        </TextField>

        <Select 
          selectedKey={selectValues.species} 
          onSelectionChange={(key) => handleSelectChange("species", key)}
          isRequired 
          label="Species *" 
          className="w-full"
        >
          <ListBox>
            <ListBox.Item id="Dog">Dog</ListBox.Item>
            <ListBox.Item id="Cat">Cat</ListBox.Item>
            <ListBox.Item id="Bird">Bird</ListBox.Item>
          </ListBox>
        </Select>

        <TextField name="breed"><Label>Breed</Label><Input className="rounded-2xl" /></TextField>
        <TextField name="age" type="number"><Label>Age</Label><Input className="rounded-2xl" /></TextField>

        <Select 
          selectedKey={selectValues.gender} 
          onSelectionChange={(key) => handleSelectChange("gender", key)}
          label="Gender"
        >
          <ListBox>
            <ListBox.Item id="Male">Male</ListBox.Item>
            <ListBox.Item id="Female">Female</ListBox.Item>
          </ListBox>
        </Select>

        <Select 
          selectedKey={selectValues.vaccinationStatus} 
          onSelectionChange={(key) => handleSelectChange("vaccinationStatus", key)}
          label="Vaccination Status"
        >
          <ListBox>
            <ListBox.Item id="Fully Vaccinated">Fully Vaccinated</ListBox.Item>
            <ListBox.Item id="Not Vaccinated">Not Vaccinated</ListBox.Item>
          </ListBox>
        </Select>

        <div className="md:col-span-2">
            <TextField name="imageUrl" isRequired>
                <Label>Pet Image URL</Label>
                <Input type="url" className="rounded-2xl" />
            </TextField>
        </div>

        <Select 
          selectedKey={selectValues.healthStatus} 
          onSelectionChange={(key) => handleSelectChange("healthStatus", key)}
          isRequired 
          label="Health Status *"
        >
          <ListBox>
            <ListBox.Item id="Healthy">Healthy</ListBox.Item>
            <ListBox.Item id="Under Treatment">Under Treatment</ListBox.Item>
          </ListBox>
        </Select>

        <TextField name="location" isRequired><Label>Location *</Label><Input className="rounded-2xl" /></TextField>
        
        <div className="md:col-span-2">
            <TextField name="adoptionFee" type="number"><Label>Adoption Fee ($)</Label><Input placeholder="0" /></TextField>
        </div>
        
        <div className="md:col-span-2">
            <TextField name="ownerEmail" isRequired><Label>Contact Email *</Label><Input type="email" /></TextField>
        </div>

        <div className="md:col-span-2">
          <TextField name="description" isRequired>
            <Label>Description *</Label>
            <TextArea className="rounded-3xl" />
          </TextField>
        </div>
      </div>

      <Button type="submit" isLoading={isPending} className="w-full bg-pink-500">
        Add Pet Listing
      </Button>
    </form>
  );
};

export default AddPetsPage;
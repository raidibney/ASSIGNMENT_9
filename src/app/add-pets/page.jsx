"use client";

import { Button, FieldError, Input, Label, ListBox, TextArea, TextField } from '@heroui/react';
import React, { useState } from 'react';
import { Select } from '@heroui/react';

const AddPetsPage = () => {
  // Define the missing loading state variable
  const [isPending, setIsPending] = useState(false);

  // Simple handler to mock form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted with data:", data);

//fetching the backedn api 
   
    const res=await fetch("http://localhost:5000/add-pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result=await res.json();
    console.log(result);

    setIsPending(true);

    try {
      // Your form submission API / Server Action logic will go here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API delay
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-10 space-y-8 text-white">
        {/* Header Section */}
        <div className="mb-6">
          <span className="text-pink-500 font-semibold text-sm block mb-1">
            + List a Pet
          </span>
          <h2 className="text-3xl font-bold">
            Add a <span className="text-pink-400">Pet Listing</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Help a pet find their forever home by creating a detailed listing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section title: Pet Information */}
          <div className="md:col-span-2 flex items-center gap-2 text-pink-400 font-semibold border-b border-gray-800 pb-2">
            <span>🐾</span>
            <span>Pet Information</span>
          </div>

          {/* Pet Name */}
          <TextField name="petName" isRequired>
            <Label>Pet Name *</Label>
            <Input placeholder="e.g. Buddy" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Species (Select) */}
          <div>
            <Select
              name="species"
              isRequired
              className="w-full"
              placeholder="Select species"
            >
              <Label>Species *</Label>
              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Dog" textValue="Dog">Dog</ListBox.Item>
                  <ListBox.Item id="Cat" textValue="Cat">Cat</ListBox.Item>
                  <ListBox.Item id="Bird" textValue="Bird">Bird</ListBox.Item>
                  <ListBox.Item id="Rabbit" textValue="Rabbit">Rabbit</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Breed */}
          <TextField name="breed">
            <Label>Breed</Label>
            <Input placeholder="e.g. Labrador Retriever" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Age */}
          <TextField name="age" type="number">
            <Label>Age (years)</Label>
            <Input placeholder="e.g. 2" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Gender (Select) */}
          <div>
            <Select
              name="gender"
              className="w-full"
              placeholder="Select gender"
            >
              <Label>Gender</Label>
              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Male" textValue="Male">Male</ListBox.Item>
                  <ListBox.Item id="Female" textValue="Female">Female</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Vaccination Status (Select) */}
          <div>
            <Select
              name="vaccinationStatus"
              className="w-full"
              placeholder="Select status"
            >
              <Label>Vaccination Status</Label>
              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Fully Vaccinated" textValue="Fully Vaccinated">Fully Vaccinated</ListBox.Item>
                  <ListBox.Item id="Partially Vaccinated" textValue="Partially Vaccinated">Partially Vaccinated</ListBox.Item>
                  <ListBox.Item id="Not Vaccinated" textValue="Not Vaccinated">Not Vaccinated</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Pet Image URL */}
          <div className="md:col-span-2">
            <TextField name="imageUrl">
              <Label>Pet Image URL <span className="text-xs text-gray-400 font-normal">(upload to imgbb.com first)</span></Label>
              <Input
                type="url"
                placeholder="https://i.ibb.co/..."
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Health Status (Select) */}
          <div>
            <Select
              name="healthStatus"
              isRequired
              className="w-full"
              placeholder="Select health status"
            >
              <Label>Health Status *</Label>
              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Healthy" textValue="Healthy">Healthy</ListBox.Item>
                  <ListBox.Item id="Needs Attention" textValue="Needs Attention">Needs Attention</ListBox.Item>
                  <ListBox.Item id="Under Treatment" textValue="Under Treatment">Under Treatment</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Location */}
          <TextField name="location" isRequired>
            <Label>Location *</Label>
            <Input placeholder="e.g. New York, NY" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Adoption Fee */}
          <div className="md:col-span-2">
            <TextField name="adoptionFee" type="number">
              <Label>Adoption Fee ($) — Enter 0 for free</Label>
              <Input
                type="number"
                placeholder="0"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Owner Email */}
       <div className="md:col-span-2">
  <TextField name="ownerEmail">
    <Label>Owner Email</Label>
    <Input
      type="email"
      // Change defaultValue to value since it's a fixed, disabled field
      value="123alarafat@gmail.com" 
      disabled
      className="rounded-2xl opacity-70 bg-gray-900 cursor-not-allowed"
    />
    <FieldError />
  </TextField>
</div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description *</Label>
              <TextArea
                placeholder="Describe the pet's personality, habits, needs and anything adopters should know..."
                className="rounded-3xl"
              />
              <FieldError />
            </TextField>
          </div>
        </div>

        {/* Form Actions / Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full w-1/2 border-gray-600 text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isPending}
            className="rounded-full w-1/2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold"
          >
            {isPending ? "Listing Pet..." : "Add Pet Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPetsPage;
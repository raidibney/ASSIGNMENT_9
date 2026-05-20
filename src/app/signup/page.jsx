"use client";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; // Changed from redirect to useRouter

const SignUpPage = () => {
  const router = useRouter(); // Initialize the router hook

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      router.push("/"); // Safely navigate to homepage on the client side
    }

    if (error) {
      // toast
      alert(error.message || "Error creating account");
    }
  };

  const handleGoogleSignin = async() => {
    await authClient.signIn.social({
        provider: "google"
    })
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">Start your adventure with Wanderlust</p>
      </div>
      <Card className="border rounded-none p-6 shadow-md bg-background">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField name="image" type="url">
            <Label>Image URL</Label>
            <Input placeholder="Image url" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" type="password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center gap-2 mt-2">
            <Button className={"rounded-none w-full bg-cyan-500 text-white font-medium"} type="submit">
              Create Account
            </Button>
          </div>
        </Form>
        
        <div className="flex justify-center items-center gap-3 my-4 w-full">
          <div className="flex-1"><Separator/></div>
          <div className="whitespace-nowrap text-sm text-muted-foreground"> Or sign up with </div>
          <div className="flex-1"><Separator/></div>
        </div>

        <div className="w-full">
            <Button onClick={handleGoogleSignin} variant="bordered" className={'w-full rounded-none flex items-center justify-center gap-2 border-divider'}><FcGoogle className="h-5 w-5" /> Sign in with Google</Button>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
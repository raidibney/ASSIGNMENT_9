import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

// Define the fonts so they are available in the scope of the file
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PawsomeAdopt",
  description: "Find your perfect companion",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full font-sans`}>
        <ThemeProvider>
          {/* Keeping Toaster inside ThemeProvider guarantees alignment with light/dark variables */}
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar /> 
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { PawPrint, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
              <PawPrint className="h-6 w-6" />
              <span>PawsomeAdopt</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Connecting loving families with pets in need. Our mission is to find a forever home for every wagging tail and gentle purr.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/all-pets" className="hover:text-primary transition-colors">All Pets</Link>
              </li>
              <li>
                <Link href="/add-pet" className="hover:text-primary transition-colors">Rehome a Pet</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:support@pawsomeadopt.com" className="hover:text-primary transition-colors">
                  support@pawsomeadopt.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Bark Avenue, Pet City</span>
              </li>
            </ul>
          </div>

          {/* Social Links using custom SVG paths for reliability */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">Follow Our Journey</h4>
            <p className="text-sm">Stay updated with newly available pets and success stories!</p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" w="20" h="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <hr className="my-8 border-muted" />

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs space-y-4 sm:space-y-0">
          <p>&copy; {currentYear} PawsomeAdopt. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-destructive fill-destructive" /> for animals everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
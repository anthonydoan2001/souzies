"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-secondary py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo and Tagline */}
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-wide text-secondary leading-none mb-2 inline-block"
            >
              SOUZ
              <span className="text-secondary-light lowercase text-4xl align-baseline">
                i
              </span>
              ES
            </Link>
            <p className="text-white/80 text-sm">Authentic Nigerian Cuisine</p>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-12">
            {/* Location */}
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="h-5 w-5 text-secondary-light" />
              <div>
                <h3 className="text-sm font-bold text-white">LOCATION</h3>
                <p className="text-white/80 text-sm">1234 Street Rd, Houston</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="h-5 w-5 text-secondary-light" />
              <div>
                <h3 className="text-sm font-bold text-white">HOURS</h3>
                <p className="text-white/80 text-sm">Daily: 11am - 11pm</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-3">
              <FaPhone className="h-5 w-5 text-secondary-light" />
              <div>
                <h3 className="text-sm font-bold text-white">CONTACT</h3>
                <p className="text-white/80 text-sm">(832)-965-7414</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <div className="flex space-x-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors hover:scale-110 transform duration-300"
                >
                  <FaFacebookF className="h-4 w-4 text-secondary-light" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors hover:scale-110 transform duration-300"
                >
                  <FaInstagram className="h-4 w-4 text-secondary-light" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-6 pt-4 text-center text-white/60 text-sm">
          <p>
            © {new Date().getFullYear()} Souzies Nigerian Cuisine. All rights
            reserved.
          </p>
          <p className="mt-2">
            <Link
              href="/admin"
              className="hover:text-secondary-light transition-colors"
            >
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaPhone,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 md:py-3 bg-white shadow-md"
          : "py-3 md:py-5 bg-white/95"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo - smaller on mobile */}
          <Link
            href="/"
            className="text-3xl md:text-4xl font-extrabold tracking-wide text-secondary leading-none relative group"
          >
            SOUZ
            <span className="text-primary lowercase text-4xl md:text-5xl align-baseline relative">
              i
              <span className="absolute -top-1 -right-1 w-1.5 md:w-2 h-1.5 md:h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </span>
            ES
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Main Navigation Links */}
            <div className="flex space-x-8">
              <Link href="/" className="nav-link">
                HOME
              </Link>
              <Link href="/about" className="nav-link">
                ABOUT US
              </Link>
              <Link href="/menu" className="nav-link">
                MENU
              </Link>
              <Link href="/schedule" className="nav-link">
                SCHEDULE
              </Link>
              <Link href="/catering" className="nav-link">
                CATERING
              </Link>
              <Link href="/gallery" className="nav-link">
                GALLERY
              </Link>
            </div>

            {/* Order & Contact */}
            <div className="flex items-center space-x-6 pl-6 border-l border-gray-200">
              <Link href="/order" className="btn-primary py-2 px-6 text-sm">
                ORDER NOW
              </Link>
              <Link href="/contact" className="nav-link">
                CONTACT
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 text-secondary">
              <a
                href="tel:+1234567890"
                className="hover:text-primary transition-colors hover:scale-110 transform duration-300"
                aria-label="Phone"
              >
                <FaPhone className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:scale-110 transform duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:scale-110 transform duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button - improved with background and animation */}
          <button
            className="lg:hidden text-secondary hover:text-primary transition-colors p-2 rounded-md bg-neutral-100 hover:bg-neutral-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <FaTimes className="h-5 w-5 transform rotate-90 animate-fadeIn" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - improved with animations and better spacing */}
      <div
        className={`lg:hidden fixed top-[calc(100%)] left-0 right-0 bg-white shadow-lg transition-all duration-300 max-h-[80vh] overflow-y-auto ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-5 flex flex-col space-y-5">
          {/* Main Navigation Links */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Link
              href="/"
              className="nav-link py-2 px-3 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className="nav-link py-2 px-3 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="/menu"
              className="nav-link py-2 px-3 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              MENU
            </Link>
            <Link
              href="/schedule"
              className="nav-link py-2 px-3 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              SCHEDULE
            </Link>
            <Link
              href="/catering"
              className="nav-link py-2 px-3 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              CATERING
            </Link>
            <Link
              href="/gallery"
              className="nav-link py-2 px-3 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              GALLERY
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
            <Link
              href="/order"
              className="btn-primary py-3 text-center text-sm font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              ORDER NOW
            </Link>
            <Link
              href="/contact"
              className="btn-secondary py-3 text-center text-sm font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT US
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 pt-4 border-t border-gray-100">
            <a
              href="tel:+1234567890"
              className="text-secondary hover:text-primary transition-colors bg-neutral-100 p-3 rounded-full"
              aria-label="Phone"
            >
              <FaPhone className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors bg-neutral-100 p-3 rounded-full"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors bg-neutral-100 p-3 rounded-full"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

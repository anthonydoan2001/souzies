"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/images/food-truck.jpg",
      title: "Authentic Nigerian Food Truck",
      description: "Experience the rich flavors of Nigeria on the go!",
      buttons: [
        { text: "Order Now", link: "/order" },
        { text: "View Menu", link: "/menu" },
      ],
    },
    {
      image: "/images/catering.jpg",
      title: "Premium Catering Services",
      description: "Bring the taste of Nigeria to your next event.",
      buttons: [
        { text: "View Catering", link: "/catering" },
        { text: "Contact Us", link: "/contact" },
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const [menuIndex, setMenuIndex] = useState(0);
  const favoriteDishes = [
    "/images/favorites/dish1.jpg",
    "/images/favorites/dish2.jpg",
    "/images/favorites/dish3.jpg",
    "/images/favorites/dish4.jpg",
    "/images/favorites/dish5.jpg",
    "/images/favorites/dish6.jpg",
    "/images/favorites/dish7.jpg",
    "/images/favorites/dish8.jpg",
  ];

  const dishNames = [
    "Jollof Rice",
    "Egusi Soup",
    "Suya Skewers",
    "Pounded Yam",
    "Moin Moin",
    "Pepper Soup",
    "Fried Plantains",
    "Chin Chin",
  ];

  // Function to navigate between dish sets
  const goToMenuSet = (setIndex: number): void => {
    setMenuIndex(setIndex * 4);
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <Navbar />

      {/* Hero Section with Spotlight Slider */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            priority
            className="object-cover w-full h-full transition-transform duration-1000 scale-105"
            style={{ transform: `scale(${currentSlide === 0 ? 1.05 : 1.1})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 inline-block bg-secondary px-4 py-1 rounded-full">
              <span className="text-sm md:text-base font-semibold uppercase tracking-wider">
                Taste of Nigeria
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-inknut mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl font-montserrat mb-8 max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {slides[currentSlide].buttons.map((button, index) => (
                <Link
                  key={index}
                  href={button.link}
                  className={index === 0 ? "btn-primary" : "btn-secondary"}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="relative z-10 pb-12">
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-secondary w-10"
                    : "bg-white opacity-50 hover:opacity-75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl bg-black/30 hover:bg-black/50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl bg-black/30 hover:bg-black/50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </section>

      {/* Food Truck Location Section */}
      <section className="bg-primary text-white py-8 md:py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/food-truck.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Location - Full width on mobile */}
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto mb-6 md:mb-0">
              <div className="bg-white/10 p-2 md:p-3 rounded-full flex-shrink-0">
                <FaMapMarkerAlt className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
              </div>
              <div>
                <p className="text-xs md:text-sm uppercase tracking-wider text-secondary font-semibold">
                  Current Location
                </p>
                <p className="text-lg md:text-2xl font-montserrat">
                  1234 Street Rd, Houston, TX
                </p>
              </div>
            </div>

            <div className="h-px w-full md:h-16 md:w-px bg-white/20 md:hidden mb-6"></div>

            {/* Next Event - Full width on mobile */}
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto mb-6 md:mb-0">
              <div className="bg-white/10 p-2 md:p-3 rounded-full flex-shrink-0">
                <FaCalendarAlt className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
              </div>
              <div>
                <p className="text-xs md:text-sm uppercase tracking-wider text-secondary font-semibold">
                  Next Event
                </p>
                <p className="text-lg md:text-2xl font-montserrat">
                  Thursday, March 10th
                </p>
              </div>
            </div>

            {/* CTA Button - Full width on mobile */}
            <Link
              href="/schedule"
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-light px-6 py-3 rounded-lg transition-colors duration-300 w-full md:w-auto"
            >
              <span>View Schedule</span>
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-12 md:py-24 px-4 md:px-6 bg-white pattern-bg"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative mx-auto max-w-sm md:max-w-none">
                {/* Hide decorative borders on mobile for cleaner look */}
                <div className="absolute -top-6 -left-6 w-16 md:w-24 h-16 md:h-24 border-t-4 border-l-4 border-primary hidden md:block"></div>
                <div className="absolute -bottom-6 -right-6 w-16 md:w-24 h-16 md:h-24 border-b-4 border-r-4 border-secondary hidden md:block"></div>
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
                  <Image
                    src="/images/about-us.jpg"
                    width={600}
                    height={450}
                    alt="Souzies Food Truck"
                    className="w-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
              <div>
                <h2 className="section-title text-center md:text-left text-3xl md:text-4xl">
                  ABOUT US
                </h2>
              </div>
              <p className="text-lg md:text-xl font-montserrat leading-relaxed text-neutral-800">
                Souzies brings authentic Nigerian flavors to the heart of
                Houston! From savory Jollof rice to mouth-watering Suya, we
                offer a rich culinary experience that celebrates the diverse and
                vibrant cuisine of Nigeria.
              </p>
              <p className="text-base md:text-lg font-montserrat leading-relaxed text-neutral-800">
                Our recipes have been passed down through generations, bringing
                you the true taste of Nigerian home cooking. Catch our food
                truck around town or book our catering for your next special
                event.
              </p>
              <div className="text-center md:text-left">
                <Link
                  href="/about"
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  <span>Read Our Story</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites Menu Preview */}
      <section className="py-20 bg-secondary text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-light animate-pulse-slow"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-5xl font-inknut mb-6 animate-fade-in">
              OUR FAVORITES
            </h2>
            <div className="w-32 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl">
              Discover our most popular Nigerian dishes, prepared with authentic
              recipes and the freshest ingredients.
            </p>
          </div>

          <div className="flex flex-col items-center">
            {/* Dish Carousel */}
            <div className="w-full max-w-6xl mx-auto mb-12 relative">
              {/* Dishes Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {favoriteDishes
                  .slice(menuIndex, menuIndex + 4)
                  .map((dish, index) => (
                    <div
                      key={index}
                      className="relative group transform hover:scale-105 transition-all duration-500 cursor-pointer"
                      onClick={() => {
                        // This would typically open a modal or navigate to a detail page
                        // For now it's just for visual effect
                      }}
                    >
                      <div className="overflow-hidden rounded-2xl border-4 border-white/30 group-hover:border-white transition-all duration-300 shadow-lg">
                        <div className="relative aspect-square">
                          <Image
                            src={dish}
                            alt={`${
                              dishNames[(menuIndex + index) % dishNames.length]
                            } - Nigerian dish`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                      <div className="mt-4 transform translate-y-0 group-hover:translate-y-1 transition-transform duration-300">
                        <h3 className="font-bold text-xl">
                          {dishNames[(menuIndex + index) % dishNames.length]}
                        </h3>
                        <div className="h-0.5 w-0 bg-white mx-auto group-hover:w-1/2 transition-all duration-500"></div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {[0, 1].map((dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => goToMenuSet(dotIndex)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(menuIndex / 4) === dotIndex
                        ? "bg-white w-8"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to dishes set ${dotIndex + 1}`}
                  />
                ))}
              </div>
            </div>

            <Link
              href="/menu"
              className="btn-primary bg-white text-secondary hover:bg-white/90 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Catering Section */}
      <section
        id="catering"
        className="py-12 md:py-24 px-4 md:px-6 text-center bg-primary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/catering.jpg')] bg-cover bg-center opacity-20 animate-slow-zoom"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Title with decorative elements - hide decorative elements on mobile */}
            <div className="relative inline-block mb-8 md:mb-12">
              <div className="absolute -top-6 -left-6 w-10 h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-secondary opacity-70 hidden md:block"></div>
              <div className="absolute -bottom-6 -right-6 w-10 h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-secondary opacity-70 hidden md:block"></div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-inknut mb-3 md:mb-4 text-white animate-fade-in">
                PREMIUM CATERING
              </h2>
              <div className="w-24 md:w-32 h-1 bg-secondary mx-auto"></div>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl font-montserrat leading-relaxed mb-10 md:mb-16 max-w-3xl mx-auto px-2">
              Fresh, flavorful Nigerian cuisine for your next event. Let us
              bring the authentic taste of our kitchen to your guests.
            </p>

            {/* Service cards with hover animations - stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 */}
              <div className="bg-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-xl group">
                <div className="bg-secondary/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-secondary/40 transition-all duration-500">
                  <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                    🍽️
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-secondary transition-colors duration-300">
                  Corporate Events
                </h3>
                <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                  Impress your clients and team with authentic Nigerian cuisine
                  at your next corporate gathering.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-xl group">
                <div className="bg-secondary/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-secondary/40 transition-all duration-500">
                  <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                    💍
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-secondary transition-colors duration-300">
                  Weddings & Celebrations
                </h3>
                <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                  Make your special day memorable with our customized catering
                  packages.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-xl group sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none">
                <div className="bg-secondary/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-secondary/40 transition-all duration-500">
                  <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                    🏠
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-secondary transition-colors duration-300">
                  Private Parties
                </h3>
                <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                  From intimate gatherings to large celebrations, we&apos;ll
                  create the perfect menu.
                </p>
              </div>
            </div>

            {/* CTA Button with animation - full width on mobile */}
            <div className="mt-10 md:mt-16">
              <Link
                href="/catering"
                className="btn-secondary inline-flex items-center justify-center gap-2 group px-6 md:px-10 py-3 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <span>View Catering Options</span>
                <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="section-title mx-auto animate-fade-in text-3xl md:text-4xl">
              OUR GALLERY
            </h2>
            <p className="text-base md:text-xl text-neutral-800 max-w-3xl mx-auto mt-4 md:mt-6 px-2">
              Take a visual journey through our culinary creations and events.
              Each dish tells a story of Nigerian tradition and flavor.
            </p>
          </div>

          <div className="relative overflow-hidden">
            {/* Decorative elements - hidden on mobile */}
            <div className="absolute -top-10 -left-10 w-32 md:w-40 h-32 md:h-40 border-t-4 border-l-4 border-primary/30 rounded-tl-3xl hidden md:block"></div>
            <div className="absolute -bottom-10 -right-10 w-32 md:w-40 h-32 md:h-40 border-b-4 border-r-4 border-secondary/30 rounded-br-3xl hidden md:block"></div>

            {/* Gallery grid with masonry-like layout - simplified for mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 relative z-10">
              {/* Featured large image - spans 2 rows and 2 columns on all devices */}
              <div className="col-span-2 row-span-2 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-lg md:rounded-xl"></div>
                <div className="overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-xl h-full">
                  <Image
                    src="/images/gallery/gallery1.jpg"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt="Featured Nigerian dish"
                  />
                  {/* Caption - always visible on mobile, hover on desktop */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent md:transform md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-sm md:text-xl font-bold">
                      Signature Dishes
                    </h3>
                    <p className="text-white/80 text-xs md:text-base">
                      Our most popular creations
                    </p>
                  </div>
                </div>
              </div>

              {/* Regular gallery items - simplified for mobile */}
              {[2, 3, 4, 5, 6].map((num, index) => (
                <div
                  key={num}
                  className={`relative group overflow-hidden rounded-lg md:rounded-xl shadow-lg md:shadow-xl ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <Image
                    src={`/images/gallery/gallery${num}.jpg`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={`Nigerian cuisine - gallery image ${num}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/gallery"
              className="btn-primary inline-flex items-center justify-center gap-2 group hover:shadow-highlight transition-all duration-500 w-full sm:w-auto"
            >
              <span>Explore Our Gallery</span>
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <p className="text-white/80 text-sm">
                Authentic Nigerian Cuisine
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-12">
              {/* Location */}
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="h-5 w-5 text-secondary-light" />
                <div>
                  <h3 className="text-sm font-bold text-white">LOCATION</h3>
                  <p className="text-white/80 text-sm">
                    1234 Street Rd, Houston
                  </p>
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
          </div>
        </div>
      </footer>
    </div>
  );
}

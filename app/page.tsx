"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/images/food-truck.jpg",
      title: "Food Truck",
      description: "Delicious Nigerian cuisine on the go!",
      buttons: [
        { text: "Order Now", link: "#order" },
        { text: "View Menu", link: "#menu" },
      ],
    },
    {
      image: "/images/catering.jpg",
      title: "Catering",
      description: "Perfect for events and gatherings.",
      buttons: [
        { text: "View Catering", link: "#catering" },
        { text: "Contact Us", link: "#contact" },
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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

  const nextMenuItem = () => {
    setMenuIndex((prev) => (prev + 1) % favoriteDishes.length);
  };

  const prevMenuItem = () => {
    setMenuIndex(
      (prev) => (prev - 1 + favoriteDishes.length) % favoriteDishes.length
    );
  };

  return (
    <div className="bg-background">
      <Navbar />

      {/* Fullscreen Spotlight Section */}
      <section className="relative w-full h-[90vh] overflow-hidden flex flex-col justify-between">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
          <h3 className="text-5xl font-inknut mb-3">
            {slides[currentSlide].title}
          </h3>
          <p className="text-xl font-montserrat mb-4">
            {slides[currentSlide].description}
          </p>
          <div className="flex space-x-4">
            {slides[currentSlide].buttons.map((button, index) => (
              <a
                key={index}
                href={button.link}
                className="px-6 py-2 bg-secondary text-white font-montserrat hover:bg-opacity-90 transition-colors"
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
        >
          &#10095;
        </button>
        {/* Dots Indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-4 h-4 rounded-full ${
                currentSlide === index ? "bg-secondary" : "bg-white opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Food Truck Location Section */}
      <section className="bg-primary text-white py-6 text-center">
        <p className="text-xl">1234 Street Rd, Houston, TX</p>
        <p className="text-md italic">Thursday, March 10th</p>
      </section>

      {/* About Us Section */}
      <section
        id="about-us"
        className="py-10 px-10 bg-white flex flex-col md:flex-row items-center w-full"
      >
        {/* Left Side - Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/about-us.jpg"
            width={600}
            height={450}
            alt="Souzies Food Truck"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="md:w-1/2 text-center md:text-left px-10 text-black">
          <h2 className="text-4xl font-inknut mb-6 ">ABOUT US</h2>
          <p className="text-xl font-montserrat mb-8">
            Souzies brings authentic Nigerian flavors to the heart of Houston!
            From savory Jollof rice to mouth-watering Suya, we offer a rich
            culinary experience. Catch our food truck or book our catering for
            your next event.
          </p>
          <button className="px-8 py-3 bg-secondary text-white font-montserrat hover:bg-opacity-90 transition-colors">
            Read More
          </button>
        </div>
      </section>

      {/* Favorites Menu Preview */}
      <section className="py-10 bg-secondary text-center text-white">
        <h2 className="text-4xl font-inknut mb-6">OUR FAVORITES</h2>
        <div className="flex items-center justify-center space-x-6">
          <button onClick={prevMenuItem} className="text-3xl">
            &#10094;
          </button>
          <div className="grid grid-cols-4 gap-9">
            {favoriteDishes
              .slice(menuIndex, menuIndex + 4)
              .map((dish, index) => (
                <div key={index} className="relative w-40 h-40">
                  <Image
                    src={dish}
                    alt="Favorite Dish"
                    width={160}
                    height={160}
                    className="rounded-full border-4 border-white"
                  />
                </div>
              ))}
          </div>
          <button onClick={nextMenuItem} className="text-3xl">
            &#10095;
          </button>
        </div>
      </section>

      {/* Catering Section */}
      <section
        id="catering"
        className="py-20 px-6 text-center bg-primary text-white"
      >
        <h2 className="text-4xl font-inknut mb-6">CATERING</h2>
        <p className="text-xl font-montserrat max-w-3xl mx-auto mb-8">
          Fresh, flavorful catering for your next event. Let us bring the taste
          of our kitchen to your guests with delicious dining options.
        </p>
        <button className="px-8 py-3 bg-secondary text-white font-montserrat hover:bg-opacity-90 transition-colors">
          Book Now
        </button>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-6 bg-white">
        <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/gallery/gallery1.jpg"
              fill
              className="object-cover"
              alt="Gallery 1"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/gallery/gallery2.jpg"
              fill
              className="object-cover"
              alt="Gallery 2"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/gallery/gallery3.jpg"
              fill
              className="object-cover"
              alt="Gallery 3"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/gallery/gallery4.jpg"
              fill
              className="object-cover"
              alt="Gallery 4"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/gallery/gallery5.jpg"
              fill
              className="object-cover"
              alt="Gallery 5"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/gallery/gallery6.jpg"
              fill
              className="object-cover"
              alt="Gallery 6"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-8">
        <p className="font-montserrat">
          &copy; 2025 Souzies. All Rights Reserved.
        </p>
        <div className="mt-4 space-x-6 font-montserrat">
          <a href="#" className="hover:text-secondary transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-secondary transition-colors">
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GalleryPage() {
  const galleryImages = [
    {
      src: "/images/gallery/gallery1.jpg",
      alt: "Gallery Image 1",
      caption: "Our signature dishes prepared with care",
    },
    {
      src: "/images/gallery/gallery2.jpg",
      alt: "Gallery Image 2",
      caption: "Fresh ingredients make the difference",
    },
    {
      src: "/images/gallery/gallery3.jpg",
      alt: "Gallery Image 3",
      caption: "Serving smiles at local events",
    },
    {
      src: "/images/gallery/gallery4.jpg",
      alt: "Gallery Image 4",
      caption: "Catering special moments",
    },
    {
      src: "/images/gallery/gallery5.jpg",
      alt: "Gallery Image 5",
      caption: "Our food truck in action",
    },
    {
      src: "/images/gallery/gallery6.jpg",
      alt: "Gallery Image 6",
      caption: "Creating memorable experiences",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-28 md:pt-32">
        <h1 className="text-4xl font-bold text-[#752100] mb-8">Gallery</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg bg-white p-2"
            >
              <div className="relative w-full h-[300px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                <p className="text-center">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#C48C2C] mb-4">
            Share Your Moments
          </h2>
          <p className="text-gray-600">
            Tag us in your photos on Instagram using #SouziesFood for a chance
            to be featured in our gallery!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

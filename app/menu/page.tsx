import Image from "next/image";
import Navbar from "../components/Navbar";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#752100] mb-8">Our Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={`/images/favorites/dish${num}.jpg`}
                  alt={`Favorite Dish ${num}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#C48C2C] mb-2">
                  Signature Dish {num}
                </h3>
                <p className="text-gray-600">
                  A delicious blend of flavors that will tantalize your taste
                  buds.
                </p>
                <p className="text-[#752100] font-bold mt-2">$12.99</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

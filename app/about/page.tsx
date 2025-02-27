import Image from "next/image";
import Navbar from "../components/Navbar";
import { FaQuoteLeft } from "react-icons/fa";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />

      {/* Spacer for navbar */}
      <div className="pt-28 md:pt-32"></div>

      {/* Meet the Owners Section */}
      <section className="py-24 px-6 bg-white pattern-bg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="section-title mb-8">Meet the Owners</h2>
              <div className="prose prose-lg text-neutral-800">
                <p className="mb-6">
                  Welcome to Souzies, where our passion for authentic Nigerian
                  cuisine comes to life! We&apos;re John and Sarah Souza, the
                  proud owners of this family-run food truck that brings the
                  vibrant flavors of Nigeria to the streets of Houston.
                </p>
                <p className="mb-6">
                  Our journey began in 2018 when we decided to share our
                  family&apos;s treasured recipes with the community. Growing up
                  in a Nigerian household, food was always at the center of our
                  gatherings, celebrations, and daily life. We wanted to create
                  that same sense of joy and connection through our food truck.
                </p>
                <p>
                  Every dish we serve is crafted with love, using traditional
                  recipes passed down through generations and the finest
                  ingredients we can source. We believe in not just serving
                  food, but creating an experience that brings people together
                  and introduces them to the rich culinary heritage of Nigeria.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-primary"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-secondary"></div>
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about-us.jpg"
                    alt="Souzies Owners"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-secondary text-white p-8 rounded-2xl shadow-xl max-w-[350px]">
                <FaQuoteLeft className="text-white/30 text-4xl mb-4" />
                <p className="italic text-lg">
                  We pour our hearts into every dish, ensuring each bite tells
                  our story of tradition and love for Nigerian cuisine.
                </p>
                <p className="mt-4 font-semibold">- John & Sarah Souza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-24 px-6 bg-neutral-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title mx-auto">Our Journey</h2>
              <p className="text-xl text-neutral-800 max-w-3xl mx-auto mt-6">
                From humble beginnings to becoming Houston&apos;s favorite
                Nigerian food destination
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-secondary/30 transform md:translate-x-[-50%]"></div>

              {/* Timeline Items */}
              <div className="space-y-24">
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-1 md:w-1/2 pr-0 md:pr-12 text-right hidden md:block">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      The Beginning
                    </h3>
                    <p className="text-neutral-800">
                      Started our food truck with just five family recipes and a
                      dream.
                    </p>
                  </div>

                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] bg-secondary text-white font-bold rounded-full w-16 h-16 flex items-center justify-center z-10 shadow-lg">
                    2018
                  </div>

                  <div className="order-2 md:order-2 md:w-1/2 pl-0 md:pl-12 md:text-left mt-8 md:mt-0 block md:hidden">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      The Beginning
                    </h3>
                    <p className="text-neutral-800">
                      Started our food truck with just five family recipes and a
                      dream.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-2 md:w-1/2 pl-0 md:pl-12 text-left hidden md:block">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Growing Community
                    </h3>
                    <p className="text-neutral-800">
                      Expanded our menu and started catering local events.
                    </p>
                  </div>

                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] bg-secondary text-white font-bold rounded-full w-16 h-16 flex items-center justify-center z-10 shadow-lg">
                    2019
                  </div>

                  <div className="order-2 md:order-1 md:w-1/2 pr-0 md:pr-12 md:text-right mt-8 md:mt-0 block md:hidden">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Growing Community
                    </h3>
                    <p className="text-neutral-800">
                      Expanded our menu and started catering local events.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-1 md:w-1/2 pr-0 md:pr-12 text-right hidden md:block">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Adapting & Thriving
                    </h3>
                    <p className="text-neutral-800">
                      Launched delivery services and virtual cooking classes.
                    </p>
                  </div>

                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] bg-secondary text-white font-bold rounded-full w-16 h-16 flex items-center justify-center z-10 shadow-lg">
                    2020
                  </div>

                  <div className="order-2 md:order-2 md:w-1/2 pl-0 md:pl-12 md:text-left mt-8 md:mt-0 block md:hidden">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Adapting & Thriving
                    </h3>
                    <p className="text-neutral-800">
                      Launched delivery services and virtual cooking classes.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-2 md:w-1/2 pl-0 md:pl-12 text-left hidden md:block">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Today
                    </h3>
                    <p className="text-neutral-800">
                      Award-winning food truck with a loyal following and
                      expanding catering services.
                    </p>
                  </div>

                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] bg-secondary text-white font-bold rounded-full w-16 h-16 flex items-center justify-center z-10 shadow-lg">
                    2023
                  </div>

                  <div className="order-2 md:order-1 md:w-1/2 pr-0 md:pr-12 md:text-right mt-8 md:mt-0 block md:hidden">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Today
                    </h3>
                    <p className="text-neutral-800">
                      Award-winning food truck with a loyal following and
                      expanding catering services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

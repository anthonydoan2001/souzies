import Image from "next/image";
import Navbar from "../components/Navbar";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Footer from "../components/Footer";

export default function CateringPage() {
  const services = [
    {
      title: "Corporate Events",
      description:
        "Perfect for office parties, meetings, and corporate functions. We&apos;ll work with you to create a menu that suits your needs.",
      minGuests: 20,
      icon: "🏢",
    },
    {
      title: "Private Parties",
      description:
        "From birthdays to anniversaries, let us make your special day memorable with our delicious food.",
      minGuests: 15,
      icon: "🎉",
    },
    {
      title: "Weddings",
      description:
        "Make your wedding reception unique with our food truck experience. We offer custom menus and packages.",
      minGuests: 50,
      icon: "💍",
    },
    {
      title: "Festivals & Events",
      description:
        "Planning a community event or festival? Our food truck can serve large crowds efficiently.",
      minGuests: 100,
      icon: "🎪",
    },
  ];

  // Testimonials section removed

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />

      {/* Spacer for navbar */}
      <div className="pt-28 md:pt-32"></div>

      {/* Introduction Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white pattern-bg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative mx-auto max-w-sm md:max-w-none">
                {/* Hide decorative borders on mobile for cleaner look */}
                <div className="absolute -top-6 -left-6 w-16 md:w-24 h-16 md:h-24 border-t-4 border-l-4 border-primary hidden md:block"></div>
                <div className="absolute -bottom-6 -right-6 w-16 md:w-24 h-16 md:h-24 border-b-4 border-r-4 border-secondary hidden md:block"></div>
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
                  <Image
                    src="/images/catering.jpg"
                    width={600}
                    height={450}
                    alt="Souzies Catering"
                    className="w-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
              <h2 className="section-title text-center md:text-left text-3xl md:text-4xl">
                Let Us Cater Your Next Event
              </h2>
              <p className="text-lg md:text-xl font-montserrat leading-relaxed text-neutral-800">
                Bring the unique flavors and experience of Souzies to your
                special event. We offer full-service catering that will make
                your event memorable and delicious.
              </p>
              <p className="text-base md:text-lg font-montserrat leading-relaxed text-neutral-800">
                Our team works closely with you to create a custom menu that
                fits your event&apos;s needs and preferences. From casual
                gatherings to formal events, we&apos;ve got you covered.
              </p>
              <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded-r-lg">
                <p className="font-bold text-primary">Book Early!</p>
                <p className="text-neutral-800">
                  We recommend booking at least 2-3 weeks in advance to ensure
                  availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-neutral-100">
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="section-title mx-auto text-3xl md:text-4xl">
              Our Services
            </h2>
            <p className="text-base md:text-xl text-neutral-800 max-w-3xl mx-auto mt-4 md:mt-6 px-2">
              We offer a variety of catering options to suit your needs. From
              small gatherings to large events, we can accommodate your
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-xl group"
              >
                <div className="bg-secondary/10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-secondary/20 transition-all duration-300">
                  <span className="text-2xl md:text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4 text-center group-hover:text-secondary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-800 mb-4 md:mb-6 text-center">
                  {service.description}
                </p>
                <div className="text-center text-secondary text-sm md:text-base font-semibold border-t border-secondary/20 pt-3 md:pt-4 mt-auto">
                  Minimum {service.minGuests} guests
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer section - removed testimonials */}
      <div className="py-8 bg-neutral-100"></div>

      {/* Booking Process */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="section-title mx-auto text-3xl md:text-4xl">
              How to Book
            </h2>
            <p className="text-base md:text-xl text-neutral-800 max-w-3xl mx-auto mt-4 md:mt-6 px-2">
              Booking our catering services is easy. Follow these simple steps
              to get started.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line - only visible on desktop */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-secondary/30 hidden md:block"></div>

              <div className="space-y-8 md:space-y-12">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                  {/* Number circle - centered on mobile */}
                  <div className="bg-secondary text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg z-10 mb-3 md:mb-0">
                    <span className="text-xl md:text-2xl font-bold">1</span>
                  </div>
                  {/* Content box - full width on mobile */}
                  <div className="bg-neutral-100 p-5 md:p-6 rounded-xl shadow-md flex-grow w-full">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 text-center md:text-left">
                      Contact Us
                    </h3>
                    <p className="text-neutral-800 text-center md:text-left">
                      Reach out with your event details including date,
                      location, and estimated number of guests.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                  <div className="bg-secondary text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg z-10 mb-3 md:mb-0">
                    <span className="text-xl md:text-2xl font-bold">2</span>
                  </div>
                  <div className="bg-neutral-100 p-5 md:p-6 rounded-xl shadow-md flex-grow w-full">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 text-center md:text-left">
                      Menu Planning
                    </h3>
                    <p className="text-neutral-800 text-center md:text-left">
                      We&apos;ll work with you to create a custom menu that fits
                      your event&apos;s needs and preferences.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                  <div className="bg-secondary text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg z-10 mb-3 md:mb-0">
                    <span className="text-xl md:text-2xl font-bold">3</span>
                  </div>
                  <div className="bg-neutral-100 p-5 md:p-6 rounded-xl shadow-md flex-grow w-full">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 text-center md:text-left">
                      Proposal & Approval
                    </h3>
                    <p className="text-neutral-800 text-center md:text-left">
                      Review and approve our detailed proposal including menu,
                      services, and pricing.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                  <div className="bg-secondary text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg z-10 mb-3 md:mb-0">
                    <span className="text-xl md:text-2xl font-bold">4</span>
                  </div>
                  <div className="bg-neutral-100 p-5 md:p-6 rounded-xl shadow-md flex-grow w-full">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 text-center md:text-left">
                      Confirmation
                    </h3>
                    <p className="text-neutral-800 text-center md:text-left">
                      Secure your date with a deposit and we&apos;ll handle the
                      rest to make your event special.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12 md:mt-16">
              <Link
                href="/contact"
                className="btn-secondary inline-flex items-center justify-center gap-2 group px-6 md:px-10 py-3 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <span>Request a Quote</span>
                <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // In a real implementation, you would send this data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setSubmitStatus({
        success: true,
        message: "Your message has been sent! We'll get back to you soon.",
      });
    } catch {
      setSubmitStatus({
        success: false,
        message: "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-20 pt-28 md:pt-32">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-[#C48C2C] opacity-50 hidden md:block"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-[#C48C2C] opacity-50 hidden md:block"></div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#752100] mb-4 font-inknut">
              CONTACT US
            </h1>
            <div className="w-24 h-1 bg-[#C48C2C] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Have questions or want to book our food truck for your event?
              We&apos;d love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#FFF8E7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-[#C48C2C] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#752100] mb-2">Email</h3>
              <p className="text-gray-700">info@souziesfoodtruck.com</p>
              <a
                href="mailto:info@souziesfoodtruck.com"
                className="text-[#C48C2C] hover:text-[#752100] font-medium mt-2 inline-block"
              >
                Send an email
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#FFF8E7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-[#C48C2C] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#752100] mb-2">Phone</h3>
              <p className="text-gray-700">(555) 123-4567</p>
              <a
                href="tel:5551234567"
                className="text-[#C48C2C] hover:text-[#752100] font-medium mt-2 inline-block"
              >
                Call us
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#FFF8E7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-[#C48C2C] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#752100] mb-2">
                Location
              </h3>
              <p className="text-gray-700">Houston, TX</p>
              <a
                href="/schedule"
                className="text-[#C48C2C] hover:text-[#752100] font-medium mt-2 inline-block"
              >
                View our schedule
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#752100] mb-6 text-center">
              Send Us a Message
            </h2>

            {submitStatus && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.success
                    ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                    : "bg-red-50 text-red-800 border-l-4 border-red-500"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                  placeholder="Catering Inquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48C2C] focus:border-transparent transition-all duration-200 text-gray-800"
                  placeholder="I'd like to inquire about booking your food truck for an event..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#752100] to-[#8B3A00] text-white py-3 px-8 rounded-lg hover:from-[#8B3A00] hover:to-[#9B4A10] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#752100] mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-[#752100] mb-2">
                  How far in advance should I book for catering?
                </h3>
                <p className="text-gray-700">
                  We recommend booking at least 2-3 weeks in advance to ensure
                  availability, especially during peak seasons. For larger
                  events, 1-2 months notice is ideal.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-[#752100] mb-2">
                  Do you offer vegetarian options?
                </h3>
                <p className="text-gray-700">
                  Yes! We have several delicious vegetarian options on our menu.
                  We can also accommodate other dietary restrictions with
                  advance notice.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-[#752100] mb-2">
                  What areas do you serve?
                </h3>
                <p className="text-gray-700">
                  We primarily serve the greater Houston area, but we&apos;re
                  willing to travel for larger events. Additional travel fees
                  may apply for locations beyond a 30-mile radius.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

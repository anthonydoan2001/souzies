import Link from "next/link";
import { FaInstagram, FaFacebookF, FaPhone } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-end px-12 py-4 bg-white border-b">
      {/* Left Side: Logo + Main Navigation */}
      <div className="flex items-end space-x-10">
        {/* Logo */}
        <h1 className="text-4xl font-extrabold tracking-wide text-[#C48C2C] leading-none">
          SOUZ
          <span className="text-[#752100] lowercase text-5xl align-baseline">
            i
          </span>
          ES
        </h1>

        {/* Main Navigation Links */}
        <div className="flex space-x-8 font-montserrat text-md font-extrabold uppercase tracking-wide text-[#C48C2C]">
          <Link href="/" className="hover:text-black transition-colors">
            HOME
          </Link>
          <Link href="#about" className="hover:text-black transition-colors">
            ABOUT US
          </Link>
          <Link href="#menu" className="hover:text-black transition-colors">
            MENU
          </Link>
          <Link href="#schedule" className="hover:text-black transition-colors">
            SCHEDULE
          </Link>
          <Link href="#catering" className="hover:text-black transition-colors">
            CATERING
          </Link>
          <Link href="#gallery" className="hover:text-black transition-colors">
            GALLERY
          </Link>
        </div>
      </div>

      {/* Right Side: ORDER, CONTACT US + Social Icons */}
      <div className="flex items-end space-x-8">
        <Link
          href="#order"
          className="text-[#C48C2C] font-extrabold uppercase text-md hover:text-black transition-colors"
        >
          ORDER
        </Link>
        <Link
          href="#contact"
          className="text-[#C48C2C] font-extrabold uppercase text-md hover:text-black transition-colors"
        >
          CONTACT US
        </Link>

        {/* Social Media Icons */}
        <div className="flex items-center space-x-5 text-[#C48C2C]">
          <a
            href="tel:+1234567890"
            className="hover:text-black transition-colors"
          >
            <FaPhone className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            className="hover:text-black transition-colors"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href="https://facebook.com"
            className="hover:text-black transition-colors"
          >
            <FaFacebookF className="h-6 w-6" />
          </a>
        </div>
      </div>
    </nav>
  );
}

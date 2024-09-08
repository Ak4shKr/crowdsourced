import React, { useState } from "react";
import ContactUsModal from "./ContactUsModal";

import Navbar1 from "./Navbar1";

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="Landing-page font-lora bg-custom min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <Navbar1 />
      {/* Main Content */}
      <div className="flex flex-grow w-full md:w-[50%] justify-center items-center">
        <div className="flex flex-col items-center text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to</h1>
          <h2 className="text-5xl md:text-6xl font-bold text-yellow-300 mb-8">
            Crowdsourced Reporting Platform
          </h2>
          <p className="text-xl mb-1">
            <span className="font-semibold">Empowering communities</span> to
            tackle issues together.
          </p>
          <p className="text-xl mb-6">
            Our innovative approach ensures every voice is heard and every
            problem is addressed effectively.
          </p>
          <p className="text-base mb-8">
            <span className="font-semibold">Join our platform</span> and{" "}
            <span className="font-semibold">be a part of the solution.</span>
          </p>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <a
              href="/register"
              className="inline-block px-8 py-2 bg-yellow-300 text-black font-semibold text-lg rounded-lg shadow-lg hover:bg-yellow-500 transition duration-200"
            >
              Register with Us
            </a>
            <button
              onClick={openModal}
              className="bg-[#1c1a41] inline-block px-8 py-2 mt-2 sm:mt-0 text-white font-semibold text-lg rounded-lg shadow-lg border-2 border-gradient-to-r from-blue-500 via-purple-600 to-red-500 hover:bg-gray-900 transition duration-200"
            >
              Contact Us
            </button>
          </div>
          <p className="absolute bottom-2 text-md mb-2">
            <a target="blank" href="https://linkedin.com/in/akash-saha-cod">
              {" "}
              Made with ❤️ by ~Akash!
            </a>
          </p>
        </div>
      </div>

      {/* Login Modal */}
      <ContactUsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Landing;

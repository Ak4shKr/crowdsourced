// LoginModal.js
import React from "react";

const ContactUsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-[#1c1a41] z-20 text-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
        <h2 className="text-2xl font-bold mb-4">Contact form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-md mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1e1e1e] text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-md mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1e1e1e] text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-md mb-2">message</label>
            <textarea
              rows={5}
              type="text"
              id="message"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1e1e1e] text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-4xl font-extrabold hover:scale-110"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ContactUsModal;

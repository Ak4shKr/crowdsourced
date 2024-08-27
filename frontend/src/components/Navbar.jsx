import React from "react";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container w-[70%] mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white text-xl font-bold">
          <a href="/">raiseYourVoice</a>
        </div>

        {/* Nav Items */}
        <div className="flex space-x-6">
          <a href="/" className="text-white hover:text-gray-200">
            Home
          </a>
          <a href="/raise-complaint" className="text-white hover:text-gray-200">
            Raise Complaint
          </a>
          <a href="/your-complaints" className="text-white hover:text-gray-200">
            Your Past Complaints
          </a>
          {token ? (
            <a
              // href="/logout"
              className="text-white hover:text-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </a>
          ) : (
            <a href="/login" className="text-white hover:text-gray-200">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

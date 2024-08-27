import React, { useState } from "react";
import service from "../http/service";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Additional validation can be added here (e.g., email format)

    // Call the onSubmit function passed as a prop
    try {
      const response = await service.post("/users/login", {
        email: email, // Ensure these match your backend expectations
        password: password,
      });
      console.log(response.data);
      localStorage.clear();
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location = "/";
    } catch (error) {
      console.error("Error during login:", error.response.data); // Check response data for details
    }

    // Reset form fields after submission
    setEmail("");
    setPassword("");

    // Reset form fields after submission
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <p>
          New User?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-800 font-semibold"
          >
            {" "}
            Register Here!
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

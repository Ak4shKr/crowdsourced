import React, { useState } from "react";
import service from "../http/service";

const RaiseComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !location || !description) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true); // Set loading state

    try {
      const response = await service.post(
        "/issues/createIssue",
        {
          title,
          location,
          description,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Complaint submitted successfully");
        // Reset form fields
        setTitle("");
        setLocation("");
        setDescription("");
      }
    } catch (error) {
      setError("Failed to submit complaint. Please try again.");
      console.error("Error submitting complaint:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-[40%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Raise a Complaint
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title (e.g., Flooded Street)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter location (e.g., Sec 10, Faridabad)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable button when loading
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default RaiseComplaintForm;

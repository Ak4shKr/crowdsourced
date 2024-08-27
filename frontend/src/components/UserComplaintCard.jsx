// import React from "react";

// const UserComplaintCard = ({
//   title,
//   location,
//   description,
//   applicationStatus,
//   createdAt,
//   upvotes,
//   downvotes,
//   onDelete,
// }) => {
//   return (
//     <div className="w-[70%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
//       <div className="p-4">
//         {/* Title and Location */}
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//           <span className="text-sm text-gray-500">{location}</span>
//         </div>

//         {/* Description */}
//         <p className="mt-2 text-gray-600">{description}</p>

//         {/* Application Status */}
//         <div className="mt-4">
//           <span
//             className={`px-2 py-1 rounded-full text-xs font-semibold ${
//               applicationStatus === "Pending"
//                 ? "bg-yellow-100 text-yellow-800"
//                 : applicationStatus === "Approved"
//                 ? "bg-green-100 text-green-800"
//                 : "bg-red-100 text-red-800"
//             }`}
//           >
//             {applicationStatus}
//           </span>
//         </div>

//         {/* Created By and Date */}
//         <div className="flex justify-between items-center mt-4">
//           <div className="text-sm text-gray-500">
//             Created at: {new Date(createdAt).toLocaleDateString()}
//           </div>
//         </div>

//         {/* Upvote and Downvote Buttons */}
//         <div className="flex justify-between items-center mt-4">
//           <button className="flex items-center text-green-500 hover:text-green-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-5 h-5 mr-1"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 15l7-7 7 7"
//               />
//             </svg>
//             Upvote ({upvotes})
//           </button>
//           <button className="flex items-center text-red-500 hover:text-red-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-5 h-5 mr-1"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//             Downvote ({downvotes})
//           </button>
//         </div>

//         {/* Delete Button */}
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={onDelete}
//             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//           >
//             Delete Complaint
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserComplaintCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import service from "../http/service";

const UserComplaintCard = ({
  title,
  location,
  description,
  applicationStatus,
  createdAt,
  upvotes,
  downvotes,
  onDelete,
}) => {
  return (
    <div className="w-[70%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="p-4">
        {/* Title and Location */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <span className="text-sm font-semibold text-gray-500">
            {location}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 w-[98%] mx-auto text-gray-600">{description}</p>

        {/* Application Status */}
        <div className="mt-4 flex justify-between">
          <span
            className={`px-3 py-1 rounded-md text-base font-semibold ${
              applicationStatus === "open"
                ? "bg-yellow-100 text-yellow-800"
                : applicationStatus === "resolved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {applicationStatus}
          </span>
          <div className="text-sm text-gray-500">
            Created at: {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Created At */}
        {/* <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Created at: {new Date(createdAt).toLocaleDateString()}
          </div>
        </div> */}

        {/* Upvote and Downvote Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button className="flex items-center text-green-500 hover:text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
            Upvote ({upvotes})
          </button>
          <button className="flex items-center text-red-500 hover:text-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Downvote ({downvotes})
          </button>
        </div>

        {/* Delete Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Complaint
          </button>
        </div>
      </div>
    </div>
  );
};

const UserComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await service.get("/users/allissues", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setComplaints(response.data);
      } catch (err) {
        setError("Failed to fetch complaints.");
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete an issue.");
        return;
      }
      // console.log(id);
      // want to take consent from user before deleting
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this issue?"
      );
      if (!confirmDelete) return;

      // Send request to backend with issue ID in the URL
      const response = await service.delete(`/users/deleteIssue/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      // console.log(response);

      if (response.status === 200) {
        alert("Issue deleted successfully.");
        // Optionally, refresh or update the complaint list after deletion
      } else {
        alert("Failed to delete issue. Please try again.");
      }
      setRefresh(!refresh);
    } catch (error) {
      console.log("Error deleting issue:", error);
      // alert("Failed to delete issue. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {complaints.map((complaint) => (
        <UserComplaintCard
          key={complaint._id}
          title={complaint.title}
          location={complaint.location}
          description={complaint.description}
          applicationStatus={complaint.status}
          createdAt={complaint.createdAt}
          upvotes={complaint.upvotes}
          downvotes={complaint.downvotes}
          onDelete={() => handleDelete(complaint._id)}
        />
      ))}
    </div>
  );
};

export default UserComplaintList;

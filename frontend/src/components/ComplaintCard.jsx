import React, { useEffect, useState } from "react";
import service from "../http/service"; // Import your Axios instance

// ComplaintCard Component
const ComplaintCard = ({
  title,
  description,
  location,
  createdAt,
  createdBy,
  upvotes,
  downvotes,
  CommentsCount,
  id,
}) => {
  const [comment, setComment] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const p = CommentsCount.length;
  // console.log(CommentsCount);
  const handleupvote = async (e) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await service.post(
        `/issues/upvoteIssue/${id}`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Upvote successful", response.data);
    } catch (error) {
      console.log("Error upvoting issue", error);
    }
  };
  const handledownvote = async (e) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await service.post(
        `/issues/downvoteIssue/${id}`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Upvote successful", response.data);
    } catch (error) {
      console.log("Error upvoting issue", error);
    }
  };

  const handlecomment = async (e) => {
    e.preventDefault();
    // console.log(comment);
    const response = await service.post(
      `/issues/commentIssue/${id}`,
      { comment: comment },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      alert("Comment submitted successfully");
      setComment("");
    }
  };
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

        {/* Created By and Date */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            <span>Created by: </span>
            <span className="font-semibold">{createdBy}</span>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
        {/* Upvote and Downvote Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleupvote}
            className="flex items-center text-green-500 hover:text-green-700"
          >
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
          <button className="flex items-center text-blue-500 hover:text-blue-700">
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
                d="M8 10h8m-4-4h4m-2 8h2m-6 0h.01M8 14h.01M4 6h16M4 6v14l4-4h12"
              />
            </svg>
            Comments ({CommentsCount})
          </button>
          <button
            // onClick={handledownvote}
            className="flex items-center text-red-500 hover:text-red-700"
          >
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
        {/* Comment Section */}
        <form action="" onSubmit={handlecomment}>
          <div className="mt-4 flex">
            <input
              type="text"
              value={comment}
              id="comment"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ComplaintList Component
const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await service.get("/issues/allissues", {
          // headers: {
          //   Authorization: `${localStorage.getItem("token")}`,
          // },
        }); // Adjust endpoint as necessary
        setComplaints(response.data);
        // console.log(response.data);
      } catch (error) {
        setError("Failed to fetch complaints");
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);
  // console.log(CommentsCount);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {complaints.map((complaint) => (
        <ComplaintCard
          key={complaint._id}
          title={complaint.title}
          location={complaint.location}
          description={complaint.description}
          createdAt={complaint.createdAt}
          createdBy={complaint.complainer}
          upvotes={complaint.upvotes}
          downvotes={complaint.downvotes}
          commentsCount={complaint.comments.length}
          id={complaint._id}
        />
      ))}
    </div>
  );
};

export default ComplaintList;

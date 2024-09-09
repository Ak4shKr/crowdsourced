import React, { useState } from "react";
import UserComplaintList from "./UserComplaintList";
import UserDashboard from "./UserDashboard";

const EditProfile = () => <div>Edit your profile here.</div>;
const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("complaints"); // Default tab is 'complaints'
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user.name;

  console.log(user);
  console.log(name);

  const renderTabContent = () => {
    switch (activeTab) {
      case "complaints":
        return <UserComplaintList />;
      case "editProfile":
        return <EditProfile />;
      case "analytics":
        return <UserDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-[95%] lg:w-[70%] mx-auto shadow-lg rounded-lg p-4 mt-2">
      <h2 className="font-lora text-2xl font-bold text-yellow-300 mb-4">
        {" "}
        Hello, {name}
      </h2>
      {/* Tabs Navigation */}
      <div className="font-lora sticky top-[4rem] md:top-[4.7rem] z-20 flex gap-2 bg-blue-600 text-white rounded-lg mb-4 px-1 py-2 justify-center">
        <button
          className={`px-4 py-2 border rounded-md font-semibold border-none ${
            activeTab === "analytics" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Your Analytics
        </button>
        <button
          className={`px-4 py-2 border rounded-md font-semibold border-none ${
            activeTab === "complaints" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("complaints")}
        >
          Your Past Complaints
        </button>
        <button
          className={`px-4 py-2 border rounded-md font-semibold border-none ${
            activeTab === "editProfile" ? "bg-white text-black" : ""
          }`}
          onClick={() => setActiveTab("editProfile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Render Content Based on Active Tab */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default MyAccount;

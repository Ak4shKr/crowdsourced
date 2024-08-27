import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import ComplaintCard from "./components/ComplaintCard";
import RaiseComplaintForm from "./components/RaiseIssue";
import UserComplaintCard from "./components/UserComplaintCard";
import LoginForm from "./components/LogIn";
import SignupForm from "./components/SignUp";
import ComplaintList from "./components/ComplaintCard";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<ComplaintList />} />
          <Route path="raise-complaint" element={<RaiseComplaintForm />} />
          <Route path="your-complaints" element={<UserComplaintCard />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<SignupForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// <div className="App">
//       <Navbar />
//       <ComplaintCard
//         title="Flooded Street"
//         location="sec 10, faridabad"
//         description="The street in front of my house is completely flooded due to heavy rain. It’s becoming a health hazard."
//         createdAt="2024-08-25"
//         createdBy="John Doe"
//         upvotes={10}
//         downvotes={2}
//       />
//     </div>

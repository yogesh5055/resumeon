import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Terms.css"; // Ensure this file is linked correctly

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-wrapper">
      <div className="terms-content">
        <h2>Terms & Conditions</h2>
        <p>
          By using Resumeon, you agree to the following terms and conditions. Please read them carefully before proceeding.
        </p>

        <ul>
          <li>Your personal data is securely stored and not shared with third parties.</li>
          <li>You must provide accurate and truthful information during signup.</li>
          <li>Unauthorized use of Resumeon’s services is strictly prohibited.</li>
          <li>We may update these terms periodically, and your continued use indicates acceptance.</li>
        </ul>

        <div className="btn-container">
          <button className="btn-back" onClick={() => navigate("/signup")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;

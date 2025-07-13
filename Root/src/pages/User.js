import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/User.css"; 

import p1 from "../template1.jpg";
import p2 from "../template2.jpg";

const templates = [
  { id: 1, name: "Student", image: p1 },
  { id: 2, name: "Fresher with Experience", image: p2 },
  // { id: 3, name: "Professional", image: p },
  // { id: 4, name: "Elegant", image: p },
  // { id: 5, name: "Minimalist", image: p },
  // { id: 6, name: "Bold", image: p },
];

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    const handleBack = () => {
      navigate("/user", { replace: true });
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleSelectTemplate = (template) => {
  if (template.id === 1) {
    localStorage.setItem("selectedTemplate", JSON.stringify(template));
    navigate("/forms"); // Navigate only if template ID is 1
  } else {
    alert("This template is not available yet!"); // Show alert for other templates
  }
};


  return (
    <div className="user-container">
      {/* Page Title */}
      <h2 className="page-title">Choose a Resume Template</h2>

      {/* Templates Grid */}
      <div className="templates-container">
        {templates.map((template) => (
          <div key={template.id} className="template-card">
            <a href={template.image} target="_blank" rel="noopener noreferrer">
              <img src={template.image} alt={template.name} className="template-img" />
            </a>
            <p className="template-name">{template.name}</p>
            <div className="button-group">
              <button className="btn select-template"  onClick={() => handleSelectTemplate(template)} >Select</button>
            </div>
          </div>
        ))}
      </div>

      

      {/* Logout Button at Bottom */}
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default User;

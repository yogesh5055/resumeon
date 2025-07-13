import React from "react";
import "../styles/Loading.css"; // Import custom CSS for styling

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        Loading
      </div>
    </div>
  );
}

export default Loading;

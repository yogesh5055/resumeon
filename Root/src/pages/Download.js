import { useNavigate } from "react-router-dom";
import "../styles/Download.css"; // Import the CSS file

function Download() {
    const navigate = useNavigate();

    const handleDownload = (type) => {
        window.location.href = `http://localhost:8000/download-resume?format=${type}`;
    };

    return (
        <div className="download-container">
            <h2 className="download-heading">🎉 Your Resume is Ready!</h2>
            <p className="download-text">Download your resume in your preferred format.</p>

            <div className="download-buttons">
                <button onClick={() => handleDownload("docx")} className="download-btn">
                    Download as DOCX
                </button>
                <button onClick={() => handleDownload("pdf")} className="download-btn">
                    Download as PDF
                </button>
            </div>

            <button onClick={() => navigate("/user")} className="back-btn">
                ⬅ Back to User Page
            </button>
        </div>
    );
}

export default Download;

import React, { useState } from "react";
import "../styles/Forms.css"; // Import styles
import { useNavigate } from "react-router-dom";

const Forms = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    collegeName: "",
    collegeAddress: "",
    degree: "",
    passingYear: "",
    programmingLanguages: "",
    toolsTechnologies: "",
    librariesFrameworks: "",
    projects: [
      { title: "", descriptions: ["", "", ""] },
      { title: "", descriptions: ["", "", ""] },
    ],
    certifications: [
      { name: "", completedAt: "" },
      { name: "", completedAt: "" },
      { name: "", completedAt: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleDescriptionChange = (projIndex, descIndex, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projIndex].descriptions[descIndex] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleCertChange = (index, field, value) => {
    const updatedCerts = [...formData.certifications];
    updatedCerts[index][field] = value;
    setFormData({ ...formData, certifications: updatedCerts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("template_name", "template1.docx"); // Ensure template name is included

    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "string") {
        formDataToSend.append(key, formData[key]);
      }
    });

    formData.projects.forEach((project, index) => {
      formDataToSend.append(`project${index + 1}_title`, project.title);
      project.descriptions.forEach((desc, descIndex) => {
        formDataToSend.append(`project${index + 1}_desc${descIndex + 1}`, desc);
      });
    });

    formData.certifications.forEach((cert, index) => {
      formDataToSend.append(`cert${index + 1}_name`, cert.name);
      formDataToSend.append(`cert${index + 1}_where`, cert.completedAt);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-resume/", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Updated_Resume.docx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error("Error in response:", response.statusText);
      }
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  const handleClick = () => {
    navigate("/download");  
  };


  return (
    <div className="all-f">
      <div className="form-container">
        <h1 className="form-title">Build Your Professional Resume</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="hidden" name="template_name" value="template1.docx" />

          <div className="form-section">
            <h2>Personal Information</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
            <div className="grid-2">
              <input type="email" name="email" placeholder="Email" onChange={handleChange} />
              <input type="text" name="github" placeholder="GitHub" onChange={handleChange} />
            </div>
            <div className="grid-2">
              <input type="text" name="linkedin" placeholder="LinkedIn" onChange={handleChange} />
              <input type="text" name="portfolio" placeholder="Portfolio (if any)" onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <h2>Summary</h2>
            <textarea className="txta" name="summary" placeholder="Write a brief summary..." onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <h2>Education</h2>
            <input type="text" name="collegeName" placeholder="College Name" onChange={handleChange} />
            <input type="text" className="cd" name="collegeAddress" placeholder="College Address" onChange={handleChange} />
            <div className="grid-2">
              <input type="text" name="degree" placeholder="Degree" onChange={handleChange} />
              <input type="text" name="passingYear" placeholder="Year of Passing" onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <h2>Skills</h2>
            <input className="s1" type="text" name="programmingLanguages" placeholder="Programming Languages" onChange={handleChange} />
            <input className="s2" type="text" name="toolsTechnologies" placeholder="Tools & Technologies" onChange={handleChange} />
            <input type="text" name="librariesFrameworks" placeholder="Libraries & Frameworks" onChange={handleChange} />
          </div>

          <div className="form-section">
            <h2>Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="project-block">
                <input
                  type="text"
                  placeholder={`Project ${index + 1} Title`}
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                />
                {project.descriptions.map((desc, descIndex) => (
                  <input
                    key={descIndex}
                    type="text"
                    placeholder={`Description ${descIndex + 1}`}
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value)}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="form-section">
            <h2>Certifications</h2>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="grid-2">
                <input
                  type="text"
                  placeholder={`Certification ${index + 1}`}
                  value={cert.name}
                  onChange={(e) => handleCertChange(index, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Where You Completed"
                  value={cert.completedAt}
                  onChange={(e) => handleCertChange(index, "completedAt", e.target.value)}
                />
              </div>
            ))}
          </div>

          <button onClick={handleClick} className="submit-btn" type="submit" >
            Generate Resume
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forms;

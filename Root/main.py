from fastapi import FastAPI, Form , Query
from fastapi.responses import FileResponse
from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
import shutil
import os
from reportlab.pdfgen import canvas

app = FastAPI()

TEMPLATE_DIR = "templates"

DOCX_FILE = "resume.docx"
PDF_FILE = "resume.pdf"

@app.get("/download-resume/")
async def download_resume(format: str = Query(..., regex="^(docx|pdf)$")):
    """
    Endpoint to download resume in either DOCX or PDF format.
    """
    if format == "docx":
        file_path = DOCX_FILE
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    elif format == "pdf":
        # Convert DOCX to PDF if it doesn't exist
        if not os.path.exists(PDF_FILE):
            convert_docx_to_pdf(DOCX_FILE, PDF_FILE)
        file_path = PDF_FILE
        media_type = "application/pdf"
    else:
        return {"error": "Invalid format!"}

    return FileResponse(file_path, filename=f"updated_resume.{format}", media_type=media_type)


def convert_docx_to_pdf(docx_path, pdf_path):
    
    
    command = f'libreoffice --headless --convert-to pdf "{docx_path}" --outdir .'
    subprocess.run(command, shell=True, check=True)
    
   

@app.post("/generate-resume/")
async def generate_resume(
    template_name: str = Form(...),  
    name: str = Form(...),
    email: str = Form(...),
    github: str = Form(...),
    linkedin: str = Form(...),
    portfolio: str = Form(...),
    summary: str = Form(...),
    collegeName: str = Form(...),
    collegeAddress: str = Form(...),
    degree: str = Form(...),
    passingYear: str = Form(...),
    programmingLanguages: str = Form(...),
    toolsTechnologies: str = Form(...),
    librariesFrameworks: str = Form(...),
    project1_title: str = Form(...),
    project1_desc1: str = Form(...),
    project1_desc2: str = Form(...),
    project1_desc3: str = Form(...),
    project2_title: str = Form(...),
    project2_desc1: str = Form(...),
    project2_desc2: str = Form(...),
    project2_desc3: str = Form(...),
    cert1_name: str = Form(...),
    cert1_where: str = Form(...),
    cert2_name: str = Form(...),
    cert2_where: str = Form(...),
    cert3_name: str = Form(...),
    cert3_where: str = Form(...),

):
    # Construct template path
    template_path = os.path.join(TEMPLATE_DIR, template_name)

    # Check if the template exists
    if not os.path.exists(template_path):
        return {"error": f"Template '{template_name}' not found!"}

    # Output file
    output_path = "updated_resume.docx"

    # Copy the template to work on
    shutil.copy(template_path, output_path)
    doc = Document(output_path)
    contact_info = " | ".join(filter(None, [email, github, linkedin, portfolio]))
    # User data mapping
    user_data = {
        "{name}": name,
        "{email}": contact_info,
        "{summary}": summary,
        "{collegename}": collegeName,
        "{collegeadd}": collegeAddress,
        "{degree}": degree,
        "{year}": passingYear,
        "{programminglanguage}": programmingLanguages,
        "{toolsandtechnology}": toolsTechnologies,
        "{libraryandframework}": librariesFrameworks,
        "{project1}": project1_title,
        "{project1-description1}": project1_desc1,
        "{project1-description2}": project1_desc2,
        "{project1-description3}": project1_desc3,
        "{project2}": project2_title,
        "{project2-description1}": project2_desc1,
        "{project2-description2}": project2_desc2,
        "{project2-description3}": project2_desc3,
        "{certificate1-name}": cert1_name,
        "{where-c1}": cert1_where,
        "{certificate2-name}": cert2_name,
        "{where-c2}": cert2_where,
        "{certificate3-name}": cert3_name,
        "{where-c3}": cert3_where,
    }

    # Fields that should be bold & 11pt
    bold_11pt_keys = ["{collegename}", "{collegeadd}", "{project1}", "{project2}"]

        # Replace placeholders while preserving formatting
    for paragraph in doc.paragraphs:
        if "{certificate1-name}" in paragraph.text:
            print(f"Before: {paragraph.text}")  # Debugging

            # Replace the text in the entire paragraph
            paragraph.text = paragraph.text.replace("{certificate1-name}", user_data["{certificate1-name}"])
            paragraph.text = paragraph.text.replace("{where-c1}", user_data["{where-c1}"])
            for run in paragraph.runs:
                run.font.size = Pt(11)
            print(f"After: {paragraph.text}")  # Debugging
        if "{certificate3-name}" in paragraph.text:
            

            # Replace the text in the entire paragraph
            paragraph.text = paragraph.text.replace("{certificate3-name}", user_data["{certificate3-name}"])
            paragraph.text = paragraph.text.replace("{where-c3}", user_data["{where-c3}"])
            for run in paragraph.runs:
                run.font.size = Pt(11)
        if "{degree}" in paragraph.text:
            

            # Replace the text in the entire paragraph
            paragraph.text = paragraph.text.replace("{degree}", user_data["{degree}"])
            for run in paragraph.runs:
                run.font.size = Pt(11)
            
       


         
        for run in paragraph.runs:
            run_text = run.text  # Get the text from the run
            if "{certificate1-name}" in run.text:
                print(f"Found {run.text} in a separate run")

            for key, value in user_data.items():
                if key in run_text:
                    run.text = run_text.replace(key, value)  # Replace placeholder in run text

                    # Apply formatting for "{name}"
                    if key == "{name}":
                        run.bold = True
                        run.font.size = Pt(20)
                        paragraph.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
                    if key == "{email}":
                        run.font.size = Pt(11)
                        paragraph.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
                    
                       

                    # Apply formatting for bold 11pt keys
                    elif key in bold_11pt_keys:
                        run.bold = True
                        run.font.size = Pt(11)

    # Save the modified document
    doc.save(output_path)

    # Return the updated resume for download
    return FileResponse(output_path, filename="updated_resume.docx", media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")

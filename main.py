from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Resume Analyzer API Running"}

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):

    pdf_bytes = await file.read()

    doc = fitz.open(
        stream=pdf_bytes,
        filetype="pdf"
    )

    text = ""

    for page in doc:
        text += page.get_text()

    text = text.lower()

    keywords = [
        "python",
        "java",
        "c++",
        "javascript",
        "react",
        "node",
        "fastapi",
        "flask",
        "sql",
        "postgresql",
        "mongodb",
        "aws",
        "docker",
        "kubernetes",
        "git",
        "github",
        "machine learning",
        "deep learning",
        "tensorflow",
        "pytorch",
        "nlp",
        "computer vision"
    ]

    found = [
        keyword
        for keyword in keywords
        if keyword in text
    ]

    score = int(
        (len(found) / len(keywords)) * 100
    )

    missing = [
        keyword
        for keyword in keywords
        if keyword not in found
    ]

    return {
        "score": score,
        "found": found,
        "missing": missing
    }
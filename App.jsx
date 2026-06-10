import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!file) {
      alert("Please upload a PDF resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://ai-resume-analyzer-xjgn.onrender.com/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1>AI-Powered Resume Analyzer</h1>

        <p
          style={{
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Upload your resume PDF and receive an instant ATS-style skill analysis.
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />
        <br />

        <button
          onClick={analyze}
          disabled={loading}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div style={{ marginTop: "35px" }}>
            <div
              style={{
                background: "#eef4ff",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <h2>Resume Score: {result.score}/100</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div
                style={{
                  background: "#f4fff4",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h3>Skills Found</h3>

                <ul>
                  {result.found.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "#fff4f4",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h3>Missing Skills</h3>

                <ul>
                  {result.missing.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import { useState } from "react";
import MessageInput from "../components/MessageInput";
import AnalysisResult from "../components/AnalysisResult";
import LoadingSpinner from "../components/LoadingSpinner";
import { analyzeMessage } from "../services/aiService";
import "../index.css";

function AnalyzerPage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!message.trim()) {
      setError("Please enter a message first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeMessage(message);
      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to analyze the message. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (exampleMessage) => {
    setMessage(exampleMessage);
    setResult(null);
    setError("");
  };

  const handleClear = () => {
    setMessage("");
    setResult(null);
    setError("");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">R</div>

            <div>
              <h1>ReplyWise AI</h1>
              <p>Turn confusing messages into clear actions.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="main-container">
        <section className="hero-section">
          <span className="badge">AI Message Analyzer</span>

          <h2>
            Understand any message
            <br />
            <span>in seconds.</span>
          </h2>

          <p className="hero-description">
            Paste an email, notification, or message. ReplyWise AI extracts
            the important information and turns it into clear actions.
          </p>
        </section>

        <section className="analyzer-section">
          <MessageInput
            message={message}
            setMessage={setMessage}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
            disabled={loading}
          />

          <div className="examples-section">
            <p>Try an example:</p>

            <div className="example-buttons">
              <button
                type="button"
                onClick={() =>
                  handleExample(
                    "Your technical interview is scheduled for Thursday at 11:00 AM. Please carry a valid ID proof and your updated resume. Kindly confirm your availability."
                  )
                }
              >
                💼 Job Interview
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExample(
                    "Your electricity bill of ₹1,850 is due on September 20, 2026. Please make the payment before the due date to avoid late charges."
                  )
                }
              >
                💡 Electricity Bill
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExample(
                    "Your doctor appointment is confirmed for Monday at 4:30 PM. Please arrive 15 minutes early and bring your previous medical reports."
                  )
                }
              >
                🏥 Appointment
              </button>
            </div>
          </div>

          {loading && <LoadingSpinner />}

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {result && !loading && <AnalysisResult result={result} />}
        </section>
      </main>

      <footer className="footer">
        <p>
          ReplyWise AI · Built with React, Spring Boot & Local LLM
        </p>
      </footer>
    </div>
  );
}

export default AnalyzerPage;
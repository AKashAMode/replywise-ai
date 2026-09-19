import { useState } from "react";
import ResultCard from "./ResultCard";

function AnalysisResult({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopyReply = async () => {
    if (!result?.suggestedReply) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.suggestedReply);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toUpperCase()) {
      case "HIGH":
        return "priority-high";

      case "MEDIUM":
        return "priority-medium";

      case "LOW":
        return "priority-low";

      default:
        return "priority-medium";
    }
  };

  return (
    <section className="result-section">
      <div className="result-heading">
        <div>
          <span className="result-label">AI ANALYSIS</span>
          <h3>Here's what ReplyWise found</h3>
        </div>

        <div className="category-badge">
          {result?.category || "GENERAL"}
        </div>
      </div>

      <div className="result-grid">
        <ResultCard
          title="Summary"
          icon="📝"
          className="summary-card"
        >
          <p>{result?.summary || "No summary available."}</p>
        </ResultCard>

        <ResultCard
          title="Priority"
          icon="⚡"
          className={getPriorityClass(result?.priority)}
        >
          <span className="priority-text">
            {result?.priority || "MEDIUM"}
          </span>
        </ResultCard>

        <ResultCard
          title="Deadline"
          icon="⏰"
          className="deadline-card"
        >
          <p>
            {result?.deadline || "No deadline identified."}
          </p>
        </ResultCard>

        <ResultCard
          title="Action Items"
          icon="✅"
          className="actions-card"
        >
          {Array.isArray(result?.actions) &&
          result.actions.length > 0 ? (
            <ul className="action-list">
              {result.actions.map((action, index) => (
                <li key={`${action}-${index}`}>
                  <span className="check-icon">✓</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No specific actions identified.</p>
          )}
        </ResultCard>
      </div>

      <div className="reply-card">
        <div className="reply-header">
          <div>
            <span className="result-label">AI SUGGESTION</span>
            <h3>Suggested Reply</h3>
          </div>

          <button
            type="button"
            className="copy-button"
            onClick={handleCopyReply}
            disabled={!result?.suggestedReply}
          >
            {copied ? "✓ Copied" : "Copy Reply"}
          </button>
        </div>

        <div className="reply-content">
          <p>
            {result?.suggestedReply ||
              "No suggested reply was generated."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AnalysisResult;
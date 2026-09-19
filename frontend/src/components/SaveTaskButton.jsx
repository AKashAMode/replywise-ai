import { useState } from "react";
import "../index.css";

const STORAGE_KEY = "replywise_saved_tasks";

function SaveTaskButton({ analysis, originalMessage }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    try {
      
      const existingTasks =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

     
      const newTask = {
        id: crypto.randomUUID(),
        originalMessage,
        analysis,
        savedAt: new Date().toISOString(),
      };

      // Add the newest task at the beginning
      const updatedTasks = [
        newTask,
        ...existingTasks,
      ];

      // Save updated list back to localStorage
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedTasks)
      );

      setSaved(true);

    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={saved}
      className="save-task-button"
    >
      {saved ? "✓ Saved" : "🔖 Save Task"}
    </button>
  );
}

export default SaveTaskButton;
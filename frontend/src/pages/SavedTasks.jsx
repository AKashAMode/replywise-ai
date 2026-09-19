import { useEffect, useState } from "react";
import "../index.css";

const STORAGE_KEY = "replywise_saved_tasks";

function SavedTasks() {
  const [savedTasks, setSavedTasks] = useState([]);

  useEffect(() => {
    loadSavedTasks();
  }, []);

  const loadSavedTasks = () => {
    try {
      const tasks =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      setSavedTasks(tasks);

    } catch (error) {
      console.error(
        "Failed to load saved tasks:",
        error
      );

      setSavedTasks([]);
    }
  };

  const handleDelete = (id) => {
    const updatedTasks = savedTasks.filter(
      (task) => task.id !== id
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedTasks)
    );

    setSavedTasks(updatedTasks);
  };

  return (
    <div className="saved-tasks-page">

      <h1>Saved Tasks</h1>

      {savedTasks.length === 0 ? (
        <p>
          No saved tasks yet.
        </p>
      ) : (
        <div className="saved-tasks-list">

          {savedTasks.map((task) => (

            <div
              key={task.id}
              className="saved-task-card"
            >

              <div className="saved-task-header">

                <span>
                  {task.analysis.category}
                </span>

                <span>
                  {task.analysis.priority}
                </span>

              </div>

              <h3>
                {task.analysis.summary}
              </h3>

              <p>
                <strong>Deadline:</strong>{" "}
                {task.analysis.deadline ||
                  "No deadline"}
              </p>

              <div>
                <strong>Actions:</strong>

                {task.analysis.actions?.length ? (
                  <ul>
                    {task.analysis.actions.map(
                      (action, index) => (
                        <li key={index}>
                          {action}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>No specific actions</p>
                )}
              </div>

              <p>
                <strong>Suggested Reply:</strong>
                <br />
                {task.analysis.suggestedReply}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleDelete(task.id)
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default SavedTasks;
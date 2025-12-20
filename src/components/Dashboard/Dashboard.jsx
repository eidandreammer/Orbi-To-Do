import React, { useState } from "react";
import { Alert } from "antd";

function Dashboard({ user }) {
  // Track the task text typed by the user
  const [task, setTask] = useState("");
  // Centralize which alert banners should be visible
  const [alerts, setAlerts] = useState({
    cmpInc: false,
    badTask: false,
    badServer: false,
    addTask: false,
  });

  // Auto-dismiss any active alert after a short delay
  function timer() {
    setTimeout(() => {
      setAlerts((alerts) => ({
        ...alerts,
        cmpInc: false,
        badTask: false,
        badServer: false,
        addTask: false,
      }));
    }, 5000);
  }

  // Submit a new task for the current user
  async function newTask() {
    // Guard: require a non-empty task before calling the API
    if (!task.trim()) {
      setAlerts((alerts) => ({ ...alerts, cmpInc: true }));
      timer();
      return;
    }

    // Bundle the payload expected by the backend
    const data = { user, task };

    try {
      // Send the new task to the server
      const res = await fetch("http://localhost:3000/api/dashboard", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Parse the server response
      const result = await res.json();
      // Show a specific warning when the database rejects the task
      if (!result.success) {
        if (result.message === "Task can't be added") {
          setAlerts((alerts) => ({
            ...alerts,
            badTask: true,
            cmpInc: false,
            addTask: false,
          }));
          timer();
          return;
        }

        // Generic server-side failure
        setAlerts((alerts) => ({
          ...alerts,
          badServer: true,
          badTask: false,
          cmpInc: false,
        }));
        timer();
        return;
      }

      // Confirm to the user that the task was added successfully
      setAlerts((alerts) => ({
        ...alerts,
        addTask: true,
        badServer: false,
        badServer: false,
      }));
      timer();
    } catch (error) {
      // Swallow unexpected errors to avoid crashing the UI
    }
  }
  return (
    <div>
      <div className="containerDashboard">
        {/* Brand header for the dashboard */}
        <img className="logo" src="/img/OrbiNombre.png" />
        <form className="dashboardForm">
          <div className="input-group">
            <input
              autoComplete="off"
              name="task"
              className="dashboardInput"
              type="task"
              placeholder="New task"
              onChange={(e) => {
                // Track every keystroke in the local task state
                setTask(e.target.value);
              }}
            />
            <button
              className="dashboardButton"
              onClick={(e) => {
                // Prevent form submission from refreshing the page
                e.preventDefault();
                // Trigger the creation of a new task
                newTask();
              }}
            >
              Add
            </button>
          </div>
        </form>
        <div className="dashboardAlertsContainer">
          <div className="dashboardAlertsContainer">
            {alerts.cmpInc && (
              <Alert
                className="dashboardAlerts"
                title="Incomplete fields"
                type="warning"
              />
            )}
          </div>
        </div>
        <div className="tasks">
          <div className="pendingTask">
            <h1>Pending task</h1>
            {/* Pending task list would be rendered here */}
          </div>
          <div className="completedTask">
            <h1>Completed task</h1>
            {/* Completed task list would be rendered here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

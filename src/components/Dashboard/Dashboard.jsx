import React from "react";

function PrincipalPanel() {
  return (
    <div>
      <div className="containerDashboard">
        <img className="logo" src="/img/OrbiNombre.png" />
        <form className="dashboardForm">
          <div className="input-group">
            <input
              autoComplete="off"
              name="task"
              className="dashboardInput"
              type="task"
              placeholder="New task"
            />
            <button className="dashboardButton">Add</button>
          </div>
        </form>

        <div className="tasks">
          <div className="pendingTask">
            <h1>Pending task</h1>
          </div>
          <div className="completedTask">
            <h1>Completed task</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrincipalPanel;

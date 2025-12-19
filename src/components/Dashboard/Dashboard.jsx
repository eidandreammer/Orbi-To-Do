import React, { useState } from "react";
import { Alert } from "antd";

function PrincipalPanel() {
  const [task, setTask] = useState("");
  const [alerts, setAlerts] = useState({
    cmpInc: false,
  });

  function inpTask(e) {
    setTask(e.target.value);
  }

  function timer() {
    setTimeout(() => {
      setAlerts((alerts) => ({ ...alerts, cmpInc: false }));
    }, 5000);
  }
 
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
              onChange={(e) => {
                inpTask(e);
              }}
            />
            <button className="dashboardButton">Add</button>
          </div>
        </form>
        {alerts && <Alert type="warning" title="Enter a new task" />}
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

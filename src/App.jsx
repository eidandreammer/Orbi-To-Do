import React from "react";
import Login from "./components/Login/Login";
import "antd/dist/reset.css";
import "./App.css";

import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  // Root component that decides which feature component to show
  return (
    <div className="card">
      {/* Render dashboard directly with a hardcoded user for now */}
      <Dashboard user="Leslie" />
    </div>
  );
}
export default App;

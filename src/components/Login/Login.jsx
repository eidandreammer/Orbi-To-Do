import React, { useState } from "react";
import { Alert } from "antd";
import Register from "../Register/Register";
import Forgot from "../Forgot/Forgot";

function Login() {
  // Store the username typed into the login form
  const [users, setUsers] = useState("");
  // Store the password typed into the login form
  const [password, setPassword] = useState("");
  // Track which alert banners should be visible
  const [alerts, setAlerts] = useState({
    cmpInc: false, // Missing username or password
    problem: false, // Invalid credentials
    login: false, // Successful login
    error: false, // Request error
  });

  // Hide alerts automatically after a few seconds
  function timer() {
    setTimeout(() => {
      setAlerts((alerts) => ({
        ...alerts,
        cmpInc: false,
        problem: false,
        login: false,
        error: false,
      }));
    }, 5000);
  }

  // Sync username input with local state
  function inpUser(e) {
    setUsers(e.target.value);
  }

  // Sync password input with local state
  function inpPassword(e) {
    setPassword(e.target.value);
  }

  // Submit login credentials and show result feedback
  async function login() {
    // Guard: both fields must be filled before submitting
    if (!users || !password) {
      setAlerts((alerts) => ({ ...alerts, cmpInc: true }));
      timer();
      return;
    }

    const data = { users, password };

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      // If backend rejects credentials, show error banner
      if (!result.success) {
        setAlerts((alerts) => ({ ...alerts, problem: true, cmpInc: false }));
        timer();
        return;
      }

      // Successful login shows success alert
      setAlerts((alerts) => ({ ...alerts, login: true, problem: false }));
      timer();
    } catch (error) {
      // Network or server error during login
      console.log("Error starting session", error);
      setAlerts((alerts) => ({ ...alerts, error: true, login: false }));
      timer();
    }
  }

  // Control whether we show the login form, register form, or password recovery flow
  const [register, setRegister] = useState(true);
  const [pass, setPass] = useState(true);

  return (
    <div>
      {/* When pass is true, render either login or register */}
      {pass && (
        <div>
          {/* Show the login form while register toggle is on */}
          {register && (
            <div className="container">
              <img className="logo" src="/img/OrbiNombre.png" />

              <div className="form">
                <h1>Login</h1>

                <form>
                  <input
                    type="text"
                    name="text"
                    className="input"
                    placeholder="Username"
                    onChange={(e) => inpUser(e)}
                  />
                  <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                    onChange={(e) => inpPassword(e)}
                  />
                  {/* Alert: missing fields */}
                  {alerts.cmpInc && (
                    <Alert
                      className="alerts"
                      title="Incomplete fields"
                      type="warning"
                    />
                  )}
                  {/* Alert: wrong credentials */}
                  {alerts.problem && (
                    <Alert
                      className="alerts"
                      title="Incorrect username or password"
                      type="error"
                    />
                  )}
                  {/* Alert: login success */}
                  {alerts.login && (
                    <Alert
                      className="alerts"
                      title="Login successful"
                      type="success"
                    />
                  )}
                  {/* Alert: request error */}
                  {alerts.error && (
                    <Alert
                      className="alerts"
                      title="Error during login"
                      type="error"
                    />
                  )}
                  <div className="fgtpsw">
                    <p>
                      <a
                        href="###"
                        onClick={() => {
                          setPass(!pass);
                        }}
                      >
                        Forgot your password?
                      </a>
                    </p>
                  </div>

                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => {
                        login();
                      }}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegister(!register)}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* When register is false, show the Register component */}
          {!register && <Register />}
        </div>
      )}
      {/* When pass is false, render the Forgot password component */}
      {!pass && <Forgot />}
    </div>
  );
}

export default Login;

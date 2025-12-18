import React, { useState } from "react";
import Login from "../Login/Login";
import { Alert } from "antd";

function Forgot() {
  const [email, setEmail] = useState("");
  const [view, setView] = useState(true);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [show, setShow] = useState(true);

  const [alerts, setAlerts] = useState({
    email: false,
    noUsed: false,
    used: false,
    emailError: false,
    cmpInc: false,
    diferent: false,
    problem: false,
    change: false,
    error: false,
  });

  function timer() {
    setTimeout(() => {
      setAlerts((alerts) => ({
        ...alerts,
        email: false,
        noUsed: false,
        emailError: false,
        used: false,
        cmpInc: false,
        diferent: false,
        problem: false,
        change: false,
        error: false,
      }));
    }, 5000);
  }

  function inpEmail(e) {
    setEmail(e.target.value);
  }

  async function validate() {
    if (!email) {
      function validation1() {
        setAlerts((alerts) => ({ ...alerts, email: true }));
        timer();
      }
      return validation1();
    }
    const data = { email };
    try {
      const res = await fetch("http://localhost:3000/api/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        function validation4() {
          setAlerts((alerts) => ({ ...alerts, noUsed: true, email: false }));
          timer();
        }
        return validation4();
      }

      function pass() {
        setView(!view);
      }

      function validation5() {
        setAlerts((alerts) => ({ ...alerts, used: true, noUsed: false }));
        timer();
        pass();
      }

      validation5();
    } catch (error) {
      setAlerts((alerts) => ({ ...alerts, emailError: true, used: false }));
      timer();
    }
  }

  function inpPass1(e) {
    setPass1(e.target.value);
  }

  function inpPass2(e) {
    setPass2(e.target.value);
  }

  async function changePass() {
    const data = { pass1, email };

    if (!pass1 || !pass2) {
      function validation2() {
        setAlerts((alerts) => ({ ...alerts, cmpInc: true }));
        timer();
        return;
      }

      return validation2();
    } else if (pass2 != pass1) {
      setAlerts((alerts) => ({ ...alerts, diferent: true, cmpInc: false }));
      timer();
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/pass", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!result.success) {
        function validation3() {
          setAlerts((alerts) => ({
            ...alerts,
            problem: true,
            diferent: false,
          }));
          timer();
        }

        return validation3();
      }

      setAlerts((alerts) => ({ ...alerts, change: true, problem: false }));
      timer();
      function pass() {
        setShow(!show);
      }
      pass();
    } catch (error) {
      setAlerts((alerts) => ({ ...alerts, error: true, change: false }));
      timer();
    }
  }

  const [logg, setLogg] = useState(true);
  function login() {
    setLogg(!logg);
  }
  return (
    <div>
      {logg && (
        <div>
          {show && (
            <div className="container">
              <img className="logo" src="/img/OrbiNombre.png" />

              <div className="form">
                {view ? <h1>Registered email</h1> : <h1>Change password</h1>}
                <form>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email address"
                    onChange={(e) => inpEmail(e)}
                  />
                  {alerts.email && (
                    <Alert
                      className="alerts"
                      type="warning"
                      title="Incomplete field"
                    />
                  )}
                  {alerts.noUsed && (
                    <Alert
                      className="alerts"
                      type="warning"
                      title="Email is not used"
                    />
                  )}
                  {alerts.emailError && (
                    <Alert
                      className="alerts"
                      type="error"
                      title="Server-Side error"
                    />
                  )}
                  {view && (
                    <div className="buttons">
                      <button onClick={() => login()}>Login</button>
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          validate();
                        }}
                      >
                        Send
                      </button>
                    </div>
                  )}
                  {!view && (
                    <div className="psw">
                      <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="New password"
                        onChange={(e) => inpPass1(e)}
                      />
                      <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Confirm password"
                        onChange={(e) => inpPass2(e)}
                      />

                      {alerts.used && (
                        <Alert
                          className="alerts"
                          type="success"
                          title="Correct email"
                        />
                      )}
                      {alerts.cmpInc && (
                        <Alert
                          className="alerts"
                          type="warning"
                          title="Incomplete fields"
                        />
                      )}
                      {alerts.diferent && (
                        <Alert
                          className="alerts"
                          type="error"
                          title="Different password"
                        />
                      )}
                      {alerts.problem && (
                        <Alert
                          className="alerts"
                          type="error"
                          title="Problem with change the password"
                        />
                      )}
                      {alerts.change && (
                        <Alert
                          className="alerts"
                          type="success"
                          title="Password chaged"
                        />
                      )}
                      {alerts.error && (
                        <Alert
                          className="alerts"
                          type="error"
                          title="Server-Side error"
                        />
                      )}

                      <div className="buttons">
                        <button
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            changePass();
                          }}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
          {!show && <Login />}
        </div>
      )}
      {!logg && <Login />}
    </div>
  );
}

export default Forgot;

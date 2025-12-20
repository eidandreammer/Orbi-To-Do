import React, { useState } from "react";
import Register from "../Register/Register";
import Forgot from "../Forgot/Forgot";
import Dashboard from "../Dashboard/Dashboard";
import { Alert } from "antd";

function Login() {
  //Aqui es donde se va a almacenar cada dato del formulario
  const [users, setUsers] = useState("");
  const [password, setPassword] = useState("");
  // Controla si se muestra la vista de registro o la de login
  const [register, setRegister] = useState(true);
  // Controla si se muestra la vista de olvido de contraseña
  const [pass, setPass] = useState(true);
  // Controla si se muestra la pantalla principal o el dashboard
  const [principal, setPrincipal] = useState(true);

  // Banderas para los diferentes avisos en pantalla
  const [alerts, setAlerts] = useState({
    cmpInc: false,
    problem: false,
    login: false,
    error: false,
  });

  // Oculta todas las alertas después de un tiempo para limpiar la UI
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
  //Aqui es en donde se declara la funcion para llamarla y se actualice
  //el valor de cada estado con el contenido del input

  // Actualiza el usuario a medida que se escribe
  function inpUser(e) {
    setUsers(e.target.value);
  }

  // Actualiza la contraseña a medida que se escribe
  function inpPassword(e) {
    setPassword(e.target.value);
  }

  // Alterna la vista principal entre login y dashboard
  function logged() {
    setPrincipal(!principal);
  }

  // Valida el formulario y hace la petición de inicio de sesión
  async function login() {
    // Verifica que ambos campos tengan datos antes de continuar
    if (!users.trim() || !password.trim()) {
      setAlerts((alerts) => ({ ...alerts, cmpInc: true }));
      timer();
      return;
    }

    // Prepara el cuerpo para enviarlo al backend
    const data = { users, password };

    try {
      // Envía la solicitud de inicio de sesión
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Procesa la respuesta del servidor
      const result = await res.json();
      // Si las credenciales son incorrectas, muestra un aviso
      if (!result.success) {
        setAlerts((alerts) => ({ ...alerts, problem: true, cmpInc: false }));
        timer();
        return;
      }

      // Cuando el login es exitoso se informa y se entra al dashboard
      setAlerts((alerts) => ({ ...alerts, login: true, problem: false }));
      timer();
      logged();
    } catch (error) {
      console.log("Error al iniciar seccion", error);
      // Muestra error si la petición falla por red o servidor
      setAlerts((alerts) => ({ ...alerts, error: true, login: false }));
      timer();
    }
  }

  return (
    <div>
      {principal && (
        <div>
          {pass && (
            <div>
              {register && (
                // Formulario principal de inicio de sesión
                <div className="container">
                  <img className="logo" src="/img/OrbiNombre.png" />

                  <div className="form">
                    <h1>Login</h1>

                    <form>
                      <input
                        type="text"
                        name="text"
                        className="input"
                        placeholder="User"
                        onChange={(e) => inpUser(e)}
                      />
                      <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        onChange={(e) => inpPassword(e)}
                      />
                      {alerts.cmpInc && (
                        <Alert
                          className="alerts"
                          title="Campos incompletos"
                          type="warning"
                        />
                      )}
                      {alerts.problem && (
                        <Alert
                          className="alerts"
                          title="Usuario o contrasena Incorrecta"
                          type="error"
                        />
                      )}
                      {alerts.login && (
                        <Alert
                          className="alerts"
                          title="Inicio de seccion exitoso"
                          type="success"
                        />
                      )}
                      {alerts.error && (
                        <Alert
                          className="alerts"
                          title="Error al iniciar seccion"
                          type="error"
                        />
                      )}
                    <div className="fgtpsw">
                      <p>
                        <a
                          href="###"
                          onClick={() => {
                            // Cambia a la vista de recuperación de contraseña
                            setPass(!pass);
                          }}
                        >
                          Forgot your password?
                        </a>
                        </p>
                      </div>

                      <div className="buttons">
                        <button
                          className="formButton"
                          type="button"
                          onClick={() => {
                            // Dispara el proceso de login
                            login();
                          }}
                        >
                          Login
                        </button>
                        <button
                          className="formButton"
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

              {/* Muestra el formulario de registro cuando register es falso */}
              {!register && <Register />}
            </div>
          )}
          {/* Flujo de recuperación de contraseña */}
          {!pass && <Forgot />}
        </div>
      )}
      {/* Dashboard se muestra cuando principal es false */}
      {!principal && <Dashboard user={users} />}
    </div>
  );
}

export default Login;

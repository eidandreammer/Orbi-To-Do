import React, { useState } from "react";
import "./Registro.css";
import { Alert } from "antd";

function Registro() {
  //Aqui es donde se va a almacenar cada dato del formulario
  const [users, setUsers] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //Aqui es en donde se declara la funcion para llamarla y se actualice
  //el valor de cada estado con el contenido del input

  function inpUser(e) {
    setUsers(e.target.value);
  }

  function inpPassword(e) {
    setPassword(e.target.value);
  }

  function inpEmail(e) {
    setEmail(e.target.value);
  }

  //En esta funcion se usa el handleSubmit(e) para hacerlos default siempre,
  //es decir, no se recarge el formulario siempre
  async function handleSubmit(e) {
    e.preventDefault();
    await register();
  }

  async function register() {
    //Evaluamos si alguna de los estados no esta definido y si es asi se indica
    //que existen datos incompletos
    if (!users || !password || !email) {
      return alert("Campos incompletos");
    }
    const data = { users, password, email }; //se declaran las variables como objetos

    try {
      // se inicia el manejo de errores del lado del servidor en caso de que haya
      //algun error de parte de este
      const res = await fetch("http://localhost:3000/api/register", {
        //Aqui
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      alert("Usuario registrado con exito");
      const result = await res.json();
      console.log("Respuesta del servidor" + result);
    } catch (error) {
      alert("Error al enviar los datos");
      console.error("Error al enviar los datos" + error);
    }
  }
  return (
    <div className="card">
      <h1>User's form</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            className="input"
            placeholder="Name"
            onChange={(e) => inpUser(e)}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={(e) => inpPassword(e)}
          />

          <input
            id="email"
            type="email"
            name="email"
            className="input"
            placeholder="Email address"
            onChange={(e) => inpEmail(e)}
          />

          <div className="buttons">
            <button type="button">Sign In</button>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;

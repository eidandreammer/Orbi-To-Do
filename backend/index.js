//Importar librerias
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // <-- OJO: Pool con P mayúscula

//Crear la app de express
const app = express();

//Configuracion basica
const port = 3000;

//Middlewares
app.use(cors()); //Permite que react pueda llamar a este servidor
app.use(express.json()); //Permite leer JSON en req.body

//Configurar conexion a PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "registro",
  password: "0000",
  port: 5432,
});

//Ruta de read (Obtener todos los items)
//Get /api/items
app.post("/api/register", async (req, res) => {
  const { users, password, email } = req.body;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *",
      [users, password, email]
    );

    res.status(200).json({
      success: true,
      user: newUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
    });
    console.log("Error al registrar usuario");
  }
});

app.post("/api/login", async (req, res) => {
  const { users, password, email } = req.body;

  try {
    const login = await pool.query(
      "SELECT FROM users WHERE name = $1 AND password = $2",
      [users, password]
    );

    if (login.rows.length > 0) {
      return res.status(201).json({
        success: true,
        data: login.rows[0],
      });
    }

    res.status(404).json({
      success: false,
      message: "Usuario no encontrado",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error de lado del servidor",
    });
  }
});

//El servidor esta escuchando
app.listen(port, () => {
  console.log("El servidor esta escuchando en el puerto " + port);
});

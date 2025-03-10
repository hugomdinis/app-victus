const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hugo1234QWERTY",
  database: "victusapp",
});


db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

// Rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // 🔹 Debug: Verificar se os dados estão a chegar corretamente
  console.log("Dados recebidos:", { email, senha });

  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos!" });
  }

  const query = "SELECT cli_id FROM clients WHERE cli_email = ? AND cli_password = ?";
  db.query(query, [email, senha], (err, result) => {
    if (err) {
      console.error("Erro na query SQL:", err);
      return res.status(500).json({ sucesso: false, mensagem: "Erro no servidor" });
    }

    console.log("Resultado da busca:", result);

    if (result.length > 0) {
      res.json({ sucesso: true, mensagem: "Login bem-sucedido" });
    } else {
      res.json({ sucesso: false, mensagem: "Credenciais inválidas" });
    }
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor roda na porta 3000");
});

// Importando as bibliotecas necessárias
const express = require("express");  // Framework para criar o servidor web
const mysql = require("mysql2");    // Biblioteca para conectar ao MySQL
const cors = require("cors");      // Middleware para permitir requisições de diferentes origens
const bodyParser = require("body-parser");  // Middleware para analisar o corpo da requisição (JSON)

// Criando a instância do aplicativo Express
const app = express();

// Utilizar os middlewares que foram importados
app.use(cors());  // Permite que o servidor aceite requisições de qualquer origem
app.use(bodyParser.json());  // Configura o Express para tratar os dados em JSON nas requisições

// Conexão com a base de dados MySQL
const db = mysql.createConnection({
  host: "localhost",      // Endereço do servidor
  user: "root",          // Utiliador da base de dados
  password: "hugo1234QWERTY",  // Senha do utilizador
  database: "victusapp",  // Nome da base de dados
});

// Conectar a base de dados
db.connect((err) => {
  if (err) {  //Caso ocorra algum erro na conexão
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");  //Mensagem de sucesso na conexão
});

//Login
app.post("/login", (req, res) => {
  //Extrair os dados do email e a senha
  const { email, senha } = req.body;

  // Verificar se ambos os campos foram preenchidos
  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos!" });
  }

  // Query SQL para buscar o cliente com o email e senha fornecidos
  const query = "SELECT cli_id FROM clients WHERE cli_email = ? AND cli_password = ?";
  db.query(query, [email, senha], (err, result) => {
    if (err) {  // Caso ocorra erro na consulta imprime a msg de erro
      console.error("Erro na query SQL:", err);
      return res.status(500).json({ sucesso: false, mensagem: "Erro no servidor" });
    }

    // Verificar o resultado da consulta
    if (result.length > 0) {
      res.json({ sucesso: true, mensagem: "Login bem-sucedido" });  // Login bem-sucedido
    } else {
      res.json({ sucesso: false, mensagem: "Credenciais inválidas" });  // Credenciais incorretas
    }
  });
});

// Dashboard - Exibe os produtos subscritos por um cliente
app.get("/dashboard/:email", (req, res) => {
  const { email } = req.params;  // Capturar o email do cliente

  // Query SQL para buscar os produtos do cliente, associando clientes, subscrições e produtos
  const query = `
    SELECT p.prod_name, p.prod_desc
    FROM products p
    JOIN subscriptions s ON s.product_id = p.prod_id
    JOIN clients c ON c.cli_id = s.client_id
    WHERE c.cli_email = ?;
  `;

  db.query(query, [email], (err, result) => {
    if (err) {  // Caso ocorra erro na consulta a base de dados imprime a msg de erro
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar os produtos" });
    }

    // Verificar se algum produto foi encontrado
    if (result.length > 0) {
      return res.json({ sucesso: true, dados: result });  // Retorna os dados dos produtos
    } else {
      return res.json({ sucesso: false, mensagem: "Nenhuma subscrição encontrada para este cliente" });  // Nenhum produto encontrado
    }
  });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor roda na porta 3000");  // Mensagem indicando que o servidor está em execução
});

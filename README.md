# Expo Router App - Guia de Instalação e Uso

Este é um projeto desenvolvido com [Expo](https://expo.dev) e [React Native](https://reactnative.dev/). Ele inclui um backend em PHP para autenticação e comunicação com um servidor.

## Pré-requisitos

Antes de começar, certifica-te de ter instalado:

- [Node.js](https://nodejs.org/) e npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [PHP](https://www.php.net/downloads)
- Composer (caso o backend use dependências externas)

## Instalação

1. Instalar as dependências do projeto:
   ```bash
   npm install
   ```

2. Instalar as dependências do backend:
   ```bash
   cd backend
   composer install
   ```

## Execução do Projeto

1. Iniciar a aplicação Expo:
   ```bash
   npx expo start
   ```

2. Iniciar o servidor Node.js :
   ```bash
   node server.js
   ```

3. Iniciar o servidor PHP:
   ```bash
   php -S 0.0.0.0:3000 -t backend/api
   ```

## Possíveis Erros e Soluções

### 1. Erro `vendor/autoload.php` não encontrado
Se ao iniciar o servidor PHP aparecer um erro relacionado ao `vendor/autoload.php`, corre o seguinte comando:
```bash
cd backend
composer install
```


### 2. Erro de conexão ao backend
Se a aplicação React Native não conseguir conectar ao backend, verifica se está a usar `http://10.0.2.2:3000` para emuladores Android ou `http://localhost:3000` no browser.

### 3. Erro `404 - No such file or directory`
Está me sempre a dar este erro e nao consigo corrigi-lo, já tentei várias soluções e nenhuma funcionou.


# Configurar servidor mysql localmente


Criar um conexao local com 
host:localhost 
e dar o nome a uma nova base de dados chamada 
database: victusapp 
utilizador: root 
passe: hugo1234QWERTY



## Escolher a base de dados Usar a database

```bash
USE victusapp;
```

## 1. Criar a tabela

```bash
CREATE TABLE clientes (
    cli_id INT AUTO_INCREMENT PRIMARY KEY,
    cli_name VARCHAR(100) NOT NULL,
    cli_email VARCHAR(100) UNIQUE NOT NULL,
    cli_cellphone VARCHAR(20),
    cli_password VARCHAR(255) NOT NULL,
    cli_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 2. Excluir a tabela (caso precise reiniciar)

```bash
DROP TABLE IF EXISTS clientes;
```

## 3. Inserir 10 registros na tabela

```bash
INSERT INTO clientes (cli_name, cli_email, cli_cellphone, cli_password) VALUES
('Carlos Silva', 'carlos.silva@email.com', '912345678', 'senha123'),
('Ana Souza', 'ana.souza@email.com', '923456789', 'senha456'),
('Bruno Rocha', 'bruno.rocha@email.com', '934567890', 'senha789'),
('Mariana Costa', 'mariana.costa@email.com', '945678901', 'senhaabc'),
('Fernando Lima', 'fernando.lima@email.com', '956789012', 'senhadef'),
('Laura Mendes', 'laura.mendes@email.com', '967890123', 'senhaghi'),
('Rafael Alves', 'rafael.alves@email.com', '978901234', 'senhajkl'),
('Juliana Freitas', 'juliana.freitas@email.com', '989012345', 'senhamno'),
('Pedro Henrique', 'pedro.henrique@email.com', '990123456', 'senhapqr'),
('Gabriela Martins', 'gabriela.martins@email.com', '901234567', 'senhastu');
```

## 4 Verificar os registros inseridos

```bash
SELECT * FROM clientes;
```

## 5. Criar a tabela de produtos

```bash
CREATE TABLE produtos (
    prod_id INT AUTO_INCREMENT PRIMARY KEY,
    prod_name VARCHAR(100) NOT NULL,
    prod_desc TEXT,
    prod_price DECIMAL(10,2) NOT NULL,
    prod_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 6. Excluir a tabela de produtos (caso precise reiniciar)

```bash
DROP TABLE IF EXISTS produtos;
```

## 7. Inserir 10 registros na tabela de produtos

```bash
INSERT INTO produtos (prod_name, prod_desc, prod_price) VALUES
('Notebook Gamer', 'Notebook potente para jogos', 4500.00),
('Smartphone X', 'Celular de última geração', 3200.50),
('Fone Bluetooth', 'Fone sem fio com cancelamento de ruído', 599.99),
('Monitor 4K', 'Monitor UHD para designers e gamers', 2500.00),
('Teclado Mecânico', 'Teclado RGB para gamers', 399.90),
('Mouse Ergonômico', 'Mouse confortável para longas sessões', 199.99),
('Cadeira Gamer', 'Cadeira ajustável para conforto máximo', 1200.00),
('Impressora Multifuncional', 'Imprime, copia e digitaliza', 850.00),
('Tablet Pro', 'Tablet com caneta digital', 2800.00),
('HD Externo 1TB', 'Armazenamento portátil rápido', 450.00);
```

## 8. Verificar os registros inseridos na tabela de produtos

```bash
SELECT * FROM produtos;
```

## 9. Criar a tabela de subscrições

```bash
CREATE TABLE subscricoes (
    sub_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    product_id INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (client_id) REFERENCES clientes(cli_id),
    FOREIGN KEY (product_id) REFERENCES produtos(prod_id)
);
```

## 10. Excluir a tabela de subscrições

```bash
DROP TABLE IF EXISTS subscricoes;
```

## 11. Inserir 10 registros na tabela de subscriçõe

```bash
INSERT INTO subscricoes (client_id, product_id, start_date, end_date) VALUES
(1, 2, '2024-01-01', '2024-12-31'),
(2, 4, '2024-02-15', '2025-02-15'),
(3, 6, '2024-03-10', '2025-03-10'),
(4, 8, '2024-04-05', '2025-04-05'),
(5, 10, '2024-05-20', '2025-05-20'),
(6, 1, '2024-06-25', '2025-06-25'),
(7, 3, '2024-07-30', '2025-07-30'),
(8, 5, '2024-08-15', '2025-08-15'),
(9, 7, '2024-09-10', '2025-09-10'),
(10, 9, '2024-10-05', '2025-10-05');
```

## 12. Verificar os registros inseridos na tabela de subscrições

```bash
SELECT * FROM subscricoes;
```
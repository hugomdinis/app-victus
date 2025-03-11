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


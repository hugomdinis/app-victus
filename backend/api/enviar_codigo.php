<?php
// Inclui o autoload do Composer para carregar automaticamente as dependências do projeto
require __DIR__ . '/../vendor/autoload.php'; 

// Importa a classe ApiClient da biblioteca Whapi
use Whapi\ApiClient;
// Permite que qualquer origem aceda a este script (CORS)
header("Access-Control-Allow-Origin: *");
// Permite apenas requisições do tipo POST
header("Access-Control-Allow-Methods: POST");
// Define o tipo de conteúdo da resposta como JSON
header("Content-Type: application/json");

// Lê os dados enviados pelo cliente no formato JSON e converte para um array associativo
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se o campo 'telefone' foi enviado na requisição
if (!isset($data['telefone'])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Número de telefone obrigatório"]);
    exit; // Termina a execução do script
}

// Obtém o número de telefone do utilizador a partir dos dados recebidos
$telefone = $data['telefone'];
// Chave de API para autenticação no serviço Whapi
$apiKey = "4EZ7XWCd2QTP2PmL6wC3oZr2tuFH8jzt";
// Cria uma instância do cliente da API Whapi
$whapi = new ApiClient($apiKey);
// Gera um código de verificação aleatório de 6 dígitos
$codigo = rand(100000, 999999);
// Mensagem que será enviada para o número de telefone do utilizador via WhatsApp
$mensagem = "O seu código de verificação é: $codigo";
// Envia a mensagem através da API Whapi
$response = $whapi->sendTextMessage($telefone, $mensagem);

// Verifica se a mensagem foi enviada com sucesso
if ($response['success']) {
    // Guarda o código de verificação num ficheiro dentro da pasta 'codigos', usando o telefone como nome do ficheiro
    file_put_contents("codigos/$telefone.txt", $codigo);
    // Retorna uma resposta JSON indicando que o código foi enviado com sucesso
    echo json_encode(["sucesso" => true, "mensagem" => "Código enviado"]);
} else {
    // Retorna uma resposta JSON indicando que houve um erro ao enviar o código
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao enviar código"]);
}
?>

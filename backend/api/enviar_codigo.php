<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/vendor/autoload.php';

use OpenAPI\Client\Configuration;
use OpenAPI\Client\Api\MessagesApi;
use OpenAPI\Client\Model\SenderText;

// CORS handling
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // Config
    $config = Configuration::getDefaultConfiguration()
        ->setApiKey('Authorization', '4EZ7XWCd2QTP2PmL6wC3oZr2tuFH8jzt')
        ->setApiKeyPrefix('Authorization', 'Bearer')
        ->setSSLVerification(false); // Apenas para desenvolvimento!

    // API Instance
    $apiInstance = new MessagesApi(null, $config);

    // Input handling
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);
    
    if (!$data || !isset($data['telefone'])) {
        throw new Exception('Dados inválidos ou telefone ausente');
    }

    // Generate code
    $telefone = preg_replace('/[^0-9]/', '', $data['telefone']);
    $codigo = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

    // Create message
    $sender_text = new SenderText([
        'to' => $telefone,
        'body' => "Seu código de verificação é: $codigo",
        'ephemeral' => 3600,
        'view_once' => true,
        'typing_time' => 2.0,
        'no_link_preview' => false
    ]);

    // Send message
    $result = $apiInstance->sendMessageText($sender_text);

    // Save code (ensure directory exists)
    if (!file_exists('codigos')) {
        mkdir('codigos', 0755, true);
    }
    file_put_contents("codigos/$telefone.txt", $codigo);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Código enviado!",
        "detalhes" => $result
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro: " . $e->getMessage(),
        "trace" => $e->getTraceAsString() // Apenas para desenvolvimento
    ]);
}
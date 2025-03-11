<?php
// Exibir erros para depuração durante o desenvolvimento
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Carregar as dependências do Composer
require __DIR__ . '/vendor/autoload.php';

// Importar classes da API do OpenAPI Client
use OpenAPI\Client\Configuration;
use OpenAPI\Client\Api\MessagesApi;
use OpenAPI\Client\Model\SenderText;

// Configurar cabeçalhos para permitir requisições CORS 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Responder requisições OPTIONS (preflight do CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // Configuração da API (substituir a chave de API por uma segura)
    $config = Configuration::getDefaultConfiguration()
        ->setApiKey('Authorization', '4EZ7XWCd2QTP2PmL6wC3oZr2tuFH8jzt') // Chave de API
        ->setApiKeyPrefix('Authorization', 'Bearer') // Prefixo do token
        ->setSSLVerification(false); // Desativar verificação SSL (apenas para desenvolvimento!)

    // Criar uma instância da API de mensagens
    $apiInstance = new MessagesApi(null, $config);

    // Capturar e decodificar o JSON enviado na requisição
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);
    
    // Verificar se os dados recebidos são válidos e se o telefone foi enviado
    if (!$data || !isset($data['telefone'])) {
        throw new Exception('Dados inválidos ou telefone ausente');
    }

    // Limpar o número de telefone, removendo caracteres não numéricos
    $telefone = preg_replace('/[^0-9]/', '', $data['telefone']);

    // Gerar um código de verificação de 6 dígitos
    $codigo = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

    // Criar a mensagem a ser enviada via API
    $sender_text = new SenderText([
        'to' => $telefone, // Número de destino
        'body' => "Seu código de verificação é: $codigo", // Mensagem com código de verificação
        'ephemeral' => 3600, // Mensagem expira em 1 hora
        'view_once' => true, // Mensagem pode ser vista apenas uma vez
        'typing_time' => 10.0, // Simula o tempo de inserir em 10 segundos
        'no_link_preview' => false // Permitir pré-visualização de links, se houver
    ]);

    // Enviar a mensagem via API
    $result = $apiInstance->sendMessageText($sender_text);

    // Salvar o código de verificação em um arquivo separado por telefone
    if (!file_exists('codigos')) {
        mkdir('codigos', 0755, true); // Criar diretório se não existir
    }
    file_put_contents("codigos/$telefone.txt", $codigo); // Salvar código em arquivo

    // Responder com sucesso e detalhes da API
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Código enviado!",
        "detalhes" => $result
    ]);

} catch (Exception $e) {
    // Se ocorrer um erro, retornar uma resposta HTTP 500 e detalhes do erro
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro: " . $e->getMessage(),
        "trace" => $e->getTraceAsString() // Para depuração durante o desenvolvimento
    ]);
}

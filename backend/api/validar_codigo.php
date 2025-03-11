<?php
// Carregar as dependências do Composer (bibliotecas externas)
require __DIR__ . '/../vendor/autoload.php';

// Configuração dos cabeçalhos para permitir chamadas API de outros domínios (CORS)
header("Access-Control-Allow-Origin: *"); // Permitir acesso de qualquer origem
header("Access-Control-Allow-Methods: POST"); // Apenas requisições POST são permitidas
header("Content-Type: application/json"); // O formato da resposta será JSON
header("Access-Control-Allow-Headers: Content-Type"); // Definir os cabeçalhos permitidos

// Obter os dados enviados no corpo da requisição e convertê-los de JSON para array associativo
$data = json_decode(file_get_contents("php://input"), true);

// Verificar se os campos "telefone" e "codigo" foram enviados na requisição
if (!isset($data['telefone']) || !isset($data['codigo'])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos"]); // Responder com erro caso falte algum dado
    exit; // Terminar a execução do script
}

// Guardar o telefone e o código enviado pelo utilizador
$telefone = $data['telefone'];
$codigoDigitado = $data['codigo'];

// Definir o caminho do ficheiro onde o código foi guardado anteriormente
$arquivoCodigo = "codigos/$telefone.txt";

// Verificar se o ficheiro com o código de verificação existe
if (!file_exists($arquivoCodigo)) {
    echo json_encode(["sucesso" => false, "mensagem" => "Código expirado ou inválido"]); // Se não existir, o código pode ter expirado ou ser inválido
    exit;
}

// Ler o código guardado no ficheiro
$codigoSalvo = file_get_contents($arquivoCodigo);

// Comparar o código digitado pelo utilizador com o código guardado
if ($codigoDigitado === $codigoSalvo) {
    unlink($arquivoCodigo); // Se for válido, eliminar o ficheiro para evitar reutilização
    echo json_encode(["sucesso" => true, "mensagem" => "Código válido"]); // Responder com sucesso
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Código inválido"]); // Se os códigos não coincidirem, responder com erro
}
?>

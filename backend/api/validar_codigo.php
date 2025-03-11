<?php
// Permite que qualquer origem aceda a este script (CORS)
header("Access-Control-Allow-Origin: *");

// Permite apenas requisições do tipo POST
header("Access-Control-Allow-Methods: POST");

// Define o tipo de conteúdo como JSON
header("Content-Type: application/json");

// Lê os dados enviados pelo cliente no formato JSON e converte para um array associativo
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os dados obrigatórios (telefone e código) foram enviados
if (!isset($data['telefone']) || !isset($data['codigo'])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos"]);
    exit; // Termina a execução do script
}

// Obtém os valores do telefone e do código inserido pelo utilizador
$telefone = $data['telefone'];
$codigo_digitado = $data['codigo'];

// Verifica se existe um ficheiro com o código salvo para o número de telefone fornecido
$codigo_salvo = file_exists("codigos/$telefone.txt") ? file_get_contents("codigos/$telefone.txt") : null;

// Compara o código inserido pelo utilizador com o código armazenado no servidor
if ($codigo_digitado == $codigo_salvo) {
    echo json_encode(["sucesso" => true, "mensagem" => "Código válido"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Código incorreto"]);
}
?>

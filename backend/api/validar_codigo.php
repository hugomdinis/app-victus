<?php
require __DIR__ . '/../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['telefone']) || !isset($data['codigo'])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos"]);
    exit;
}

$telefone = $data['telefone'];
$codigoDigitado = $data['codigo'];
$arquivoCodigo = "codigos/$telefone.txt";

if (!file_exists($arquivoCodigo)) {
    echo json_encode(["sucesso" => false, "mensagem" => "Código expirado ou inválido"]);
    exit;
}

$codigoSalvo = file_get_contents($arquivoCodigo);

if ($codigoDigitado === $codigoSalvo) {
    unlink($arquivoCodigo); // Remove o código após validação
    echo json_encode(["sucesso" => true, "mensagem" => "Código válido"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Código inválido"]);
}
?>
import { useState } from "react"; 
import { View, Text, TextInput, Button, Alert } from "react-native"; // Componentes do React Native
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import { useRouter, useLocalSearchParams } from "expo-router"; 

// Componente da tela de verificação o telefone
export default function VerificationScreen() {
  const router = useRouter(); // Hook para manipular a navegação entre as telas
  const [telefone, setTelefone] = useState(""); // Estado para armazenar o telefone do usuário
  const [codigo, setCodigo] = useState(""); // Estado para armazenar o código recebido
  const [codigoEnviado, setCodigoEnviado] = useState(false); // Estado para controlar se o código foi enviado

  // Função para enviar o código de verificação via API
  const enviarCodigo = async () => {
    if (!telefone) {
      Alert.alert("Erro", "Digite o número de telefone!"); // Alerta caso o campo esteja vazio
      return;
    }

    try {
      // Faz a requisição para o backend enviando o telefone
      const response = await axios.post("http://10.0.2.2:3000/enviar_codigo.php", { telefone });

      if (response.data.sucesso) {
        Alert.alert("Sucesso", "Código enviado para o WhatsApp."); // Notifica o utilizador
        setCodigoEnviado(true); // Atualiza o estado para exibir o campo do código
      } else {
        Alert.alert("Erro", response.data.mensagem); // Exibe o erro retornado pelo backend
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar ao servidor."); // Erro de conexão
    }
  };

  //Função para validar o código inserido pelo utlizador
  const validarCodigo = async () => {
    if (!codigo) {
      Alert.alert("Erro", "Digite o código recebido!"); // Alerta caso o campo esteja vazio
      return;
    }

    try {
      // Faz a requisição para o backend enviando o telefone e o código inserido
      const response = await axios.post("http://10.0.2.2:3000/validar_codigo.php", { telefone, codigo });

      if (response.data.sucesso) {
        Alert.alert("Sucesso", "Código validado!"); // Notifica que a validação foi bem-sucedida
        router.push("/dashboard"); // Redireciona o utilizador para a tela de dashboard
      } else {
        Alert.alert("Erro", response.data.mensagem); // Exibe o erro retornado pelo backend
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar ao servidor."); // Erro de conexão
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Digite o número de telefone:</Text>
      <TextInput
        value={telefone} // Valor do campo do telefone
        onChangeText={setTelefone} // Atualiza o estado quando o utilzador escreve
        keyboardType="phone-pad" // Exibe o teclado numérico para facilitar a entrada
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Enviar Código" onPress={enviarCodigo} />

      {/* Exibe o campo para inserir o código, apenas se o código já foi enviado */}
      {codigoEnviado && (
        <>
          <Text>Digite o código recebido:</Text>
          <TextInput
            value={codigo} // Valor do campo de código
            onChangeText={setCodigo} // Atualiza o estado quando o utiliador esreve
            keyboardType="numeric" // Exibe o teclado numérico
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <Button title="Verificar Código" onPress={validarCodigo} />
        </>
      )}
    </View>
  );
}

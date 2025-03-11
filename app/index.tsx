import { useState } from "react"; 
import { View, Text, TextInput, Button, Alert } from "react-native"; 
import { useRouter } from "expo-router"; 

// Componente que representa a tela de login
export default function LoginScreen() {
  const router = useRouter(); // Hook para navegação entre telas
  const [email, setEmail] = useState(""); // Estado para armazenar o email inserido pelo utilizador
  const [senha, setSenha] = useState(""); // Estado para armazenar a senha inserido pelo utilizador

  // Função que é chamada quando o utilizador pressiona o botão "Entrar"
  const handleLogin = () => {
    // Verifica se os campos de email e senha foram preenchidos
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!"); // Exibe um alerta caso algum campo esteja vazio
      return;
    }

    // Redireciona o utilizador para a tela de verificação antes de finalizar o login
    router.push({
      pathname: "./verification", // Caminho para a tela de dasboard, para ir para a de verificacao é só alterar para ./verification, esta a dashboard pois a api nao esta a funcionar 
      params: { email }, // Passa o email como parâmetro para a próxima tela
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email} // O valor do input é controlado pelo estado 'email'
        onChangeText={setEmail} // Atualiza o estado 'email' quando o utilizador digita
        autoCapitalize="none" // Garante que o email não seja capitalizado automaticamente
        keyboardType="email-address" // Define o tipo de teclado para formato de email
        style={{ borderBottomWidth: 1, marginBottom: 10 }} // Estilo do campo de entrada
      />

      <Text>Senha:</Text>
      <TextInput
        value={senha} // O valor do input é controlado pelo estado 'senha'
        onChangeText={setSenha} // Atualiza o estado 'senha' quando o utilizador digita
        secureTextEntry // Oculta o texto inserido para proteger a senha
        style={{ borderBottomWidth: 1, marginBottom: 20 }} // Estilo do campo de entrada
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

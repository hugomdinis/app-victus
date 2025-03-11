import React, { useState } from "react"; 
import { View, Text, TextInput, Button, Alert } from "react-native"; 
import axios from "axios"; 
import { useRouter, useLocalSearchParams } from "expo-router"; 

// Componente que permite ao utilizador editar o seu perfil
const EditProfileScreen: React.FC = () => {
  const router = useRouter(); // Hook para navegação entre telas
  const { email } = useLocalSearchParams<{ email: string }>(); // Obtém o email passado como parâmetro na URL

  // Estados para armazenar os dados do formulário
  const [name, setName] = useState(""); // Armazena o novo nome do utilizador
  const [password, setPassword] = useState(""); // Armazena a nova senha do utilizador

  // Função para enviar os dados atualizados para o servidor
  const handleUpdate = async () => {
    // Verifica se todos os campos foram preenchidos antes de enviar a atualização
    if (!name || !password) {
      Alert.alert("Erro", "Preencha todos os campos!"); // Exibe um alerta se algum campo estiver vazio
      return;
    }

    try {
      // Envia a requisição para o servidor para atualizar os dados do utilizador
      const response = await axios.put("http://10.0.2.2:3000/user/update", {
        email, // O email do utilizador que está a ser atualizado
        name, // O novo nome
        password, // A nova senha
      });

      // Verifica se a atualização foi bem-sucedida
      if (response.data.sucesso) {
        Alert.alert("Sucesso", response.data.mensagem); // Mostra um alerta informando que foi atualizado com sucesso
        router.back(); // Retorna à tela anterior após a atualização bem-sucedida
      } else {
        Alert.alert("Erro", response.data.mensagem); // Exibe uma mensagem de erro caso a atualização falhe
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os dados."); // Mensagem de erro caso a requisição falhe
    }
  };

  return (
    <View style={{ padding: 20 }}> 
      {/* Título da página */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Editar Perfil</Text>

      {/* Campo para inserir o novo nome */}
      <Text>Nome:</Text>
      <TextInput
        value={name} // Define o valor do input como o estado 'name'
        onChangeText={setName} // Atualiza o estado sempre que o utilizador digita algo
        style={{ borderBottomWidth: 1, marginBottom: 10 }} // Estilo do campo de entrada
      />

      {/* Campo para inserir a nova senha */}
      <Text>Nova Senha:</Text>
      <TextInput
        value={password} // Define o valor do input como o estado 'password'
        onChangeText={setPassword} // Atualiza o estado sempre que o utilizador digita algo
        secureTextEntry // Oculta o texto digitado para maior segurança
        style={{ borderBottomWidth: 1, marginBottom: 20 }} // Estilo do campo de entrada
      />

      {/* Botão para atualizar os dados */}
      <Button title="Atualizar" onPress={handleUpdate} />
    </View>
  );
};

export default EditProfileScreen;

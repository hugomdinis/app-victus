import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";

const EditProfileScreen: React.FC = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>(); // Pegando o email dos parâmetros da URL

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    if (!name || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.put("http://10.0.2.2:3000/user/update", {
        email,
        name,
        password,
      });

      if (response.data.sucesso) {
        Alert.alert("Sucesso", response.data.mensagem);
        router.back(); // Voltar para a tela anterior
      } else {
        Alert.alert("Erro", response.data.mensagem);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os dados.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Editar Perfil</Text>

      <Text>Nome:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Nova Senha:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Button title="Atualizar" onPress={handleUpdate} />
    </View>
  );
};

export default EditProfileScreen;

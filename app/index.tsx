import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://10.0.2.2:3000/login", { email, senha });

      console.log("Resposta do servidor:", response.data); // Debugging

      if (response.data.sucesso) {
        Alert.alert("Sucesso", response.data.mensagem);
        router.push("/dashboard");
      } else {
        Alert.alert("Erro", response.data.mensagem);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Falha na comunicação com o servidor");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Senha:</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

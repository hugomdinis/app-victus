import { useState } from "react";
import { View, Text, TextInput, Button} from "react-native";


//Defenir um objeto para armazenar os email e a password do utilizador
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  
  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Senha:</Text>
      <TextInput value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Entrar" />
    </View>
  );
}

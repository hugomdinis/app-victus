import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Iniciar Sessao" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="editProfile" options={{ title: "Editar Perfil" }} />
      <Stack.Screen name="verification" options={{ title: "Verificação via WhatsApp" }} />
    </Stack>
  );
}

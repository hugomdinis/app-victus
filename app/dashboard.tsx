import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native'; 
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';

// Definindo a interface para os parâmetros da rota, com 'email' sendo um parâmetro
interface DashboardRouteParams {
  email: string;
}

// Definindo a interface para o tipo do produto, contendo o nome e descrição
interface Produto {
  prod_name: string; 
  prod_desc: string; 
}

// Tipando a rota para garantir que o parâmetro 'email' estará disponível
type DashboardScreenRouteProp = RouteProp<{ Dashboard: DashboardRouteParams }, 'Dashboard'>;

const DashboardScreen: React.FC = () => {
  // Usando o hook 'useRoute' para aceder aos parâmetros, garantindo que estamos recebendo o 'email' corretamente
  const route = useRoute<DashboardScreenRouteProp>(); 
  const { email } = route.params; // Extraímos o 'email' dos parâmetros
  const [produtos, setProdutos] = useState<Produto[]>([]); 
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Hook useEffect para fazer a requisição de dados assim que o componente for montado
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        // Requisição HTTP para o backend, passando o email do cliente na URL para buscar os produtos subscritos
        const response = await axios.get(`http://10.0.2.2:3000/dashboard/${email}`);
        if (response.data.sucesso) {
          // Caso a requisição seja bem-sucedida, armazenamos os produtos no estado 'produtos'
          setProdutos(response.data.dados);
        } else {
          setErro(response.data.mensagem);
        }
      } catch (error) {
        setErro("Erro ao carregar os dados");
      } finally {
        // Após a requisição, independentemente do sucesso ou da falha, atualizamos o estado de loading para 'false'
        setLoading(false);
      }
    };
    fetchProdutos();
  }, [email]); // O useEffect será reexecutado sempre que o email mudar (isso garante que dados sejam corretamente carregados)

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (erro) {
    return <Text>{erro}</Text>; // Exibindo o erro caso tenha ocorrido
  }

  return (
    <View>
      <Text>Produtos Subscritos</Text> 
      <FlatList
        data={produtos}  // Passando a lista de produtos para o FlatList
        keyExtractor={(item) => item.prod_name}  // Usando o nome do produto como chave única
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>Produto: {item.prod_name}</Text>
            <Text>Descrição: {item.prod_desc}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Exportando o componente para ser utilizado em outro lugar da aplicação
export default DashboardScreen;

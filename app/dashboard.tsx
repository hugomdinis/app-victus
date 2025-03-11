import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // Hook para navegação entre telas
import Icon from 'react-native-vector-icons/Feather'; // Ícones para a interface

// Define a interface dos parâmetros da rota, garantindo que 'email' esteja presente
interface DashboardRouteParams {
  email: string;
}

// Define a estrutura dos produtos que serão exibidos no dashboard
interface Produto {
  prod_name: string; // Nome do produto
  prod_desc: string; // Descrição do produto
}

// Tipagem da rota, assegurando que 'Dashboard' recebe um parâmetro 'email'
type DashboardScreenRouteProp = RouteProp<{ Dashboard: DashboardRouteParams }, 'Dashboard'>;

// Importação do tipo correto para navegação
import { StackNavigationProp } from '@react-navigation/stack';

// Define o tipo de navegação com as rotas disponíveis
type DashboardScreenNavigationProp = StackNavigationProp<
  { Dashboard: DashboardRouteParams; editProfile: { email: string } }, // Define as telas disponíveis
  'Dashboard'
>;

const DashboardScreen: React.FC = () => {
  // Obtém os parâmetros da rota usando 'useRoute'
  const route = useRoute<DashboardScreenRouteProp>();
  const { email } = route.params; // Extrai o 'email' passado como parâmetro na navegação

  // Estado para armazenar os produtos recebidos do servidor
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos dados
  const [erro, setErro] = useState(''); // Estado para armazenar mensagens de erro

  // Obtém o objeto de navegação com a tipagem correta
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  // Configura o botão no cabeçalho quando o componente for montado
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('editProfile', { email })} // Botão para editar perfil
          style={styles.headerIconContainer}
        >
          <Icon name="settings" size={30} color="#000" /> {/* Ícone de configurações */}
        </TouchableOpacity>
      ),
    });
  }, [navigation, email]); // Executa novamente se 'navigation' ou 'email' mudarem

  // Faz a requisição dos produtos ao servidor quando o componente for carregado
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        // Requisição à API para obter os produtos associados ao email
        const response = await axios.get(`http://10.0.2.2:3000/dashboard/${email}`);

        if (response.data.sucesso) {
          setProdutos(response.data.dados); // Armazena os produtos no estado
        } else {
          setErro(response.data.mensagem); // Caso a resposta contenha um erro
        }
      } catch (error) {
        setErro('Erro ao carregar os dados'); // Erro genérico caso a requisição falhe
      } finally {
        setLoading(false); // Indica que o carregamento terminou
      }
    };

    fetchProdutos(); // Executa a função ao montar o componente
  }, [email]); // Reexecuta a requisição caso o email mude

  // Exibe um indicador de carregamento enquanto os dados são buscados
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Caso haja um erro, exibe a mensagem na tela
  if (erro) {
    return <Text>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos Subscritos</Text>
      
      <FlatList
        data={produtos} // Array de produtos recebido da API
        keyExtractor={(item) => item.prod_name} // Define o nome do produto como chave única
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>Produto: {item.prod_name}</Text>
            <Text>Descrição: {item.prod_desc}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContent} // Aplica estilos na lista
      />
    </View>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que o componente ocupe todo o espaço disponível
    padding: 20, // Adiciona margem interna
  },
  title: {
    fontSize: 24, // Tamanho do título
    fontWeight: 'bold', // Deixa o texto em negrito
    marginBottom: 20, // Adiciona um espaçamento abaixo do título
  },
  flatListContent: {
    flexGrow: 1, // Garante que a FlatList ocupe o restante do espaço
    justifyContent: 'flex-start', // Mantém os itens no topo
  },
  headerIconContainer: {
    marginRight: 20, // Adiciona espaço entre o ícone e a borda
  },
});

export default DashboardScreen;

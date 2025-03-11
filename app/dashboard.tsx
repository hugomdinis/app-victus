import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // Corrigido import
import Icon from 'react-native-vector-icons/Feather';

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

// Importando o tipo correto do @react-navigation/stack
import { StackNavigationProp } from '@react-navigation/stack';

// Tipando a navegação corretamente
type DashboardScreenNavigationProp = StackNavigationProp<
  { Dashboard: DashboardRouteParams; editProfile: { email: string } },
  'Dashboard'
>;

const DashboardScreen: React.FC = () => {
  const route = useRoute<DashboardScreenRouteProp>(); // Usando o hook 'useRoute' para acessar a rota
  const { email } = route.params; // Extraímos o 'email' dos parâmetros
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  // Tipando a navegação corretamente
  const navigation = useNavigation<DashboardScreenNavigationProp>(); // Usando o hook 'useNavigation' com a tipagem correta

  // Definindo a opção do cabeçalho quando o componente for montado
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('editProfile', { email })} // Agora a navegação está tipada corretamente
          style={styles.headerIconContainer}
        >
          <Icon name="settings" size={30} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, email]); // O efeito será executado quando 'navigation' ou 'email' mudar

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/dashboard/${email}`);
        if (response.data.sucesso) {
          setProdutos(response.data.dados); // Armazenando os produtos no estado
        } else {
          setErro(response.data.mensagem);
        }
      } catch (error) {
        setErro('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [email]); // Recarrega os dados caso o email mude

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (erro) {
    return <Text>{erro}</Text>; // Exibindo o erro, caso ocorra
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos Subscritos</Text>
      <FlatList
        data={produtos} // Dados da lista de produtos
        keyExtractor={(item) => item.prod_name} // Usando o nome do produto como chave
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>Produto: {item.prod_name}</Text>
            <Text>Descrição: {item.prod_desc}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContent} // Aplicando o estilo da lista
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz a View ocupar todo o espaço disponível
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatListContent: {
    flexGrow: 1, // Garante que a FlatList ocupe o restante do espaço
    justifyContent: 'flex-start', // Garante que os itens da lista fiquem no topo
  },
  headerIconContainer: {
    marginRight: 20,
  },
});

export default DashboardScreen;

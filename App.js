import { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  const [texto, setTexto] = useState('');
  const [itens, setItens] = useState([]);

  function adicionarItem() {
    if (texto.trim() !== '') {
      const novoItem = {
        id: Date.now().toString(),
        nome: texto
      };

      setItens([...itens, novoItem]);
      setTexto('');
    }
  }

  function removerItem(idParaRemover) {
    const novaLista = itens.filter(item => item.id !== idParaRemover);
    setItens(novaLista);
  }

  return (
    <KeyboardAvoidingView
      style={styles.fundoTela}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Lista de Compras</Text>
          <Text style={styles.subtitulo}>O que precisa comprar hoje?</Text>
        </View>

        <View style={styles.areaInput}>
          <TextInput
            style={styles.input}
            placeholder="Ex: Maçãs, Leite, Pão..."
            placeholderTextColor="#9CA3AF"
            value={texto}
            onChangeText={setTexto}
          />
          <TouchableOpacity
            style={[styles.botao, texto.trim() === '' ? styles.botaoInativo : null]}
            onPress={adicionarItem}
            activeOpacity={0.8}
            disabled={texto.trim() === ''}
          >
            <Text style={styles.textoBotao}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={itens}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listaContainer}
          renderItem={({ item }) => (
            <View style={styles.cartaoItem}>
              <View style={styles.itemEsquerda}>
                <View style={styles.marcador} />
                <Text style={styles.textoItem}>{item.nome}</Text>
              </View>

              <TouchableOpacity
                style={styles.botaoRemover}
                onPress={() => removerItem(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.textoBotaoRemover}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.estadoVazio}>
              <Text style={styles.textoVazio}>A lista está vazia.</Text>
              <Text style={styles.subtextoVazio}>Adiciona itens acima para começar.</Text>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fundoTela: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Cinzento muito suave
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  cabecalho: {
    marginBottom: 32,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  areaInput: {
    flexDirection: 'row',
    marginBottom: 32,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  botao: {
    backgroundColor: '#6366F1',
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  botaoInativo: {
    backgroundColor: '#A5B4FC',
    shadowOpacity: 0,
    elevation: 0,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 32,
  },
  listaContainer: {
    paddingBottom: 20,
  },
  cartaoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  itemEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  marcador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366F1',
    marginRight: 12,
  },
  textoItem: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
  botaoRemover: {
    backgroundColor: '#FEE2E2',
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  textoBotaoRemover: {
    color: '#EF4444', // Ícone vermelho escuro
    fontWeight: 'bold',
    fontSize: 16,
  },
  estadoVazio: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  textoVazio: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  subtextoVazio: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 4,
  }
});
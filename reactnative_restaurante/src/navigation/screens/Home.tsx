import { Button, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Nuestro Restaurante</Text>
      <Text style={styles.description}>
        Explore nuestro menú, gestione sus clientes y mucho más.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6c757d',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
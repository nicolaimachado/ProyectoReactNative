import { Button, Text, Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} // Adjust the path as necessary
        style={styles.logo}
      />
      <Text style={styles.title}>Bienvenido a Restaurante Delicatesse</Text>
      <Text style={styles.description}>
        Gestione los clientes desde esta pagina.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Alta de Cliente"
          onPress={() => navigation.navigate('Alta')}
          color="#007bff"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Listado de Clientes"
          onPress={() => navigation.navigate('Listado')}
          color="#007bff"
        />
      </View>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
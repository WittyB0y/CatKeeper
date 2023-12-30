import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Vibration, ToastAndroid  } from 'react-native';
import {FirstRunScreen} from './src/pages';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FirstRunScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

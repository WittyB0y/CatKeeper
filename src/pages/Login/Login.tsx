import { View, TextInput, Button } from 'react-native';
import React from 'react';
// import { useNavigation } from '@react-navigation/native';

// const themeColors = {
//   bg: '#877dfa',
// };

export default function LoginScreen() {
  // const navigation = useNavigation();
  return (
    <View>
      <TextInput>Login</TextInput>
      <TextInput>Password</TextInput>
      <Button title={'Войти'} />
    </View>
  );
}

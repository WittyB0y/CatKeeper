import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomButton } from '../../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Routes';

interface IGreetingProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const Greeting = ({ navigation }: IGreetingProps) => {
  // const [image, setImage] = useState<string | null>(null);
  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <CustomButton title='Пройти обучение' fontSizeWindowPercent={30} onPress={handlePress} />
      <CustomButton title='Пропустить обучение' fontSizeWindowPercent={30} onPress={handlePress} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

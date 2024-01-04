import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CustomButton } from '../../components';

interface IGreetingProps {
  navigation: any;
}


export const Greeting = ({ navigation }: IGreetingProps) => {
  const [image, setImage] = useState<string | null>(null);
  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{uri: image }}
          style={styles.image}
        />
      )};

      <CustomButton
        text="Пройти обучение"
        fontSize={30}
        onPress={handlePress}
      />
      <CustomButton text="Пропустить обучение" fontSize={30} onPress={handlePress} />
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

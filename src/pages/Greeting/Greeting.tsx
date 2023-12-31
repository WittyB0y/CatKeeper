import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Vibration, View } from 'react-native';
import { CustomButton } from '../../components';
import { useNotifications } from '../../hooks';

interface IGreetingProps {
  navigation: any
}

export const Greeting = ({navigation}: IGreetingProps) => {
  const [notify] = useNotifications();
  const [isFirstRun, setIsFirstRun] = useState<boolean>(false)
  const handlePress = () => {
    navigation.navigate('Home')
  }

  // useEffect(() => {
  //   const checkFirstRun = async () => {
  //     const isFirstRun = await AsyncStorage.getItem('firstRun');
  //
  //     if (!isFirstRun) {
  //       await AsyncStorage.setItem('firstRun', 'true');
  //     }
  //     setIsFirstRun(!isFirstRun);
  //   };
  //
  //   checkFirstRun();
  // }, []);

  return (
    <View>
      <CustomButton text="Пройти обучение" fontSize={30} onPress={() => notify('Meow')}/>
      <CustomButton text="Пропустить обучение" fontSize={30} onPress={() => {
        handlePress();
      }}/>
    </View>
  )
}
    
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Vibration, ToastAndroid  } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { useNotifications } from '../../hooks';
import { Home } from '../Home/Home';

export const FirstRunScreen = () => {
  const [notify] = useNotifications();
  const [isFirstRun, setIsFirstRun] = useState<boolean>(false)

    useEffect(() => {
    const checkFirstRun = async () => {
        const isFirstRun = await AsyncStorage.getItem('firstRun');
    
        if (!isFirstRun) {
            await AsyncStorage.setItem('firstRun', 'true');
        }
        setIsFirstRun(!isFirstRun);
      };
  
      checkFirstRun();
    }, []);
    if (isFirstRun) {
        return (
          <View>
          <CustomButton text="Пройти обучение" fontSize={30} onPress={() => notify('Meow')}/>
          <CustomButton text="Пропустить обучение" fontSize={30} onPress={() => {console.log('Fucked'); Vibration.vibrate([200, 100, 300]); ToastAndroid.show('You are passik, u can not fuck me', ToastAndroid.SHORT)}}/>
      </View>
        )
    }
    return (
        <View>
          <Home/>
        </View>
    )
  };
    
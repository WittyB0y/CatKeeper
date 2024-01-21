import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Card, LowMenu} from "../../components";
import {useAppSelector} from '../../hooks';


interface IHomeProps {
  navigation: any;
}


export const Home = ({ navigation }: IHomeProps) => {
  
  const myCards = useAppSelector((state) => state.card.cards);

  const dispatch = useDispatch();
  const handlePress = () => {

    navigation.reset({
      index: 0,
      routes: [{ name: 'LockScreen' }],
    });
  }
  
  useEffect(() => {
    const runCheckFirstRun = async () => {

      if (!await checkFirstRun()) {
        navigation.navigate('Greeting');
      }
    };
  
    runCheckFirstRun();
  }, []);

    useEffect(() => {
      const runCheckIsSetLock = async () => {
        if (await checkIsSetLock()) {
          handlePress()
        }
      }
      runCheckIsSetLock()
    }, [])
  const checkIsSetLock = async (): Promise<boolean> => {
      try {
        const isSetLock = await AsyncStorage.getItem('isSetLock');
        return !(isSetLock === null || isSetLock === 'false');
      }
      catch (error) {
        return false;
      }
  };

const checkFirstRun = async (): Promise<boolean> => {
  try {
    const isFirstRun = await AsyncStorage.getItem('isFirstRun');
    if (isFirstRun === null || isFirstRun === 'false') {
      await AsyncStorage.setItem('isFirstRun', 'false');
      return true;
    } 
    else 
    {
    return false;
    }
    } catch (error) {
    return false;
    }
};

  const cardsArray = Array.from({ length: 5 }, (_, index) => index);
  
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.containerView}>
        <ScrollView>
        {
          cardsArray.map((index) => (
            <Card key={index} />
          ))
        }
        </ScrollView>
      </View>
      {/*<Camera></Camera>*/}
      <LowMenu></LowMenu>
      <Button title={'* Lock Screen *'} onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
    paddingTop: 20,
    width: "100%",
  },
  containerView: {
    backgroundColor: "green",
    flex: 1,
    padding: 5,
  },
})

import React, { useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView,  } from 'react-native';
import { LowMenu } from "../../components";
import { Card } from '../../components/Card/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { addCard } from '../../store/cards/cards.slice';

interface IHomeProps {
  navigation: any;
};

export const Home = ({ navigation }: IHomeProps) => {
  
  const myCards = useAppSelector((state) => state.card.cards);

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(addCard({id: 1, name: 'Evroopt', code: '**** 3671', type: '123'}));
  }
  
  useEffect(() => {
    const runCheckFirstRun = async () => {
      if (!await checkFirstRun()) {
        navigation.navigate('Greeting');
      }
    };
  
    runCheckFirstRun();
  }, []);
  

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
      <LowMenu></LowMenu>
      <Button title={'Click to navigate'} onPress={handlePress} />
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

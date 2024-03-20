import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Card, CustomButton, ISelectOptionProps, LowMenu, SelectOption } from '../../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Routes';
import { ICardWithoutId } from '../../components/Card/type';
import { useDBCard } from '../../db';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

interface IHomeProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const Home = ({ navigation }: IHomeProps) => {
  const { cards, addCardToDB, getCards, deleteCardById } = useDBCard(); // Используем хук useDBCard
  const [isCardsReady, setIsCardsReady] = useState<boolean>(false);
  const newItem: ICardWithoutId = {
    code: 'ABC123',
    name: 'Zhopka123',
    type: 1,
    description: 'This is a new item',
    isFavorite: false,
    counter: 0,
    dateCreated: '2022-03-21 12:00:00',
    dateUpdated: '2022-03-21 12:00:00',
    dateLastSeen: '2022-03-21 12:00:00',
  };

  useEffect(() => {
    if (cards.length) setIsCardsReady(true);
    else setIsCardsReady(false);
  }, [cards]);

  const handlePress = async () => {
    try {
      await addCardToDB(newItem);
      await refreshCards();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const holdDelete = async (elemId: number) => {
    await deleteCardById(elemId);
    await refreshCards();
  };

  useEffect(() => {
    const runCheckFirstRun = async () => {
      if (!(await checkFirstRun())) {
        navigation.navigate('Greeting');
      }
    };

    runCheckFirstRun();
  }, []);

  useEffect(() => {
    const runCheckIsSetLock = async () => {
      if (await checkIsSetLock()) {
        handlePress(); // Вызываем обработчик после проверки блокировки
      }
    };
    runCheckIsSetLock();
  }, []);

  const checkIsSetLock = async (): Promise<boolean> => {
    try {
      const isSetLock = await AsyncStorage.getItem('isSetLock');
      return !(isSetLock === null || isSetLock === 'false');
    } catch (error) {
      return false;
    }
  };

  const checkFirstRun = async (): Promise<boolean> => {
    try {
      const isFirstRun = await AsyncStorage.getItem('isFirstRun');
      if (isFirstRun === null || isFirstRun === 'false') {
        await AsyncStorage.setItem('isFirstRun', 'false');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const refreshCards = async () => {
    const updatedCards = await getCards();
    setIsCardsReady(updatedCards.length <= 0);
  };

  const selectOpt: ISelectOptionProps = {
    leftSection: <MaterialIcons name='table-rows' size={24} color='black' />,
    rightSection: <Entypo name='grid' size={30} color='black' />,
    onSelect: (option) => {
      console.log(option);
    },
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Text> count: {cards.length} </Text>
      <SelectOption {...selectOpt} />
      <View style={styles.containerView}>
        <ScrollView>
          {isCardsReady &&
            cards.map((elem) => (
              <React.Fragment key={elem.id}>
                <Card name={elem.name} code={elem.code} id={elem.id} isFavorite={elem.isFavorite} />
                <CustomButton
                  title='Delete card'
                  backgroundColor='#371579'
                  onPress={() => holdDelete(elem.id)}
                />
              </React.Fragment>
            ))}
        </ScrollView>
      </View>
      <LowMenu />
      <Button title={'add'} onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 20,
    width: '100%',
  },
  containerView: {
    backgroundColor: 'green',
    flex: 1,
    padding: 5,
  },
});

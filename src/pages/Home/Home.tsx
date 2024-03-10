import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, LowMenu } from '../../components';
import { useDBCard, addItemToCard } from '../../db/useDBCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Routes/Routes';
import { ICard } from '../../components/Card/type';

interface IHomeProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const Home = ({ navigation }: IHomeProps) => {
  // const myCards = useAppSelector((state) => state.card.cards);
  //
  // const dispatch = useDispatch();
  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LockScreen' }],
    });
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
        handlePress();
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

  const newItem = {
    id: '',
    code: 'ABC123',
    name: 'Evroopt1235',
    type: 1,
    description: 'This is a new item',
    isFavorite: false,
    counter: 0,
    dateCreated: '2022-03-21 12:00:00',
    dateUpdated: '2022-03-21 12:00:00',
    dateLastSeen: '2022-03-21 12:00:00',
  };

  addItemToCard(newItem);
  // deleteAllCards()
  const cards: ICard[] = useDBCard();

  // console.log(useDBCard());
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={styles.containerView}>
        <ScrollView>
          {cards.map((elem) => (
            <Card key={elem.id} name={elem.name} code={elem.code} />
          ))}
        </ScrollView>
      </View>
      <LowMenu />
      {/* <Button title={'* Lock Screen *'} onPress={handlePress} /> */}
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

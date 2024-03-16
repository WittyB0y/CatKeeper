import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Card, LowMenu } from '../../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../Routes/Routes';
import { ICard } from '../../components/Card/type';
import { useDispatch } from 'react-redux';
import { addCardToDB, deleteCard, loadCardsFromDB } from '../../store/cards/cards.slice';
import { useAppSelector } from '../../hooks';

interface IHomeProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export const Home = ({ navigation }: IHomeProps) => {
  const newItem: ICard = {
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
  const handlePress = (action: string | ICard) => {
    if (action==="delete") deleteAllCards()
    else addCard(newItem)
  };

  const handleAddCard = () => {
    const newCard: ICard = {
      code: '123456',
      name: 'New Card',
      type: 1,
      description: 'Description',
      isFavorite: false,
      counter: 0,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      dateLastSeen: new Date().toISOString(),
    };
  
    dispatch(addCardToDB(newCard)); 
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
        handlePress(newItem);
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


  

  const dispatch = useDispatch();
  const cards = useAppSelector(state => state.card.cards);
  const handleInputChange = (text) => {
    setTextInputValue(text); 
  };

  useEffect(() => {
    dispatch(loadCardsFromDB()); 
  }, [dispatch]);

  console.log(cards, "from cards");

  const [textInputValue, setTextInputValue] = useState('');
  const handleDeleteCard = (id: number) => {
    dispatch(deleteCard(id));
  };


  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={styles.containerView}>
        <ScrollView>
          {cards.map((elem) => (
            <Card
              key={elem.id}
              name={elem.name}
              code={elem.code}
              isFavorite={elem.isFavorite}
              cardData={elem}
            />
          ))}
        </ScrollView>
      </View>
      <LowMenu />
      <TextInput value={textInputValue} onChangeText={handleInputChange} />
      <Button title={'delete'} onPress={()=> handleDeleteCard(textInputValue)} />
      <Button title={'add'} onPress={handleAddCard} />
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

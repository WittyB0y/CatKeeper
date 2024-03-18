import { View, Text, Image, StyleSheet, Vibration } from 'react-native';
import { Mixin } from '../../styles';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TCardProps } from './type';
import { useDBCard } from '../../db';

// TODO убрать экспорт, когда будут использоваться пропсы

export const Card = (props: TCardProps) => {
  const { updateCardById } = useDBCard();
  const { name, code, isFavorite, id } = props;
  const { cardBox, cardItem, cardContainer } = styles;
  const [active, setActive] = useState<boolean>(isFavorite);
  const handlePressStar = () => {
    updateCardById(id, { isFavorite: !active });
    setActive((prevState) => !prevState);
    Vibration.vibrate(50);
  };

  return (
    <View style={cardBox}>
      <Image style={cardItem} source={require('../../../assets/123.png')} />
      <View style={[Mixin.theMostCenterOfCenters, cardContainer]}>
        <Octicons name='info' size={30} style={[styles.iconBox, styles.infoBox]} />
        <Text style={styles.textCars}>
          name: {name}
          {'\n'}id:{id}
          {'\n'}code:{code}
        </Text>
        <AntDesign
          name='star'
          size={30}
          color={active ? 'gold' : 'white'}
          style={[styles.iconBox, styles.favBox]}
          onPress={handlePressStar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    padding: 5,
    borderRadius: 20,
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardItem: {
    width: 345,
    height: 210,
    borderRadius: 20,
  },
  cardContainer: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
  },
  textCars: {
    color: 'white',
    fontWeight: '900',
    fontSize: 30,
  },
  infoBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
    color: '#ffffff',
  },
  favBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
  },
  iconBox: {
    // padding: 5,
    // backgroundColor: 'rgba(0,0,0,0.75)',
    // borderRadius: 50,
  },
});

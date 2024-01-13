import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import {AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';
import { Mixin } from "../../styles";
import { IMenuButton } from "./types";
import { LowMenuItem } from "./LowMenuItem";
import {useState} from "react";

type IButtons = { id: number } & IMenuButton

const menuButtons: IButtons[] = [
  { text: 'Home', onPress: () => console.log('Pressed home button'), id: 1 },
  {
    icon: <AntDesign name="pluscircleo" size={40} color="black"/>,
    onPress: () => console.log('Pressed home button'),
    id: 2
  },
  { text: 'Other', onPress: () => console.log('Pressed home button'), id: 3 },
]

export const LowMenu = () => {

  const [iconColorHome, setIconColorHome] = useState('black');
  const [iconColorFav, setIconColorFav] = useState('black');

  const handlePressHome = () => {
    if (iconColorFav === 'red') setIconColorFav('black')
    const newColor = iconColorHome === 'black' ? 'red' : 'black';
    setIconColorHome(newColor);

    console.log('Button pressed');
  }
  const handlePressFav = () => {
    if (iconColorHome === 'red') setIconColorHome('black');
    const newColor = iconColorFav === 'black' ? 'red' : 'black';
    setIconColorFav(newColor);
  }

  return (
    <View style={[Mixin.centerBlockContent, Mixin.gap, styles.container]}>
      {menuButtons.map(menuItem => (
        <LowMenuItem
          key={menuItem.id}
          onPress={menuItem.onPress}
          icon={menuItem.icon}
          text={menuItem.text}
        />
      ))}
      <TouchableWithoutFeedback onPress={handlePressHome}>
        <Feather name="home" size={40} color={iconColorHome} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => console.log('123')}>
        <AntDesign name="pluscircleo" size={40} color='black'/>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handlePressFav}>
        <MaterialIcons name="favorite-outline" size={40} color={iconColorFav} />
      </TouchableWithoutFeedback>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flexWrap: 'wrap',
    width: '100%',
    height: '6%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    position: 'relative',
  },
  lowMenu: {
    backgroundColor: 'blue',
    width: '15%',
    position: 'absolute',
    bottom: 0,
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     bottom: -100,
//     backgroundColor: 'yellow',
//     flexWrap: 'wrap',
//     width: `100%`,
//     // height: `10%`,
//     flex: 1,
//     justifyContent: 'space-evenly',
//     flexDirection: 'row',
//   },
//   menuItem: {
//     // position: "relative",
//     backgroundColor: 'pink',
//     flex: 1
//   },
//   lowMenu: {
//     backgroundColor: "blue",
//     flex: 1,
//     width: "15%",
//     // position: "absolute",
//     bottom: 0,
//     height: '5%'
//   }
// });

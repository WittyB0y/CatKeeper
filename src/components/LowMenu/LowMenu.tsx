import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Mixin } from "../../styles";
import { IMenuButton } from "./types";
import { LowMenuItem } from "./LowMenuItem";

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
  const handlePress = () => {
    console.log(`Value onPress is not exist`)
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
      {/*<TouchableWithoutFeedback onPress={() => console.log('1')}>*/}
      {/*  <Text>Home</Text>*/}
      {/*</TouchableWithoutFeedback>*/}

      {/*<TouchableWithoutFeedback onPress={handlePress}>*/}
      {/*  <AntDesign name="pluscircleo" size={40} color="black"/>*/}
      {/*</TouchableWithoutFeedback>*/}

      {/*<TouchableWithoutFeedback onPress={() => console.log('2')}>*/}
      {/*  <Text>Other</Text>*/}
      {/*</TouchableWithoutFeedback>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    bottom: -100,
    backgroundColor: 'yellow',
    flexWrap: 'wrap',
    width: `100%`,
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  menuItem: {
    // position: "relative",
    backgroundColor: 'pink',
    flex: 1
  },
  lowMenu: {
    backgroundColor: "blue",
    flex: 1,
    width: "15%",
    // position: "absolute",
    bottom: 0,
    height: '5%'
  }
});

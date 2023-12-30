import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 



export const LowMenu = () => {
  return (
   <View style={styles.lowMenu}>
    <TouchableWithoutFeedback onPress={() => console.log('plus')}>
        <AntDesign name="pluscircleo" size={40} color="black" />
    </TouchableWithoutFeedback>
   </View>
  )
}

const styles = StyleSheet.create({
    lowMenu: {
        backgroundColor: "blue",
        flex: 1,
        width: "15%",
        position: "absolute",
        bottom: 0,
        height: '5%'
      }
});

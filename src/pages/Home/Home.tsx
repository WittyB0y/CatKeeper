import { View, StyleSheet, Text } from 'react-native';
import { LowMenu } from "../../components"

export const Home = () => {
  return (
    <View style={{width: "100%", height: "100%"}}>
        <View style={styles.containerView}>
        <Text style={styles.container}>My cards:</Text>
        </View>
        <LowMenu></LowMenu>
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
  },
})
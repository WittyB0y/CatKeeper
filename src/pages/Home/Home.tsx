import { View, StyleSheet, Text, Button } from 'react-native';
import { LowMenu } from "../../components"

interface IHomeProps {
  navigation: any
}

export const Home = ({navigation}: IHomeProps) => {
  const handlePress = () => {
    navigation.navigate('Greeting')
  }

  return (
    <View style={{width: "100%", height: "100%"}}>
        <View style={styles.containerView}>
        <Text style={styles.container}>My cards:</Text>
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
  },
})
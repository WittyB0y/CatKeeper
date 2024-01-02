import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { LowMenu } from "../../components";
import { Card } from '../../components/Card/Card';

interface IHomeProps {
  navigation: any
}

export const Home = ({ navigation }: IHomeProps) => {
  const handlePress = () => {
    navigation.navigate('Greeting')
  }

  const cardsArray = Array.from({ length: 5 }, (_, index) => index);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.containerView}>
        <Text style={styles.container}>My cards:</Text>
        {
          cardsArray.map((index) => (
            <Card key={index} />
          ))
        }
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

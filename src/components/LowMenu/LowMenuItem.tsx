import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useEffect, useState } from "react";
import { IMenuButton } from "./types";
import { Mixin } from "../../styles";

export const LowMenuItem = (props: IMenuButton) => {
  const { text, icon, onPress } = props
  const [isPropExist, setIsPropExist] = useState<boolean>(false)
  useEffect(() => {
    if (text && icon)
      setIsPropExist(true)
  }, []);

  const handlePress = () => {
    if (onPress)
      onPress()
    else
      console.log(`Value onPress is not exist`)
  }

  if (!isPropExist) return null

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        {text && <Text>{text}</Text>}
        {icon && icon}
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1
  }
});
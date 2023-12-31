import { StyleSheet } from "react-native";

export const Mixin = StyleSheet.create({
  centerBlockContent: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  gap: {
    gap: 10
  },
  defaultScreenStyles: {
    flex: 1,
    width: '100%',
    // height: '100%'
  }
})

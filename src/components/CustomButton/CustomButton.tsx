import { Text, View, StyleSheet, TextStyle, TouchableWithoutFeedback } from 'react-native';

interface IProps {
  text: string;
  onPress?: () => void;
  fontSize?: number;
  color?: string;
}

export function CustomButton(props: IProps) {
  const { text, fontSize, color, onPress } = props;
  const textStyles = [fontSize && { fontSize }, color && { color }].filter(Boolean);
  // const handleClick = () => {
  //   if (onPress) {
  //     onPress();
  //   }
  // };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={[styles.text, ...(textStyles as TextStyle[])]}>{text}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 70,
    // width: 150,
    paddingHorizontal: 20,
  },
});

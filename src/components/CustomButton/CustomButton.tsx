import {
  Text,
  View,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  ButtonProps,
  useWindowDimensions,
  TextProps,
} from 'react-native';
import { Mixin } from '../../styles';
import { TouchableWithoutFeedbackProps } from 'react-native/Libraries/Components/Touchable/TouchableWithoutFeedback';
import { ReactElement } from 'react';

interface IButtonProps
  extends Pick<ButtonProps, 'onPress' | 'title'>,
    TouchableWithoutFeedbackProps {
  fontSizeWindowPercent?: number | { width: number; height: number };
  textColor?: string;
  backgroundColor?: string;
  textProps?: TextProps;
}

/**
 * Компонент кнопки
 * @param {string} props.title - Название кнопки;
 * @param {number | {width: number; height: number}} props.fontSizeWindowPercent - Размер кнопки отнисительно размера окна в процентах;
 * @param {string} [props.textColor] - Цвет текста кнопки;
 * @param {string} [props.backgroundColor] - Цвет фона кнопки;
 * @param {object} [props.textProps] - Цвет фона кнопки;
 * @param {object} [props.rest] - Все остальные пропсы, которые может принимать компонент TouchableWithoutFeedback;
 * @returns {ReactElement} - Элемент кнопки;
 */

export function CustomButton(props: IButtonProps): ReactElement {
  const {
    title,
    fontSizeWindowPercent,
    textColor = '#c5bb00',
    backgroundColor = '#001dad',
    textProps = {},
    ...rest
  } = props;
  const { width, height } = useWindowDimensions();
  const textStyles = [
    fontSizeWindowPercent
      ? {
          fontSize:
            typeof fontSizeWindowPercent === 'number'
              ? Math.min(width / fontSizeWindowPercent, height / fontSizeWindowPercent)
              : Math.min(
                  width / fontSizeWindowPercent.width,
                  height / fontSizeWindowPercent.height,
                ),
        }
      : { fontSize: Math.min(width / 15, height / 15) },
    textColor && { color: textColor },
  ].filter(Boolean);

  return (
    <View style={[styles.container, { backgroundColor }, Mixin.theMostCenterOfCenters]}>
      <TouchableWithoutFeedback style={[styles.button]} {...rest}>
        <Text style={[styles.text, ...(textStyles as TextStyle[])]} {...textProps}>
          {title}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  text: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'blue',
  },
});

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { FC, ReactNode, useState } from 'react';
import { Mixin } from '../../styles';

export interface ISelectOptionProps {
  leftSection: ReactNode;
  rightSection: ReactNode;
  onSelect: (isSelected: boolean) => void;
  stylesForEachOption?: StyleProp<ViewStyle>;
  stylesForBlock?: StyleProp<ViewStyle>;
}

export const SelectOption: FC<ISelectOptionProps> = (props) => {
  const { leftSection, rightSection, onSelect, stylesForBlock, stylesForEachOption } = props;
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { selectBlock, active, block } = stylesSheets;
  const handleOptionsType = (option: ReactNode): ReactNode => {
    if (typeof option === 'string' || typeof option === 'number') {
      return <Text>{option}</Text>;
    } else {
      return option;
    }
  };
  const handleSelect = () => {
    setIsSelected((prevState) => !prevState);
    onSelect(isSelected);
  };
  return (
    <View style={stylesForBlock}>
      <TouchableWithoutFeedback onPress={handleSelect}>
        <View style={[block]}>
          <View
            style={[
              Mixin.theMostCenterOfCenters,
              selectBlock,
              stylesForEachOption,
              isSelected && active,
            ]}
          >
            {handleOptionsType(leftSection)}
          </View>
          <View
            style={[
              Mixin.theMostCenterOfCenters,
              selectBlock,
              stylesForEachOption,
              !isSelected && active,
            ]}
          >
            {handleOptionsType(rightSection)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const stylesSheets = StyleSheet.create({
  block: {
    backgroundColor: '#172ec4',
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
  },
  selectBlock: {
    width: '50%',
  },
  active: {
    backgroundColor: '#9a9a9a',
    width: '50%',
  },
});

import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Card, CustomButton } from '../../components';
import { Mixin } from '../../styles';

export default function UIkit() {
  const { cardBox, smallBox } = styles;
  const mokePress = () => {
    console.log('Press 1');
  };
  return (
    <ScrollView style={[Mixin.defaultScreenStyles]}>
      <Card />
      <View style={[Mixin.theMostCenterOfCenters, Mixin.gap, cardBox]}>
        <Text>Наша кнопка</Text>
        <View style={smallBox}>
          <CustomButton title={'Кнопка'} onPress={mokePress} fontSizeWindowPercent={10} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    width: '100%',
    flexDirection: 'row',
  },
  smallBox: {
    position: 'relative',
    width: '60%',
  },
});

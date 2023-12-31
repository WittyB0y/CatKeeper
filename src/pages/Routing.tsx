import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FirstRunScreen } from './Greeting';
import { Home } from './Home';

const Stack = createNativeStackNavigator();

const ScreenRouts = [
  {name: "FirstStart", component: FirstRunScreen, options: {title: 'Welcome'},},
  {name: "Home", component: Home, options: {title: 'Welcome'},},

]
export const Routing = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstStart'>
          <Stack.Screen
            name="FirstStart"
            component={FirstRunScreen}
            options={{title: 'Welcome'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

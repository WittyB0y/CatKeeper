import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Greeting, Home } from '../pages';
import Welcome from '../pages/Welcome/Welcome';
import Login from '../pages/Login/Login';
import LockScreen from '../pages/LockScreen/LockScreen';
import UIkit from '../pages/UIKit/UIkit';

export type RootStackParamList = {
  Home: undefined;
  Greeting: undefined;
  Welcome: undefined;
  Login: undefined;
  LockScreen: undefined;
  UIkit: undefined;
};
type TOptions = 'home' | 'greeting' | 'lockScreen' | 'uikit';

const Stack = createNativeStackNavigator<RootStackParamList>();
const options: Partial<Record<TOptions, NativeStackNavigationOptions>> = {
  home: {
    title: 'My cards (554)',
    headerTitleAlign: 'center',
    headerBackVisible: false,
  },
  greeting: {
    title: 'Welcome',
    headerTitleAlign: 'center',
  },
  lockScreen: {
    freezeOnBlur: true,
    // unmountOnBlur: true
  },
  uikit: {
    title: 'UIkit',
    headerTitleAlign: 'center',
  },
};

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'LockScreen'} component={LockScreen} options={options.lockScreen} />
        <Stack.Screen name={'Home'} component={Home} options={options.home} />
        <Stack.Screen name={'Greeting'} component={Greeting} options={options.greeting} />
        <Stack.Screen name={'Welcome'} component={Welcome} options={options.greeting} />
        <Stack.Screen name={'Login'} component={Login} options={options.greeting} />
        <Stack.Screen name={'UIkit'} component={UIkit} options={options.uikit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

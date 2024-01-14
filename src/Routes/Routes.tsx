import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Greeting, Home } from "../pages";
import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import LockScreen from "../pages/LockScreen/LockScreen";


type TOptions = 'home' | 'greeting';

const Stack = createNativeStackNavigator();
const options: Partial<Record<TOptions, NativeStackNavigationOptions>> = {
  home: {
    title: 'My cards (554)',
    headerTitleAlign: 'center',

  },
  greeting: {
    title: 'Welcome',
    headerTitleAlign: 'center',
  },
}


export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'LockScreen'}>
        <Stack.Screen name={'LockScreen'} component={LockScreen}/>
        <Stack.Screen name={'Home'} component={Home} options={options.home}  />
        <Stack.Screen name={'Greeting'} component={Greeting} options={options.greeting} />
        <Stack.Screen name={'Welcome'} component={Welcome} options={options.greeting} />
        <Stack.Screen name={'Login'} component={Login} options={options.greeting} />
        <Stack.Screen name={'SignUp'} component={SignUp} options={options.greeting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

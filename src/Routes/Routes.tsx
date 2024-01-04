import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Greeting, Home } from "../pages";


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
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={Home} options={options.home}  />
        <Stack.Screen name={'Greeting'} component={Greeting} options={options.greeting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

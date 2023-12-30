import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Greeting, Home } from "../pages";

type TOptions = 'home' | 'greeting'

const Stack = createNativeStackNavigator()

export const Routes = () => {
  const options: Partial<Record<TOptions, NativeStackNavigationOptions>> = {
    home: {
      headerShown: false,
      autoHideHomeIndicator: false
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={Home} options={options.home}  />
        <Stack.Screen name={'Greeting'} component={Greeting} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
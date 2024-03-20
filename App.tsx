import { Provider } from 'react-redux';
import { Routes } from './src/Routes';
import { store } from './src/store/store';
import { usePushNotifications } from './src/hooks';

export default function App() {
  const { expoPushToken } = usePushNotifications();
  console.log(expoPushToken);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

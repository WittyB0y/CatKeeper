import { Provider } from 'react-redux';
import { Routes } from './src/Routes';
import { store } from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

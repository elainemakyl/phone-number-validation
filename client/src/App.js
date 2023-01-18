import './App.css';
import Home from './components/Home';
import PhoneNumberResult from './components/PhoneNumberResult';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PhoneNumbersProvider } from './context/phone-numbers-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/result',
    element: <PhoneNumberResult />
  }
])

function App() {
  return (
    <div className="App">
      <PhoneNumbersProvider>
        <RouterProvider router={router}>
          <Home />
        </RouterProvider>
      </PhoneNumbersProvider>
    </div>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CONST_URL } from './constants/url';
import Home from './pages/home/Home';
import Make from './pages/make/Make';
import Result from './pages/result/Result';
import useImageStore from './stores/image';

const reset = () => {
  const { reset } = useImageStore.getState();
  reset();
};

const router = createBrowserRouter([
  {
    path: CONST_URL.HOME,
    element: <Home />,
    loader: reset,
  },
  {
    path: CONST_URL.MAKE,
    element: <Make />,
    loader: reset,
  },
  {
    path: CONST_URL.RESULT,
    element: <Result />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

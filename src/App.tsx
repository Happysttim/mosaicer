import {
  createBrowserRouter,
  createMemoryRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { CONST_URL } from './constants/url';
import Home from './pages/home/Home';
import Make from './pages/make/Make';
import Result from './pages/result/Result';
import useImageStore from './stores/image';

const reset = () => {
  const { reset } = useImageStore.getState();
  reset();
};

const redirect = () => {
  const { main, tiles } = useImageStore.getState();
  if (!main || tiles.length === 0) {
    window.location.href = '/';
  }
};

const routes = [
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
    loader: redirect,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export const createRouter = (type: 'browser' | 'memory', url: string = '/') => {
  return type === 'browser'
    ? createBrowserRouter(routes)
    : createMemoryRouter(routes, { initialEntries: [url] });
};

const App = () => {
  const router = createRouter('browser');
  return <RouterProvider router={router} />;
};

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { URL } from './constants/url';
import Home from './pages/home/Home';
import Make from './pages/make/Make';

const router = createBrowserRouter([
  {
    path: URL.HOME,
    element: <Home />,
  },
  {
    path: URL.MAKE,
    element: <Make />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

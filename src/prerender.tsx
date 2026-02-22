import { createRouter } from './App.tsx';
import { renderToString } from 'react-dom/server';
import { RouterProvider } from 'react-router-dom';

export const prerender = (data: { url: string }) => {
  const router = createRouter('memory', data.url);
  const html = renderToString(<RouterProvider router={router} />);
  return { html };
};

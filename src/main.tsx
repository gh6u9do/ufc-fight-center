import React from 'react';
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './index.css'

// создаем управляющий инстанс роутера
const router = createRouter({ routeTree: routeTree });

// создаем клиент для запросов к серверным данным
const queryClient = new QueryClient();


// регистрируем тип роутера глобально
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>

      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

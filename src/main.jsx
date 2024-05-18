import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from "react-redux";
import Store from './app/Store.js';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import Admin from './components/Admin';

const router = createBrowserRouter([{
  path: '/',
  element: <App/>
},{
  path: '/Admin',
  element: <Admin/>
}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <Toaster position='top-center' reverseOrder={false} />
      <RouterProvider router={router}>

      </RouterProvider>
    </Provider>
  </React.StrictMode>
)

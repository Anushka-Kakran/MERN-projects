import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import ProductList from './pages/ProductList.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import NotFound from './pages/NotFound.jsx'

import store from './redux/store.jsx'
import Login from './components/Login.jsx'
import Signup from './components/SignUp.jsx'
import Account from './components/Account.jsx'

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />
      },
      {
        path: "/product/:id",
        element: <ProductDetails />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",   // ✅ FIXED (added /)
        element: <Checkout />
      },
      {
        path: "/login",
        element: <Login/>
      },{
        path : "/signup",
        element: <Signup/>
      }, 
      {
        path: "/account",
        element: <Account/>
      }
    ],
    errorElement: <NotFound />
  }
]);

// Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />   
    </Provider>
  </StrictMode>
);
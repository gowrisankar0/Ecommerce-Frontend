import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import SignUp from './pages/SignUp';
import { Provider } from 'react-redux';
import store from "./app/store";

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/newproduct" element={<NewProduct />} />
      <Route path="/signup" element={<SignUp />} />

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
);


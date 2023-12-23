
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/MainLayout";
import { Home } from "./pages/Home";

import { Contact } from "./pages/Contact";
import {Login} from "./pages/Login";
import { Provider } from 'react-redux';
import { store } from 'store';
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/createaccount" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

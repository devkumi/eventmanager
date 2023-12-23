
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/MainLayout";
import { Home } from "./pages/Home";

import { Contact } from "./pages/Contact";
import {Login} from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

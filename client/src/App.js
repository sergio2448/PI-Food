import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import Form from "./components/form/Form"
import Detail from "./components/detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/detail/:id1" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

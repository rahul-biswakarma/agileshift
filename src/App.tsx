import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import { sendEmail } from "./Utils/Backend";

const App = () => {
  return (
    <BrowserRouter>
      <div onClick={() => sendEmail("7satyamjha@gmail.com", "test")}>
        asdfsd
      </div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

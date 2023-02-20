import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import './App.css';

function App() {
  return (
    // <div className="App font-dm_sans">
    //   Agile Shift
    // </div>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

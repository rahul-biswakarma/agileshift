import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Index";

import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganisation/OrganizationList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orglist" element={<OrganizationList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

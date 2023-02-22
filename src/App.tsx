import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Index";

import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganization/OrganizationList";
import { GeneratorFormsContainer } from "./components/SchemaGenerator/GeneratorFormsContainer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schema-generator" element={<GeneratorFormsContainer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orglist" element={<OrganizationList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

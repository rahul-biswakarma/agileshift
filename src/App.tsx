import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Index";

import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganization/OrganizationList";
import { GeneratorFormsContainer } from "./components/SchemaGenerator/GeneratorFormsContainer";
import { SidebarWrapper } from "./components/Sidebar/SidebarWrapper";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
		    <Route
					path="/orglist"
					element={<OrganizationList />}
				/>
        <Route
					path="/createOrg"
					element={<GeneratorFormsContainer/>}
				/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

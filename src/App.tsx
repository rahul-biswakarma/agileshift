import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Index";

import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganization/OrganizationList";
import { GeneratorFormsContainer } from "./components/SchemaGenerator/GeneratorFormsContainer";
import  Filter from "./components/Dashboard/Filter";

const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="" element={<Navigate to="/signup" />} />
    //     <Route path="/signup" element={<SignUp />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/schema-generator" element={<GeneratorFormsContainer />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/orglist" element={<OrganizationList />} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      <Filter schema={[
          { columnTitle: "Title", columnType: "string" },
          { columnTitle: "Stage", columnType: "string" },
          { columnTitle: "User", columnType: "string" },
          { columnTitle: "Tags", columnType: "tag" },
          { columnTitle: "Severity", columnType: "string" },
          { columnTitle: "Type", columnType: "string" },
          { columnTitle: "Rev Org", columnType: "string" },
          { columnTitle: "Part", columnType: "string" },
        ]} />
    </div>
  );
};

export default App;

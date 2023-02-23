import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Index";

import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganization/OrganizationList";
import { GeneratorFormsContainer } from "./components/SchemaGenerator/GeneratorFormsContainer";
// import { SidebarWrapper } from "./components/Sidebar/SidebarWrapper";
import Filter from "./components/Filters/Filter";
import { SidebarWrapper } from "./components/Sidebar/SidebarWrapper";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const sideBarLists = useAppSelector((state) => state.sidebar.sideBarData);
  return (
    <BrowserRouter>
      {sideBarLists.length !== 0 && (
        <section className="fixed z-50">
          <SidebarWrapper />
        </section>
      )}

      <Routes>
        <Route path="" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orglist" element={<OrganizationList />} />
        <Route path="/createOrg" element={<GeneratorFormsContainer />} />
        <Route
          path="/filters"
          element={
            <Filter
              schema={[
                { columnTitle: "Title", columnType: "string" },
                { columnTitle: "Stage", columnType: "string" },
                { columnTitle: "User", columnType: "string" },
                { columnTitle: "Tags", columnType: "tag" },
                { columnTitle: "Severity", columnType: "string" },
                { columnTitle: "Type", columnType: "string" },
                { columnTitle: "Rev Org", columnType: "string" },
                { columnTitle: "Part", columnType: "string" },
              ]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

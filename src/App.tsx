import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard/Index";
import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganization/OrganizationList";
import { GeneratorFormsContainer } from "./components/SchemaGenerator/GeneratorFormsContainer";
import { getFromSession } from "./Utils/Auth";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setUserId } from "./redux/reducers/AuthSlice";
import { SidebarWrapper } from "./components/Sidebar/SidebarWrapper";
<<<<<<< HEAD
import { RootState } from "./redux/store";
=======
import { LinkageSidebar } from "./components/Sidebar/LinkageSidebar";
>>>>>>> f2e2c04d7f3c66ddee0d6345484c1d449fb44dc7

const App = () => {
  const userIdFromSession = getFromSession("userId");
  const dispatch = useAppDispatch();

  if (userIdFromSession) {
    dispatch(setUserId(userIdFromSession));
  }

<<<<<<< HEAD
	const sideBarList = useAppSelector((state:RootState) => state.sidebar.sideBarData);
	return (
		<BrowserRouter>
			{sideBarList.length !== 0 && (
				<section className="fixed z-50">
					<SidebarWrapper />
				</section>
			)}
			<Routes>
				<Route
					path=""
					element={
						userIdFromSession ? (
							<Navigate to="/organization-lists" />
						) : (
							<Navigate to="/signup" />
						)
					}
				/>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/dashboard"
					element={<Dashboard />}
				/>
				<Route
					path="/organization-lists"
					element={<OrganizationList />}
				/>
				<Route
					path="/create-organization"
					element={<GeneratorFormsContainer />}
				/>
				<Route
					path="/edit-organization-schema"
					element={<GeneratorFormsContainer />}
				/>
				<Route
					path="/organization/:id"
					element={<Dashboard />}
				/>
				<Route
					path="/organization"
					element={<Navigate to="/organization-lists" />}
				/>
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
=======
  const sideBarList = useAppSelector((state) => state.sidebar.sideBarData);
  return (
    <BrowserRouter>
      {sideBarList.length !== 0 && (
        <section className="fixed z-50">
          <SidebarWrapper />
        </section>
      )}
      <Routes>
        <Route
          path=""
          element={
            userIdFromSession ? (
              <Navigate to="/organization-lists" />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organization-lists" element={<OrganizationList />} />
        <Route
          path="/create-organization"
          element={<GeneratorFormsContainer />}
        />
        <Route
          path="/edit-organization-schema"
          element={<GeneratorFormsContainer />}
        />
        <Route path="/organization/:id" element={<Dashboard />} />
        <Route
          path="/organization"
          element={<Navigate to="/organization-lists" />}
        />
        <Route
          path="/linkage-sidebar"
          element={
            <LinkageSidebar
              field={{
                name: "Issues",
                list: [],
                color: "purple",
                icon: "home",
                linkage: ["Tickets", "Issues"],
              }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> f2e2c04d7f3c66ddee0d6345484c1d449fb44dc7
};

export default App;

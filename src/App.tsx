import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Dashboard from "./components/Dashboard/Index";
import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganization/OrganizationList";
import { GeneratorFormsContainer } from "./components/SchemaGenerator/GeneratorFormsContainer";
import Filter from "./components/Filters/Filter";
import { getFromSession } from "./Utils/Auth";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setUserId } from "./redux/reducers/AuthSlice";
import { SidebarWrapper } from "./components/Sidebar/SidebarWrapper";

const App = () => {
	const userIdFromSession = getFromSession("userId");
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userIdFromSession) {
			dispatch(setUserId(userIdFromSession));
		}
	}, []);

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
};

export default App;

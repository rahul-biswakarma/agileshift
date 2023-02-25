import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
	const userId = getFromSession("userId");
	const dispatch = useAppDispatch();
	if(userId){
		dispatch(setUserId(userId));
	}
	const sideBarList = useAppSelector((state)=>state.sidebar.sideBarData)
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
					element={userId?<Navigate to="/orglist" />:<Navigate to="/signup" />}
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
					path="/orglist"
					element={<OrganizationList />}
				/>
				<Route
					path="/createOrg"
					element={<GeneratorFormsContainer />}
				/>
        <Route
					path="/filters"
					element={<Filter schema={[
						{ columnTitle: "Title", columnType: "string" },
						{ columnTitle: "Stage", columnType: "string" },
						{ columnTitle: "User", columnType: "string" },
						{ columnTitle: "Tags", columnType: "tag" },
						{ columnTitle: "Severity", columnType: "string" },
						{ columnTitle: "Type", columnType: "string" },
						{ columnTitle: "Part", columnType: "string" }
					]} />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;

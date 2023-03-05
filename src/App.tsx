import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard/Index";
import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganization/OrganizationList";
import { GeneratorFormsContainer } from "./components/SchemaGenerator/GeneratorFormsContainer";
import { getFromSession } from "./Utils/Auth";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setUserId } from "./redux/reducers/AuthSlice";
import SideBarScreen from "./components/Sidebar";
import Storm from "./components/Storm";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrganisationForm } from "./components/ManageOrganization/OrganisationForm";


const App = () => {
	const userIdFromSession = getFromSession("userId");
	const dispatch = useAppDispatch();

	if (userIdFromSession) {
		dispatch(setUserId(userIdFromSession));
	}

	const sideBarList = useAppSelector((state) => state.sidebar.sideBarData);
	return (
		<BrowserRouter>
			<ToastContainer position="bottom-right" />
			{sideBarList.length !== 0 && (
				<section className="fixed right-0 z-50">
					<SideBarScreen />
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
					path="/organization-lists"
					element={<OrganizationList />}
				/>
				<Route
					path="/create-organization"
					element={<GeneratorFormsContainer mode="create" />}
				/>
				<Route
					path="/edit-organization-schema"
					element={<GeneratorFormsContainer mode="edit" />}
				/>
				<Route
					path="/edit-organization-details"
					element={<OrganisationForm mode="edit" />}
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
					path="/storm"
					element={<Storm organizationId="oTkstJOfcWoo1sHTOCLo" />}
				/>
				
				
			</Routes>
		</BrowserRouter>
	);
};

export default App;

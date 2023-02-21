import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganisation/OrganizationList";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/orglist"
					element={<OrganizationList />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;

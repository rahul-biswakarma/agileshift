import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route 
					path="" 
					element={<Navigate to="/signup" />} 
				/>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;

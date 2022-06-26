import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { BrowserRouter } from 'react-router-dom';

// MUI imports
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Components
import Home from "./components/Home";
import Login from "./components/Login";
import Listings from "./components/Listings";
import Header from "./components/Header";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ListingDetail from "./components/ListingDetail";
import AddProperty from "./components/Property";

// Contexts
import DispatchContext from "./contexts/DispatchContext";
import StateContext from "./contexts/StateContext";

function App() {
	const initialState = {
		userUsername: localStorage.getItem("theUserUsername"),
		userEmail: localStorage.getItem("theUserEmail"),
		userId: localStorage.getItem("theUserId"),
		userToken: localStorage.getItem("theUserToken"),
		userIsLogged: localStorage.getItem("theUserUsername") ? true : false,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchToken":
				draft.userToken = action.tokenValue;
				break;
			case "userSignsIn":
				draft.userUsername = action.usernameInfo;
				draft.userEmail = action.emailInfo;
				draft.userId = action.IdInfo;
				draft.userIsLogged = true;
				break;

			case "logout":
				draft.userIsLogged = false;
				break;
			default: { // added brackets
				console.log('Empty action received.');
			}
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	useEffect(() => {
		if (state.userIsLogged) {
			localStorage.setItem("theUserUsername", state.userUsername);
			localStorage.setItem("theUserEmail", state.userEmail);
			localStorage.setItem("theUserId", state.userId);
			localStorage.setItem("theUserToken", state.userToken);
		} else {
			localStorage.removeItem("theUserUsername");
			localStorage.removeItem("theUserEmail");
			localStorage.removeItem("theUserId");
			localStorage.removeItem("theUserToken");
		}
	}, [state.userIsLogged]);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<StyledEngineProvider injectFirst>
					<BrowserRouter>
						<CssBaseline />
						<Header />
						<Routes>
							{/* <Route path="/activate/:uid/:token" element={<Activation />} /> */}
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/addproperty" element={<AddProperty />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/listings/:id" element={<ListingDetail />} />
							<Route path="/listings" element={<Listings />} />

							{/* <Route path="/profile" element={<Profile />} /> */}
							{/* <Route path="/agencies" element={<Agencies />} />
							<Route path="/agencies/:id" element={<AgencyDetail />} />
							<Route path="/listings/:id" element={<ListingDetail />} /> */}
						</Routes>
					</BrowserRouter>
				</StyledEngineProvider>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;
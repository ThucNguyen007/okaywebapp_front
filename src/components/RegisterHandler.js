import React, { useContext } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import {
	Grid,
	AppBar,
	Typography,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	TextField,
	Snackbar,
	Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	formContainer: {
		width: "50%",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "3rem",
		border: "5px solid black",
		padding: "3rem",
	},
	loginBtn: {
		backgroundColor: "green",
		color: "white",
		fontSize: "1.1rem",
		marginLeft: "1rem",
		"&:hover": {
			backgroundColor: "blue",
		},
	},
});

function RegisterHandler() {
	const classes = useStyles();
	const navigate = useNavigate();
	const params = useParams();

	async function ActivationHandler() {
		try {
			const response = await Axios.post(
				"https://www.websitehostapitrademark.com/api-auth-djoser/users/activation/",
				{
					uid: params.uid,
					token: params.token,
				}
			);
			navigate("/login");
		} catch (e) {}
	}

	return (
		<div className={classes.formContainer}>
			<Typography variant="h4">
				Please click on the button below to activate your account!
			</Typography>
			<Button
				variant="contained"
				fullWidth
				style={{ marginTop: "1rem" }}
				onClick={ActivationHandler}
			>
				ACTIVATE
			</Button>
		</div>
	);
}

export default RegisterHandler;
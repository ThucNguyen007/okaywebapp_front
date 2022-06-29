import React from "react";

// MUI imports
import { Typography } from "@mui/material";
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

function Account() {
	const classes = useStyles();

	return (
		<div className={classes.formContainer}>
			<Typography variant="h4">
				Thanks for signing up! To activate your account, please click on the
				link that has been sent to you!
			</Typography>
		</div>
	);
}

export default Account;
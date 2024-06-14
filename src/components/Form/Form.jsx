import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { Snackbar } from "@mui/material";

const Form = ({ info, sendUserData }) => {
	const [user, setUser] = useState({
		username: "",
		password: ""
	});
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		setErrorMessage(info.error)
	}, [info]);

	const navigate = useNavigate();

	const handleRedirectTo = () => {
		navigate(`${info.href}`);
	};

	const handleChange = (e) => {
		setUser((prevData) => {
			return {
				...prevData,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleLogin = (e) => {
		e.preventDefault();
		sendUserData(user);
	};

	return (
		<>
			<Snackbar
				open={errorMessage.length !== 0}
				autoHideDuration={6000}
				onClose={() => setErrorMessage("")}
				message={errorMessage}
			/>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Container maxWidth="xs">
					<form
						onSubmit={handleLogin}
						style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
					>
						<TextField
							name="username"
							label="Login"
							required
							variant="outlined"
							value={user.username}
							onChange={handleChange}
						/>
						<TextField
							name="password"
							label="Password"
							required
							type="password"
							variant="outlined"
							value={user.password}
							onChange={handleChange}
						/>
						<Button variant="contained" color="primary" type="submit">
							{info.name1}
						</Button>

						<Button variant="contained" color="primary" onClick={handleRedirectTo}>
							{info.name2}
						</Button>

					</form>
				</Container>
			</Box>
		</>
	);
};

export default Form;
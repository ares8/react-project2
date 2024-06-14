import './Register.css'
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import { useState } from 'react';

const Register = () => {
	const [info, setInfo] = useState({
		name1: "Zarejestruj i zaloguj",
		name2: "Przejdź do logowania",
		href: "/signIn",
		error: ""
	});

	const navigate = useNavigate();

	const sendUserData = (user) => {
		const availableUsers = JSON.parse(localStorage.getItem("availableUsers")) || [];
		let isAvailableUser;

		if (availableUsers.length) {
			isAvailableUser = availableUsers.find(available => available.username === user.username);
		}

		if (isAvailableUser) {
			setInfo(prevInfo => {
				return { ...prevInfo, error: "Użytkownik o podanej nazwie już istnieje" }
			});
		} else {
			availableUsers.push(user);

			localStorage.setItem("availableUsers", JSON.stringify(availableUsers));
			localStorage.setItem("user", JSON.stringify(user));
			navigate("/dashboard");
		}

	};

	return (
		<>
			<Form
				info={info}
				sendUserData={(user) => sendUserData(user)}
			/>
		</>
	)
}

export default Register;
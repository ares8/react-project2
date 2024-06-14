import { useNavigate } from 'react-router-dom';
import './RedirectToDashboard.css'
import { useEffect } from 'react';

const RedirectToDashboard = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/signIn");
	}, [navigate]);

	return null;
};

export default RedirectToDashboard;
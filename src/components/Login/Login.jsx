import './Login.css'
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import { useState } from 'react';

const Login = () => {
  const [info, setInfo] = useState({
    name1: "Zaloguj",
    name2: "Przejdź do rejestracji",
    href: "/register",
    error: ""
  });

  const navigate = useNavigate();

  const sendUserData = (user) => {
    const availableUsers = JSON.parse(localStorage.getItem("availableUsers")) || [];
    let isAvailableUser;

    if (availableUsers.length) {
      isAvailableUser = availableUsers.find(available => available.username === user.username && available.password === user.password);
    }

    if (isAvailableUser) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setInfo(prevInfo => {
        return { ...prevInfo, error: "Brak użytkownika w systemie" }
      });
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

export default Login;
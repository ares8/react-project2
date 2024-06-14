import { useNavigate } from "react-router-dom";
import Paragraph from "../Paragraph/Paragraph";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const userName = JSON.parse(localStorage.getItem("user"))?.username;

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/signIn");
  };


  return (
    <div className="header">
      <Paragraph paragraphText={`Jesteś zalogowany jako: ${userName}`} />
      <button onClick={logOut}>Wyloguj</button>
    </div>
  );
};

export default Header;

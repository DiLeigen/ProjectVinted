import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../pages/css/Login.css"

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, { expires: 14 });
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.data);
    }
  };

  return (
    <div className="signup-container"
    >
      <form className="signup-form"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleLogin}
      >
        <h1>Se connecter</h1>
        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit" value="Se connecter">Se connecter</button>
        <Link to="/signup">Pas encore de compte ? Inscris-toi</Link>
      </form>
    </div>
  );
};

export default Login;

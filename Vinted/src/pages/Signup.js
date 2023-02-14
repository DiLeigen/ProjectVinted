import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../pages/css/Singnup.css"


const Signup = ({ handleToken }) => {
  // States qui gèrent mes inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  //   Permet de naviguer
  const navigate = useNavigate();

  //   Fonction qui sera appelée quand je clique sur le bouton submit
  const handleSignup = async (event) => {
    event.preventDefault();
    //   Je fais disparaitre le message d'erreur
    setErrorMessage("");
    try {
      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoie
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      //   Si je reçois bien un token
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, { expires: 14 });
        // Je l'enregistre dans mon state et mes cookies
        handleToken(response.data.token);
        // Et je redirige vers Home
        navigate("/");
      }
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      //   Si je reçois un message d'erreur "This email already has an account"
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      //   Si je reçois un message d'erreur "Missing parameters"
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp.");
      }
    }
  };

  return (
    <div className="signup-container"
    >
      <form className="signup-form"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSignup}
      >
        <h1>S'inscrire</h1>
        <input
          value={username}
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          value={email}
          type="mail"
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
        <div className="checkbox-container">
          <input
            checked={newsletter}
            type="checkbox"
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <span>S'inscrire à notre newsletter</span>
          <p>En m'inscrivant je confirme 
            avoir lu et accepté les Termes & Conditions et Politique 
            de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit" value="S'inscrire">S'inscrire</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <a href="/login">Tu as déjà un compte, connecte-toi !</a>
      </form>
    </div>
  );
};

export default Signup;

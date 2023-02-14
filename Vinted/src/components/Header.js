import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../components/Header.css"
import logo from './img/logo.png'




const Header = ({ handleToken, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");
  return (
    <div className="header-container">
      
      <div className="logo">
      <Link to="/">
          <img  className="header-logo" src={logo}/>
      </Link>
      </div>
    
      <div className="search-container">
        <input className="search-input"
           value={search}
           type="text"
           placeholder="Rechercher des articles ..."
           onChange={(event) => {
             setSearch(event.target.value);
           }}
        ></input>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 search-input-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
      </div>
    <header>
      {/* Si le token existe, on affiche déconnexion, sinon s'inscrire et se connecter */}
      {token ? (
        <button className="deconection"
          onClick={() => {
            // Cookies.remove("token-vinted");
            handleToken(null);
          }}
        >
          Se Déconnecter
        </button>
      ) : (
        <>
          <Link to="/signup">
            <button className="header-button button-login-signup button-signup">S'inscrire</button>
          </Link>
          <Link to="/login">
            <button class="header-button button-login-signup">Se connecter</button>
          </Link>
        </>
      )}
    <Link to={token ? "/publish" : "/login"}>
        <button   class="headerr-button buttonn-sold">Vends tes articles</button>
      </Link>
    </header>
  </div>
  );
};
export default Header;


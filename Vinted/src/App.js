import "./pages/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

// Component
import Header from "./components/Header";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Je je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);

  const {search, setSearch } = useState ("");

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-vinted");
    }
  };

  return (
    <Router>
    {/* Je peux passer des props à mes composants */}
    <Header
      token={token}
      search={search}
      handleToken={handleToken}
      setSearch={setSearch}
    />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;

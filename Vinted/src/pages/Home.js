import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OfferCard from "../components/OfferCard";
import "../pages/css/Home.css"

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
        <div class="home-hero-bg-img">
          <img src="" alt="" class="home-hero-forme"></img>
        </div>
      <div className="pret">
        <div class="home-hero-ready">
          Prêts à faire du tri dans vos placards ?
          <Link to="/publish">
              <button>Commencer à vendre</button>
          </Link>
        </div>
      </div>
        <div className="home-card-wrapper">
          {data.offers.map((offer) => {
            return <OfferCard offerInfos={offer} key={offer._id} />;
          })}
        </div>
      </div>
  );
};

export default Home;

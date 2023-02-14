import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../pages/css/Offer.css"

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Je récupère l'id présent dans l'url
  const params = useParams();
  const id = params.id;
  //   console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="offer-body">
      <div className="offer-container">
      <div  className="offer-picture">
        <img src={data.product_image.secure_url} alt="product" />
      </div>

      <div className="offer-infos">
        <div className="offer-list">
        <p className="price">{data.product_price} €</p>
      {/* Je parcours product_details */}
      {data.product_details.map((detail, index) => {
        // Je récupère le nomde la clef de detail
        const key = Object.keys(detail)[0];
        // console.log(key);
        // console.log(detail[key]);
        return (
          
          <div key={index}>
            {/* J'affiche le nom dela clef  */}
            <span className="one">{key} : </span>
            {/* et son contenu */}
            <span className="two">{detail[key]}</span>
          </div>
        );
      })}
    </div>

      <div className="divided"></div>

      <div className="offer-content">
        <p className="name">{data.product_name}</p>
        <p class="description">{data.product_description}</p>
        <p class="offer-avatar-username">{data.owner.account.username}</p>
      </div>
      <button className="offer-infos">Acheter</button>
    </div>
    </div>
    </div>
  );
};

export default Offer;

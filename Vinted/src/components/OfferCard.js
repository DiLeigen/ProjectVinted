import { Link } from "react-router-dom";
import "../pages/css/OfferCard.css" 

const OfferCard = ({ offerInfos }) => {
  //   console.log(props);
  return (
    // <p>salut</p>
    <Link to={`/offer/${offerInfos._id}`}>
      <article className="card-container">
          {/* Si le vendeur a un avatar, je l'affiche */}
          <div className="card-avatar-username">
              {offerInfos.owner.account.avatar && (
                <img className="avatar"
                  src={offerInfos.owner.account.avatar.secure_url}
                  alt="owner"
                />
              )}
              <span>{offerInfos.owner.account.username}</span>
            </div>
            <img className="offertImg"
              src={offerInfos.product_image.secure_url}
              alt="product"
            />
        <div className="card-price-size-brand">
        <p className="prix">{offerInfos.product_price} €</p>
        {/* <p> Taille : {offerInfos.product_details[1].TAILLE}</p> */}
        {/* Column-reverse permet d'inverser l'ordre de mes p */}
        
          {/* Je parcours procuct_detail */}
          {offerInfos.product_details.map((detail, index) => {
            // console.log(detail);
            // Si l'objet detail a une clef TAILLE, je l'affiche
            if (detail.TAILLE) {
              return <p className="detaille" key={index}>{detail.TAILLE}</p>;
            } else if (detail.MARQUE) {
              // Si l'objet a un clef MARQUE je l'affiche
              return <p className="detaille" key={index}>{detail.MARQUE}</p>;
            } else {
              return null;
            }
          })}
        </div>
      </article>
    </Link>
  );
};

export default OfferCard;

import { Navigate } from "react-router-dom";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import "../pages/css/Publish.css"
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.data);
    }
  };

  return token ? (
<div className="publish-main">
    <div className="publish-container"
    >
    <h2>Vends ton article !</h2>
      <form onSubmit={handleSubmit}>
        <div className="file-select">
            <div className="dashed-preview-without">
                <div className="input-design-default">
                    <label className="label-file"
                    htmlFor="file"
                    >
                    <span class="input-sign">+</span>
                    <span className="Choisir">Choisis une image</span>
                    </label>
                    <input className="input"
                    id="file"
                    type="file"
                    onChange={(event) => {
                        setPicture(event.target.files[0]);
                    }}
                    />
                </div>
            </div>
        </div>
        {picture && <img src={URL.createObjectURL(picture)} alt="product" />}

        <div className="text-input-section">
            <div className="text-input">
                <CustomInput title={"Titre"} state={title} setState={setTitle} />
            </div>
            <CustomInput
            textArea
            title="Décris ton article"
            state={description}
            setState={setDescription}
        />

        </div>


        <CustomInput title={"Marque"} state={brand} setState={setBrand} />
        <CustomInput title={"Taille"} state={size} setState={setSize} />
        <CustomInput title={"Couleur"} state={color} setState={setColor} />
        <CustomInput title={"Etat"} state={condition} setState={setCondition} />
        <CustomInput title={"Lieu"} state={city} setState={setCity} />
        <CustomInput title={"Prix"} state={price} setState={setPrice} />
        <input type="submit" value="Publier l'offre" />
      </form>
    </div>
</div>
  ) : (
    <Navigate to="/login" />
  );
};


export default Publish;

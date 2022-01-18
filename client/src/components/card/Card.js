import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ image, title, diets, id1 }) => {
/*   console.log("diets", diets);
  console.log("diets", Array.isArray(diets)); */
  /* https://i.ytimg.com/vi/8HsAdolRa70/maxresdefault.jpg */
  /* https://carolinarice.com/wp-content/uploads/2019/05/Mexican-Style-Arroz-con-Pollo.jpg */

  if (typeof diets[0] === "object") {
    var diets = diets.map((diet) => diet.diets);
  }
/* console.log('id', id) */
  return (
    <div className="cover">
      <div className="image">
        <Link to={`/detail/${id1}`} ><img src={image} width="312px" height="231px" alt="not found" /></Link>
      </div>
      <div className="foot">
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <h3>{diets}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;

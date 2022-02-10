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
  return (
    <div className='container'>

      <div className='card'>
        <div className='left-colum background1-left-column'>
        <Link to={`/detail/${id1}`}>
           <img width='auto' height='auto' src={image} alt="not found" />
         </Link>
          {/* <h6>{diets}</h6> */}
          <h2>{title}</h2>
          <i className='fa fa-github' aria-hidden='true'></i>
        </div>
        <div className='right-column'>
          <div>
            <h4>Dificultad</h4>
            <h6>media - baja</h6>
          </div>
          <h2>{diets}</h2>
          <p>Lorem ipsum dolor</p>
          <button className='button'>Empezar</button>
        </div>
      </div>

    </div>
    );
  };
  
  export default Card;
  
  /*  <div className="container">
     <div className='card'>
       <div className="imgBx">
         <Link to={`/detail/${id1}`}>
           <img src={image} alt="not found" />
         </Link>
       </div>
       <div className="content">
           <h3>{title}</h3>
           <h3>{`${diets } `} </h3>
       </div>
     </div>
   </div> */
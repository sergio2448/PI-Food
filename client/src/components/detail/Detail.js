import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipesById } from '../../actions/index.js';
import './Detail.css';
import NavBar from '../navBar/NavBar'
import spoonacular from '../../assets/spoonacular.png'



function validate(id) {

    if((id.length <= 6)&&(id.length > 0)) {
        for(let i = 0; i < id.length; i++) {
            if(!Number.isInteger(id[i] * 1)) return false
        }
    }else if( id.length < 36){
        return false
    }
    return true
}


function Detail() {
  console.log('entrando')
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.detail) 
  const {id1} = useParams()
  console.log('detail', detail)
  console.log( 'id1', id1)
  
  useEffect(() => {
    console.log('entrando al useEffect')
    if (validate(id1)) dispatch(getRecipesById(id1))
  }, [])
    
    return (
        <div className="wrap">
            <div>
                <NavBar></NavBar>
            </div>
            {detail[0] && detail[0].title ? <h1 className='name'>{detail[0].title}</h1> : <h1 className='name'>Receta no encontrada</h1>}
            <div className = 'card'>
                <div className= 'ima'>
                    <img src={detail[0] && detail[0].image} className='img' alt= {spoonacular} />
                </div>
                <div className = 'dietss'>
                    <h4>Tipo de dietas</h4>
                    {detail[0] && detail[0].diets?.map((diet, index) => <p key={index} >{diet}</p>)}
                </div>
            </div>
            <div className='score'>
                <div className='scores'>
                    <h3 className = 'h3score'>Puntaje de receta: {detail[0] && detail[0].spoonacularScore}</h3>
                </div>
                <div className= 'scores'>
                    <h3 className = 'h3score'>Puntaje saludable: {detail[0] && detail[0].healthScore}</h3>
                </div>
            </div>
            <div className = 'summaries'>
                <div className='summarysteps'>
                    <h3>Summary</h3>
                    <p dangerouslySetInnerHTML={{ __html: detail[0] && detail[0].summary }} />
                </div>
            </div>
        </div>
    )
}

export default Detail
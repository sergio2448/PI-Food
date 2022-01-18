import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import henry from '../../assets/henry.jpg'
import spoonacular from '../../assets/spoonacular-sp.png'

function NavBar() {


    return (
        <div className="navigation">
            <div className="contimg">
                <div>
                    <img 
                    src={spoonacular}
                    alt = 'image not found'
                    height = '80px' width = '80px'
                    />
                </div>
                <div>
                    <img 
                    src={henry}
                    alt = 'image not found'
                    height = '80px' width = '80px'
                    />
                </div>
            </div>    
                <div>
                <Link to='/'>
                    <button className='btn-neon'>Inicio</button>
                </Link>
                <Link to='/home'>
                    <button className='btn-neon'>Home</button>
                </Link>
                <Link to='/form'>
                    <button className='btn-neon'>Crear receta</button>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
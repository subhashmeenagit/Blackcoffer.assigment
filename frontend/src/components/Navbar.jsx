import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>

            <h1>Blackcoffer</h1>
            <div>
                <Link to='/'> Home</Link>
                <Link to='/chart'> Chart</Link>
            </div>


        </div>
    )
}

export default Navbar
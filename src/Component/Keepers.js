import React from 'react'
import Cart from './picz/cart.jpg'

const keepers = () => {
    return (
        <div className='header'>
            <img className='image' src={Cart} alt="nawaoo" />
            <div className='theme'>
                <h1>DISCOVER A NEW WORLD</h1>
                <h2>GET A BOOK AND READ!</h2>
            </div>
        </div>
    )
}

export default keepers
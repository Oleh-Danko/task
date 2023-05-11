import React from 'react'
import './success.scss'

export default function Success() {
  return (
    <div className='success'>
      <div className="container">
        <h2 className="success__title title">User successfully registered</h2>
        <div className="success__img">
          <img src="./img/success-image.svg" alt="success" />
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import './Preloader.css'

const Preloader = ({ isAppLoading }) => {
  return (
    <div className={`preloader${isAppLoading ? ' preloader_size_large' : ''}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader

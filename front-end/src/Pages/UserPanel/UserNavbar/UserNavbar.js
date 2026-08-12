import React from 'react'
import './UserNavbar.css'
import Sidebar from '../../../Components/UserPanel/Sidebar/Sidebar';

export default function UserNavbar() {

  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const persianDate = today.toLocaleDateString('fa-IR', options);

  return (
    <>
      <div className='container bg'>
        <div className='courses-top-bar'>
          
          <div className="courses-top-bar__right">
            <div className='sidebar-editing'>
              <Sidebar/>
            </div>
            
            <form action="#" className="courses-top-bar__form">
              <input type="text" className="courses-top-bar__input" placeholder="جستجوی دوره ..." />
              <i className="fas fa-search courses-top-bar__search-icon"></i>
            </form>
          </div>
          <div className="courses-top-bar__left1">
            <div className='icon-pac'>
              <i className="fa-regular fa-moon icon-style1"></i>
              <i className="fa-solid fa-cart-shopping icon-style1"></i>
              <i className="fa-regular fa-bell icon-style1"></i>
            </div>
            <div className="divider"></div>
            <div className='date'>
              <span className='p-edit'>{persianDate}</span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

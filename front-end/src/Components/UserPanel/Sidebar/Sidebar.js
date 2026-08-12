import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthContext from '../../../context/authContext'
import swal from 'sweetalert'
import './Sidebar.css'
import { motion, AnimatePresence } from "framer-motion"


export default function Sidebar() {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  function logoutUser(event) {
    event.preventDefault()
    swal({
      title: 'ایا از خروج مطمئنید؟',
      icon: 'warning',
      buttons: ["نه", "اره"]
    }).then(result => {
      if (result) {
        swal({
          title: 'با موفقیت خارج شدید',
          icon: 'success',
          buttons: "ok"
        }).then(() => {
          authContext.logout();
          navigate('/')
        })
      }
    })
  }

  const allMenus = [
    {
      id: 1,
      title: "خانه",
      href: "/",
      icon: "fa-solid fa-house icon-style",
    },
    {
      id: 2,
      title: "سفارش‌ها",
      href: "/my-account/orders",
      icon: "fa-solid fa-cart-shopping icon-style",
    },
    {
      id: 3,
      title: "کیف پول من",
      href: "/my-account/wallet",
      icon: "fa-solid fa-wallet icon-style",
    },
    {
      id: 4,
      title: "جزئیات حساب کاربری",
      href: "/my-account/edit-panel",
      icon: "fa-solid fa-cloud icon-style",
    },
    {
      id: 5,
      title: "دوره‌های من",
      href: "/my-account/bought",
      icon: "fa-solid fa-bolt icon-style",
    },
    {
      id: 6,
      title: "تیکت‌ها",
      href: "/my-account/tickets",
      icon: "fa-solid fa-ticket icon-style",
    },
  ]


  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index)
  }

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar">
          <div className='main-line'>
            <div className='sidebar-topbar'>
              <img className='profile-img' src="/images/user1.png" alt="" />
              <div className='user-info'>
                <span className="sidebar__name">محمدامین</span>
                <span className="phone">09123239876</span>
              </div>
              <div className='profile-icon'>
                <i className="fa-solid fa-arrow-right-from-bracket logout-icon"></i>
                <i className="fa-solid fa-gear setting-icon"></i>
              </div>
            </div>
          </div>

          <ul className="sidebar__list">

            <li className={`sidebar__item ${location.pathname === '/my-account' ? 'active-link' : ''}`} onClick={() => navigate('/my-account')} >
              <i className={`fa-solid fa-house icon-style`}></i>
              <Link className={`sidebar__link ${location.pathname === '/my-account' ? 'active' : ''}`} to="/my-account">
                خانه
              </Link>
            </li>

            <li className={`sidebar__item ${location.pathname === '/my-account/orders' ? 'active-link' : ''}`} onClick={() => navigate('/my-account/orders')} >
              <i className={`fa-solid fa-cart-shopping icon-style`}></i>
              <Link className={`sidebar__link ${location.pathname === '/my-account/orders' ? 'active' : ''}`} to="/my-account/orders">
                سفارش‌ها
              </Link>
            </li>

            <li className={`sidebar__item ${location.pathname === '/my-account/wallet' ? 'active-link' : ''}`} onClick={() => navigate('/my-account/wallet')} >
              <i className="fa-solid fa-wallet icon-style"></i>
              <Link className={`sidebar__link ${location.pathname === '/my-account/wallet' ? 'active' : ''}`} to="/my-account/wallet">کیف پول من</Link>
            </li>

            <li className={`sidebar__item ${location.pathname === '/my-account/edit-panel' ? 'active-link' : ''}`} onClick={() => navigate('/my-account/edit-panel')} >
              <i className={`fa-solid fa-cloud icon-style`}></i>
              <Link className={`sidebar__link ${location.pathname === '/my-account/edit-panel' ? 'active' : ''}`} to="/my-account/edit-panel">
                جزئیات حساب کاربری
              </Link>
            </li>

            <li className={`sidebar__item ${location.pathname === '/my-account/bought' ? 'active-link' : ''}`} onClick={() => navigate('/my-account/bought')} >
              <i className={`fa-solid fa-bolt icon-style`}></i>
              <Link className={`sidebar__link ${location.pathname === '/my-account/bought' ? 'active' : ''}`} to="/my-account/bought">
                دوره‌های من
              </Link>
            </li>

            <li className={`sidebar__item ${location.pathname === '/my-account/tickets' ? 'active-link' : ''}`} onClick={() => navigate('/my-account/tickets')} >
              <i className={`fa-solid fa-ticket icon-style`}></i>
              <Link className={`sidebar__link ${location.pathname === '/my-account/tickets' ? 'active' : ''}`} to="/my-account/tickets">
                تیکت‌ها
              </Link>
            </li>

            <li className="sidebar__item">
              <i className="fa-solid fa-arrow-right-from-bracket icon-style"></i>
              <a className="sidebar__link" href="#" onClick={logoutUser}>خروج از سیستم</a>
            </li>

          </ul>
        </div>
      </div>
      {/* hamburger button */}
      <div className='hamburger' onClick={() => setIsOpen(true)}>
        <div className='hamburger-line'></div>
        <div className='hamburger-line'></div>
        <div className='hamburger-line'></div>
      </div>
      {/* mobile menu */}
      {/* mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='mobile-menu'
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28 }}
            key="mobile-menu"
          >
            {/* Header with avatar + name */}
            <div className='mobile-menu__header'>
              <div className='mobile-menu__profile'>
                <img
                  src={authContext?.userInfos?.avatar || '/Images/user.png'}
                  alt='avatar'
                  className='mobile-menu__avatar'
                />
                <div className='mobile-menu__profile-info'>
                  <div className='mobile-menu__name'>
                    {authContext.isLoggedIn ? authContext.userInfos.name : 'خوش آمدید'}
                  </div>
                  <div className='mobile-menu__role'>
                    توسعه‌دهنده فرانت‌اند
                  </div>
                </div>
              </div>

              <div className='mobile-menu__header-actions'>
                <Link to="" className='mobile-menu__settings' onClick={() => setIsOpen(false)}>
                  <i className="fas fa-cog"></i>
                </Link>

                <button
                  className='mobile-menu__close-btn'
                  onClick={() => {
                    setIsOpen(false)
                    setActiveSubmenu(null)
                  }}
                  aria-label="بستن منو"
                >
                  <i className='fas fa-times'></i>
                </button>
              </div>
            </div>

            {/* Menu list */}
            <ul className='mobile-menu__list'>

              {allMenus.map((menu, index) => (
                <li className='mobile-menu__item' key={menu.id}>
                  <div className='mobile-menu__link' onClick={() => {
                    if (menu.submenus.length > 0) toggleSubmenu(index)
                    else setIsOpen(false)
                  }}>
                    <Link
                      to={`${menu.href}`}
                      onClick={(e) => {
                        if (menu.submenus.length > 0) {
                          e.preventDefault()
                          toggleSubmenu(index)
                        } else {
                          setIsOpen(false)
                        }
                      }}
                      className="mobile-menu__title-link"
                    >
                      <i className={menu.icon}></i>
                      {menu.title}
                    </Link>

                  </div>

                </li>
              ))}

            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}

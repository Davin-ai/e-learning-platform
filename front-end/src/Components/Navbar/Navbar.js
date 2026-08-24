import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import AuthContext from '../../context/authContext'
import { data, Link } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {

  const authContext = useContext(AuthContext)
  const [allMenus, setAllMenus] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/menus`)
      .then(res => res.json())
      .then(data => {
        console.log("MENUS FROM API:", data)

        const menus = data.map(menu => ({
          ...menu,
          submenus: menu.submenus || []
        }))

        setAllMenus(menus)
      })
      .catch(err => console.error("Menu fetch error:", err))
  }, [])

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index)
  }

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <Link to={'/'}>
              <img
                src="/images/logo/Logo.png"
                className="main-header__logo"
                alt="لوگوی سبزلرن"
              />
            </Link>

            {/* desktop menu*/}
            <ul className="main-header__menu">
              <li className="main-header__item">
                <a href="/" className="main-header__link">
                  صفحه اصلی
                </a>
              </li>

              {
                allMenus.map((items) => (
                  <li className="main-header__item">
                    <Link to={`/category-info/${items.href}/1`} className="main-header__link">
                      {items.title}
                      {
                        items.submenus.length !== 0 && (
                          <>
                            <i className="fas fa-angle-down main-header__link-icon"></i>
                            <ul className="main-header__dropdown">
                              {
                                items.submenus.map((submenu) => (
                                  <li className="main-header__dropdown-item">
                                    <Link to={submenu.href} className="main-header__dropdown-link">
                                      {submenu.title}
                                    </Link>
                                  </li>
                                ))
                              }

                            </ul>
                          </>
                        )
                      }
                    </Link>
                  </li>
                ))
              }
            </ul>
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
                    <li className='mobile-menu__item'>
                      <Link to="/" className='mobile-menu__link' onClick={() => setIsOpen(false)}>
                        <span>صفحه اصلی</span>
                        <i className="fas fa-home mobile-menu__icon"></i>
                      </Link>
                    </li>

                    {allMenus.map((menu, index) => (
                      <li className='mobile-menu__item' key={menu.id}>
                        <div className='mobile-menu__link' onClick={() => {
                          if (menu.submenus.length > 0) toggleSubmenu(index)
                          else setIsOpen(false)
                        }}>
                          <Link
                            to={`/category-info/${menu.href}/1`}
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
                            {menu.title}
                          </Link>

                          {menu.submenus.length > 0 ? (
                            <i className={`fas fa-angle-${activeSubmenu === index ? 'up' : 'down'} mobile-menu__arrow`}></i>
                          ) : (
                            <i className={`mobile-menu__icon '}`}></i>
                          )}
                        </div>

                        {/* animated submenu using framer-motion */}
                        <AnimatePresence>
                          {menu.submenus.length > 0 && activeSubmenu === index && (
                            <motion.ul
                              className='mobile-menu__submenu'
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                            >
                              {menu.submenus.map(sub => (
                                <li className='mobile-menu__submenu-item' key={sub.id}>
                                  <Link
                                    to={sub.href}
                                    className='mobile-menu__submenu-link'
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {sub.title}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}

                  </ul>
                </motion.div>
              )}
            </AnimatePresence>


          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            {
              authContext.isLoggedIn ? (
                <Link to="/my-account" className="main-header__profile">
                  <span className="main-header__profile-text">{authContext.userInfos.name}</span>
                </Link>
              ) : (
                <Link to="/login" className="main-header__profile">
                  <span className="main-header__profile-text">ورود / ثبت نام</span>
                </Link>
              )
            }

          </div>
        </div>
      </div>
    </div>
  )
}


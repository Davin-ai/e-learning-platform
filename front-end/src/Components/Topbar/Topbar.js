import React, { memo, useEffect, useState } from 'react'
import './Topbar.css'
import { Link } from 'react-router-dom'

export default memo(function Topbar() {


  const [allTopBarLinks, setAllTopBarLinks] = useState([])
  const [indexInfo, setIndexInfo] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/index`).then((res) => res.json()).then((data) => {
      console.log(data);
      setIndexInfo(data)
    })
  }, [])


  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`).then(res => res.json())
      .then(data => setAllTopBarLinks(data)
      )
  }, [])

  const getRandomItemsFromArray = (arr, randomCount) => {
    const shufled = [...arr].sort(() => 0.5 - Math.random())
    return shufled.slice(0, randomCount)
  }


  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {
                getRandomItemsFromArray(allTopBarLinks, 5).map((link) => (
                  <li className="top-bar__item">
                    <Link href={link.href} className="top-bar__link">
                      {link.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                {
                  indexInfo.email
                }
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                {
                  indexInfo.phone
                }
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

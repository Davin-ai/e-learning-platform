import React, { useEffect, useState } from 'react'

import './Paginiation.css'
import { Link, useParams } from 'react-router-dom'

export default function Paginiation({ items, itemsCount, pathname, setShownCourses }) {

  const { page } = useParams()
  const [pageCount, setPageCount] = useState(null)

  useEffect(() => {
    let endIndex = itemsCount * page
    let startIndex = endIndex - itemsCount
    let paginatedItems = items.slice(startIndex, endIndex)
    setShownCourses(paginatedItems)

    let pagesNumber = Math.ceil(items.length / itemsCount)
    setPageCount(pagesNumber)
  }, [page, items])

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">

        {
          Array(pageCount).fill(0).map((item, index) => (
            <li className="courses__pagination-item">
              {
                index + 1 === Number(page) ? (
                  <Link to={`${pathname}/${index + 1}`} className="courses__pagination-link courses__pagination-link--active">
                    {
                      index + 1
                    }
                  </Link>
                ) : (
                  <Link to={`${pathname}/${index + 1}`} className="courses__pagination-link">
                    {
                      index + 1
                    }
                  </Link>
                )
              }
            </li>
          ))
        }

        {/* <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </a>
        </li>
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link courses__pagination-link--active">
            1
          </a>
        </li>
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            2
          </a>
        </li>
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            3
          </a>
        </li>
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </a>
        </li> */}
      </ul>
    </div>
  )
}

import React, { useState } from 'react'
import './CourseBox.css'
import CircleSpinner from '../CircleSpinner/CircleSpinner'
import { Link } from 'react-router-dom'

function CourseBox(props) {

  const [isImgLoaded, setIsImgLoaded] = useState(false)

  const onImgLoaded = () => setIsImgLoaded(true)

  console.log('COURSE COVER:', props.cover)

  return (

    <div className="col-12 col-md-4 main-1" style={{ width: `${props.isSlider && '100%'}` }}>
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}`}>
          {/* src={`${process.env.REACT_APP_API_URL}/v1/courses/covers/${props.cover}`} */}
          <img
             src={`${process.env.REACT_APP_API_URL}/courses/covers/${props.cover}`}
            alt={props.name}
            className="course-box__img"
            onLoad={onImgLoaded}
          />
        </Link>
        {
          !isImgLoaded && (
            <CircleSpinner />
          )
        }
        <div className="course-box__main">
          <Link to={`/course-info/${props.shortName}`} className="course-box__title">{props.name}</Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" className="course-box__teacher-link">{props.creator}</a>
            </div>
            <div className="course-box__rating">
              {
                Array(5 - props.courseAverageScore).fill(0).map(item => (
                  <img src='/images/svgs/star.svg' alt='rating' className='course-box__star' />
                ))
              }
              {
                Array(props.courseAverageScore).fill(0).map(item => (
                  <img src='/images/svgs/star_fill.svg' alt='rating' className='course-box__star' />
                ))
              }
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">500</span>
            </div>
            <span className="course-box__price">
              {
                props.price === 0 ? 'رایگان' : props.price.toLocaleString()
              }
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link to={`/course-info/${props.shortName}`} className="course-box__footer-link">
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>
        {
          (props.price !== 0 && props.discount) && (
            <span className='course-box__discount'>%{props.discount}</span>
          )
        }

      </div>
    </div>

  )
}

export default CourseBox
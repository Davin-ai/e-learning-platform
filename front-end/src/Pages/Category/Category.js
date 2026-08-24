import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'

import './Category.css'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Paginiation from '../../Components/Paginiation/Paginiation'
import { useParams } from 'react-router-dom'

function Category() {

  const [courses, setCourses] = useState([])
  const [orderedCourses, setOrderedCourses] = useState([])
  const [shownCourses, setShownCourses] = useState([])
  const [status, setStatus] = useState('default')
  const [statusTitle, setStatusTitle] = useState('مرتب سازی پیش فرض')
  const [searchValue, setSearchValue] = useState('')
  const [courseDisplayType, setCourseDisplayType] = useState('row')

  const { categoryName } = useParams()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(result => {
        console.log('fetch result:', result)
        setCourses(result)
        setOrderedCourses(result)
      })
  }, [categoryName])

  useEffect(() => {
    switch (status) {
      case 'free': {
        const freeCourses = courses.filter(course => course.price === 0)
        setOrderedCourses(freeCourses)
        break
      }
      case 'money': {
        const notFreeCourses = courses.filter(course => course.price !== 0)
        setOrderedCourses(notFreeCourses)
        break
      }
      case 'last': {
        setOrderedCourses(courses)
        break
      }
      case 'first': {
        const firstCourses = courses.slice().reverse()
        setOrderedCourses(firstCourses)
        break
      }
      default: {
        setOrderedCourses(courses)
      }
    }
  }, [status])

  const statusTitleHandler = event => {
    setStatusTitle(event.target.textContent)
  }

  const searchValueOnChangeHandler = (event) => {
    setSearchValue(event.target.value)
    const filteredCourses = courses.filter(course => course.name.includes(event.target.value))
    setOrderedCourses(filteredCourses)
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <section className="courses">
        <div className="container">
          <div className="courses-top-bar">

            <div className="courses-top-bar__right">
              <div className={`courses-top-bar__row-btn ${courseDisplayType === 'row' ? 'courses-top-bar__icon--active' : ''}`} onClick={() => setCourseDisplayType('row')}>
                <i className="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div className={`courses-top-bar__column-btn ${courseDisplayType === 'column' ? 'courses-top-bar__icon--active' : ''}`} onClick={() => setCourseDisplayType('column')}>
                <i className="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  {
                    statusTitle
                  }
                  <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul className="courses-top-bar__selection-list">
                  <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active"
                    onClick={(event) => {
                      setStatus('مرتب سازی پیش فرض')
                      statusTitleHandler(event)
                    }}
                  >مرتب سازی پیش فرض</li>
                  <li className="courses-top-bar__selection-item" onClick={(event) => {
                    setStatus('free')
                    statusTitleHandler(event)
                  }}>مرتب سازی بر اساس دوره های رایگان</li>
                  <li className="courses-top-bar__selection-item" onClick={(event) => {
                    setStatus('money')
                    statusTitleHandler(event)
                  }}>مرتب سازی بر اساس دوره های پولی</li>
                  <li className="courses-top-bar__selection-item" onClick={(event) => {
                    setStatus('last')
                    statusTitleHandler(event)
                  }}>مرتب سازی بر اساس آخرین</li>
                  <li className="courses-top-bar__selection-item" onClick={(event) => {
                    setStatus('first')
                    statusTitleHandler(event)
                  }}>مرتب سازی بر اساس اولین </li>
                  <li className="courses-top-bar__selection-item" onClick={(event) => {
                    setStatus('expensive')
                    statusTitleHandler(event)
                  }}>مرتب سازی بر اساس گران ترین</li>
                </ul>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input type="text" className="courses-top-bar__input" placeholder="جستجوی دوره ..." value={searchValue} onChange={searchValueOnChangeHandler} />
                <i className="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>

          </div>
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  courses.length === 0 ? (
                    <div className='alert alert-warning'>
                      هنوز هیچ دوره‌ای برای این زمینه ثبت نشده!
                    </div>
                  ) : (
                    <>
                      {
                        shownCourses.length === 0 ? (
                          <div className='alert alert-warning'>
                            هنوز هیچ دوره‌ای برای{" "} {statusTitle} {" "} وجود ندارد
                          </div>
                        ) : (
                          courseDisplayType === 'row' ? (
                            shownCourses.map((course) => (
                              <CourseBox key={course.id} {...course} />
                            ))
                          ) : (
                            <>
                              {shownCourses.map((course) => (
                                <div class="col-12">
                                  <div class="course-box">
                                    <div class="course__box-header">
                                      <div class="course__box-right">
                                        <a
                                          class="course__box-right-link"
                                          href="#"
                                        >
                                          <img
                                            src="/images/courses/fareelancer.png"
                                            class="course__box-right-img"
                                          />
                                        </a>
                                      </div>
                                      <div class="course__box-left">
                                        <div class="course__box-left-top">
                                          <a
                                            href="#"
                                            class="course__box-left-link"
                                          >
                                            {course.name}
                                          </a>
                                        </div>
                                        <div class="course__box-left-center">
                                          <div class="course__box-left-teacher">
                                            <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                            <span class="course__box-left-name">
                                              محمد امین سعیدی راد
                                            </span>
                                          </div>
                                          <div class="course__box-left-stars">
                                            <span class="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span class="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span class="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span class="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span class="course__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                          </div>
                                        </div>
                                        <div class="course__box-left-bottom">
                                          <div class="course__box-left-des">
                                            <p>{course.description}</p>
                                          </div>
                                        </div>
                                        <div class="course__box-footer">
                                          <div class="course__box-footer-right">
                                            <i class="course__box-footer-icon fa fa-users"></i>
                                            <span class="course__box-footer-count">
                                              202
                                            </span>
                                          </div>
                                          <span class="course__box-footer-left">
                                            {course.price === 0
                                              ? "رایگان"
                                              : course.price.toLocaleString()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          )
                        )
                      }

                      <Paginiation
                        className= 'paginiation'
                        items={orderedCourses}
                        itemsCount={3}
                        pathname={`/category-info/${categoryName}`}
                        setShownCourses={setShownCourses}
                      />
                    </>
                  )
                }


              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Category
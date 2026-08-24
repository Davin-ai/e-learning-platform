import React, { useEffect, useState } from "react";

import "./Courses.css";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [showCourseState, setShowCourseState] = useState('all');
    const [shownCourses, setShownCourses] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/users/courses/`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
                setShownCourses(data)
                console.log(data);
            });
    }, []);




    const filterCourses = (state) => {
        switch (state) {
            case ('all'): {
                setShownCourses(courses)
                break
            }
            case ('free'): {
                const filteredCourses = courses.filter(course => course.course.price === 0)
                setShownCourses(filteredCourses)
                break
            }
            case ('money'): {
                const filteredCourses = courses.filter(course => course.course.price !== 0)
                setShownCourses(filteredCourses)
                break
            }
            default: {
                setShownCourses(courses)
            }
        }
    }

    return (

        <>
            <div className="container2">
                <div className="container2-navbar">
                    <p>دوره های ثبت نام شده</p>
                </div>
                <div className="container2-main">
                    <div className="row g-4"> {/* g-4 = فاصله بین کارت‌ها */}
                        {courses.map((course) =>
                            course.course ? (
                                <div className="col-lg-3 col-md-4 col-sm-6" key={course._id}>
                                    <div className="course-box2">
                                        <a className="course-img-wrapper">
                                            <img
                                                className="main__box-img img-fluid con-img"
                                                src={
                                                    course.course.cover?.length
                                                        ? `${process.env.REACT_APP_API_URL}/courses/covers/${course.course.cover}`
                                                        : "/fareelancer.png"
                                                }
                                                alt={course.course.name}
                                            />
                                            <div className="overlay">
                                                <img src="/Images/pause.png" alt="pause icon" className="pause-icon" />
                                            </div></a>
                                        <div className="course-title">
                                            <span>{course.course.name} + پروژه‌های جذاب و کاربردی</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 prog-style">
                                            <p className="text-end small mt-1 p-style2">70% مشاهده</p>
                                            <div className="progress flex-grow-1" style={{ height: "4px" }}>
                                                <div
                                                    className="progress-bar ligh"
                                                    role="progressbar"
                                                    style={{ width: "70%" }}
                                                    aria-valuenow="70"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="course-footer">
                                            <a className="continue-btn">ادامه یادگیری</a>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            </div>
        </>

        // <div class="col-9">
        //     <div class="courses">
        //         <div class="courses-header">
        //             <span class="courses-header__title">دوره های ثبت نام شده</span>
        //             <ul class="courses-header__list">
        //                 <li class="courses-header__item" onClick={(event) => {
        //                     event.preventDefault()
        //                     setShowCourseState('all')
        //                     filterCourses('all')
        //                 }}>
        //                     <a
        //                         class={`courses-header__link ${showCourseState === 'all' ? 'courses-header__link-active' : null}`}
        //                         href="#"
        //                     >
        //                         همه دوره ها
        //                     </a>
        //                 </li>
        //                 <li class="courses-header__item" onClick={(event) => {
        //                     event.preventDefault()
        //                     setShowCourseState('free')
        //                     filterCourses('free')
        //                 }}>
        //                     <a class={`courses-header__link ${showCourseState === 'free' ? 'courses-header__link-active' : null}`} href="#">
        //                         دوره های رایگان
        //                     </a>
        //                 </li>
        //                 <li class="courses-header__item" onClick={(event) => {
        //                     event.preventDefault()
        //                     setShowCourseState('money')
        //                     filterCourses('money')
        //                 }}>
        //                     <a class={`courses-header__link ${showCourseState === 'money' ? 'courses-header__link-active' : null}`} href="#">
        //                         دوره های پولی
        //                     </a>
        //                 </li>
        //             </ul>
        //         </div>
        //         <div class="main">
        //             <div class="row">
        //                 <div class="col-12">
        //                     {
        //                         shownCourses.length !== 0 ? (
        //                             <>
        //                                 {shownCourses.map((course) => (
        //                                     course.course ? (
        //                                         <div class="main__box">
        //                                         <div class="main__box-right">
        //                                             <a class="main__box-img-link" href="#">

        //                                                 {
        //                                                     course.course.cover.length !==0 ? <img
        //                                                     class="main__box-img img-fluid"
        //                                                     src={`${process.env.REACT_APP_API_URL}/courses/covers/${course.course.cover}`}
        //                                                 /> : <img src="'fareelancer.png'"></img>
        //                                                 }

        //                                             </a>
        //                                         </div>
        //                                         <div class="main__box-left">
        //                                             <a href="#" class="main__box-title">
        //                                                 {
        //                                                     course.course ? course.course.name : 'نامشخص'
        //                                                 }
        //                                             </a>
        //                                             <div class="main__box-bottom">
        //                                                 <div class="main__box-all">
        //                                                     <span class="main__box-all-text">وضعیت:</span>
        //                                                     <span class="main__box-all-value">
        //                                                         {
        //                                                             course.course.status === 'start' ? 'در حال برگزاری' : 'به اتمام رسیده'
        //                                                         }
        //                                                     </span>
        //                                                 </div>
        //                                                 <div class="main__box-completed">
        //                                                     <span class="main__box-completed-text">
        //                                                         مبلغ:
        //                                                     </span>
        //                                                     <span class="main__box-completed-value">{course.course.price === 0 ? "رایگان" : course.course.price}</span>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     ) : null

        //                                 ))}
        //                             </>
        //                         ) : (
        //                             <div className="alert alert-danger">دوره ای جهت نمایش برای این فیلتر وجود ندارد</div>
        //                         )
        //                     }

        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

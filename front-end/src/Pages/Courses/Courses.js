import React, { useEffect, useState } from 'react'
import './Courses.css'
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Paginiation from '../../Components/Paginiation/Paginiation'

export default function Courses() {

    const [allCourses, setAllCourses] = useState([])
    const [shownCourses, setShownCourses] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses`).then((res) => res.json()).then((result) => setAllCourses(result))
    }, [])

    return (
        <>
            <Topbar />
            <Navbar />

            <Breadcrumb
                links={[
                    { id: 1, title: 'خانه', to: '' },
                    { id: 2, title: 'تمامی دوره ها', to: 'courses' },
                ]}
            />

            <section className="courses">
                <div className="container">
                    <div className="courses-content">
                        <div className="container"></div>
                        <div className="row">
                            {
                                shownCourses.map((course) => (
                                    <CourseBox {...course}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>

            <Paginiation 
            items = {allCourses}
            itemsCount = {3}
            pathname="/courses"
            setShownCourses = {setShownCourses}
            />
            <Footer />
        </>
    )
}

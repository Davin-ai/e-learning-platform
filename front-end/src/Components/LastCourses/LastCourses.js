import React, { useEffect, useState } from 'react'
import './LastCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseBox from '../CourseBox/CourseBox'


function LastCourses() {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/courses`).then((res) => res.json()).then((result) => {
            console.log('Reasult', result);
            console.log('COVER:', result[0]?.cover)
            
            setCourses(result)
            
        })
        .catch((err) => console.error('Fetch error', err)
        )
    },[])

    return (
        <div>
            <div className="courses">
                <div className="container">
                    <SectionHeader
                        title='جدیدترین دوره ها'
                        desc="سکوی پرتاپ شما به سمت موفقیت"
                        btnTitle='تمامی دوره ها'
                        btnHref='courses/1'
                    />
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                
                                {
                                    courses.splice(0, 3).map((course) => (
                                        <CourseBox {...course} key={course._id}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastCourses
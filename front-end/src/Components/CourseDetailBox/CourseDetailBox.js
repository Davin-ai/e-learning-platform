import React from 'react'
import './CourseDetailBox.css'

export default function CourseDetailBox({icon, title, text}) {
    return (
        <div className="col-6 col-md-4 col-lg-4">
            <div className="course-boxes__box">
                <div className="course-boxes__box-right">
                    <i class={`course-boxes__box-right-icon fas fa-${icon}`}></i>
                </div>
                <div className="course-boxes__box-left">
                    <span className="course-boxes__box-left-title">
                        {title}
                    </span>
                    <span className="course-boxes__box-left--subtitle">
                        {text}
                    </span>
                </div>
            </div>
        </div>
    )
}

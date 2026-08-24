import React, { useEffect, useState } from "react";
import './Index.css'
import { Link } from "lucide-react";

export default function Index() {

  const [courses, setCourses] = useState([])

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
        console.log(data);
      });
  }, []);

  return (
    <>
      <div className="container1">
        <div className="row boxes">
          <div className="box col-6 col-sm-6 col-md-4 col-lg-3">
            <img src="/Images/book.png" alt="" />
            <div className="text">
              <p className="title-style">8 دوره</p>
              <p className="sub-title">دوره های من</p>
            </div>
          </div>
          <div className="box col-6 col-sm-6 col-md-4 col-lg-3">
            <img src="/Images/news.png" alt="" />
            <div className="text">
              <p className="title-style">12 پرسش</p>
              <p className="sub-title">پرسش پاسخ</p>
            </div>
          </div>
          <div className="box col-6 col-sm-6 col-md-4 col-lg-3">
            <img src="/Images/spam.png" alt="" />
            <div className="text">
              <p className="title-style">4 تیکت</p>
              <p className="sub-title">تیکت ها</p>
            </div>
          </div>
          <div className="box col-6 col-sm-6 col-md-4 col-lg-3">
            <img src="/Images/wallet.png" alt="" />
            <div className="text">
              <p className="title-style">0 تومان</p>
              <p className="sub-title">کیف پول</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container2">
        <div className="container2-navbar">
          <p>اخیرا مشاهده شده</p>
          <button><i class="fa-solid fa-arrow-left"></i></button>
        </div>
        <div className="container2-main">
          <div className="row g-4"> {/* g-4 = فاصله بین کارت‌ها */}
            {courses.slice(0, 7).map((course) =>
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
                    
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}

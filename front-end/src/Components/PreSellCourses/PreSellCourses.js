import React, { useEffect, useRef, useState } from 'react'
import './PreSellCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import CourseBox from '../CourseBox/CourseBox';


export default function PreSellCourses() {

    const [preSells, setPreSells] = useState([])

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    useEffect(() => {
        fetch(`http://localhost:4000/v1/courses/presell`).then((res) => res.json()).then((result) => {
            console.log(result)
            setPreSells(result)
        })
    }, [])

    return (
        <div className="popular">
            <div className="container">
                <div className='row align-items-center'>
                    <div className='col-md-8'>
                        <SectionHeader
                            title='دوره های در حال پیش فروش'
                            desc="متن تستی برای توضیحات دوره های پیش فروش"
                        />
                    </div>
                    <div className='col-md-4 text-end hidden-button'>
                        <div className='custom-nav'>
                            <button ref={prevRef} className='swiper-button-prev1'><i className='fa-solid fa-arrow-right arrow-icon'></i></button>
                            <button ref={nextRef} className='swiper-button-next1'><i className='fa-solid fa-arrow-left arrow-icon'></i></button>
                        </div>
                    </div>
                    <div className="courses-content">
                        <div className="container">

                            <div className="row">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination, Navigation]}
                                    navigation={{
                                        nextEl: "swiper-button-next1",
                                        prevEl: "swiper-button-prev1"
                                    }}
                                    onInit={(swiper) => {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }}
                                    breakpoints={{
                                        576: {
                                            slidesPerView: 1
                                        },
                                        768: {
                                            slidesPerView: 2
                                        },
                                        992: {
                                            slidesPerView: 3
                                        },
                                        1200: {
                                            slidesPerView: 3
                                        }
                                    }}
                                    className="mySwiper"
                                    loop={true}
                                >
                                    {
                                        preSells.map((data) => (
                                            <SwiperSlide className='mySwiper'>
                                                <CourseBox {...data} isSlider={true} />
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>
                                <div className='custom-nav hidden-button2'>
                                    <button ref={prevRef} className='swiper-button-prev1'><i className='fa-solid fa-arrow-right arrow-icon'></i></button>
                                    <button ref={nextRef} className='swiper-button-next1'><i className='fa-solid fa-arrow-left arrow-icon'></i></button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

import React from 'react'
import './index.css'
import Header from '../../Components/Header/Header'
import Landing from '../../Components/Landing/Landing'
import LastCourses from '../../Components/LastCourses/LastCourses'
import AboutUs from '../../Components/AboutUs/AboutUs'
import PopularCourses from '../../Components/PopularCourses/PopularCourses'
import PreSellCourses from '../../Components/PreSellCourses/PreSellCourses'
import LastArticles from '../../Components/LastArticles/LastArticles'
import Footer from '../../Components/Footer/Footer'

export default function index() {
  return (
    <>

      <Header/>
      <Landing/>
      <LastCourses/>
      <PopularCourses/>
      <PreSellCourses/>
      <LastArticles/>
      <AboutUs/>
      <Footer/>
    </>
  )
}

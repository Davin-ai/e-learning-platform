import React from 'react'
import './AboutUs.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import AboutUsBox from '../AboutUsBox/AboutUsBox'

export default function AboutUs() {
    return (
        <div className="about-us">
            <div className="container">
                <SectionHeader
                    title='ما چه کمکی بهتون میکنیم؟'
                    desc='از اونجایی که اکادمی سبزلرن یک اکادمی خصوصی است'
                />

                <div className="container">
                    <div className="row">
                        <AboutUsBox title='دوره های اختصاصی' desc='با پشتیبانی و کیفیت بالا ارائه میده!' icon='far fa-copyright'/>
                        <AboutUsBox title='دوره های اختصاصی' desc='با پشتیبانی و کیفیت بالا ارائه میده!' icon='fa-solid fa-leaf'/>
                        <AboutUsBox title='دوره های اختصاصی' desc='با پشتیبانی و کیفیت بالا ارائه میده!' icon='fa-regular fa-gem'/>
                        <AboutUsBox title='دوره های اختصاصی' desc='با پشتیبانی و کیفیت بالا ارائه میده!' icon='fa-solid fa-crown'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

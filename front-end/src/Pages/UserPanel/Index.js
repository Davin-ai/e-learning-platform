import React from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/UserPanel/Sidebar/Sidebar'
import './Index2.css'
import UserNavbar from './UserNavbar/UserNavbar'

export default function Index() {
    return (
        <>

            <section class="content main-bg">
                {/* <div class="content-header">
                    <div class="container">
                        <span class="content-header__title">حساب کاربری من</span>
                        <span class="content-header__subtitle">پیشخوان</span>
                    </div>
                </div> */}
                <div className='desktop-sidebar'>
                    <Sidebar />
                </div>
                

                <div class="container">
                    <div class="row">
                        <div className='col-11'>
                            <UserNavbar />
                            <Outlet />
                        </div>
                        
                    </div>
                </div>
            </section>

        </>
    )
}

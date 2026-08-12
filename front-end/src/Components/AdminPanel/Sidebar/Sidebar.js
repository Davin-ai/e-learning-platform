import React, { useContext } from 'react'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/authContext'
import swal from 'sweetalert'


export default function Sidebar() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const logoutAdmin = (event) => {
        event.preventDefault()
        console.log('logout');

        swal({
            title: 'با موفقیت لاگ اوت شدید',
            icon: 'success',
            buttons: 'خروج'
        }).then(value => {
            authContext.logout()
            navigate('/')
        })

    }

    return (
        <div id="sidebar" class="col-2">
            <div class="sidebar-header">
                <div class="sidebar-logo">
                    <a href="#"><img src="/images/logo/Logo.png" alt="Logo" /></a>
                </div>

                <div class="sidebar-menu-btn">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
            <div class="sidebar-menu">
                <ul>
                    <li class="active-menu"><Link to="/p-admin"><i class="fas fa-home"></i><span>داشبورد</span></Link></li>
                    <li><a href="#"><i class="fas fa-chart-line"></i><span>فروش</span></a></li>
                    <li><Link to="users"><i class="fas fa-users"></i><span>کاربران</span></Link></li>
                    <li><a href="../NewUsers/index.html"><i class="fas fa-user-plus"></i><span>افزودن کاربر جدید</span></a></li>
                    <li><Link to="courses"><i class="fas fa-shopping-cart"></i><span>دوره ها </span></Link></li>
                    <li><Link to="/p-admin/discounts"><i class="fas fa-cart-plus"></i><span>تخفیف همگانی</span></Link></li>
                    <li><Link to={'/p-admin/tickets'}><i class="far fa-chart-bar"></i><span>تیکت ها</span></Link></li>
                    {/* <li><a href="#"><i class="fa fa-envelope"></i><span>ایمیل</span></a></li> */}
                    <li><Link to={'comments'}><i class="fas fa-comment-alt"></i><span>پیام ها</span></Link></li>
                    <li><Link to={'offs'}><i class="fas fa-comment-alt"></i><span>تخفیفات</span></Link></li>
                    <li><Link to="admin-contact"><i class="fas fa-exclamation-circle"></i><span>پیغام ها</span></Link></li>
                    <li><a href="#" onClick={logoutAdmin}><i class="fas fa-exclamation-circle"></i><span>خروج</span></a></li>
                </ul>
            </div>
        </div>
    )
}

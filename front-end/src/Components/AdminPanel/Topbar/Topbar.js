import React, { useEffect, useState } from 'react'

export default function Topbar() {

    const [adminInfo, setAdminInfo] = useState({})
    const [adminNotifications, setAdminNotifications] = useState([])

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`${process.env.REACT_APP_API_URL}/v1/auth/me`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAdminInfo(data)
                setAdminNotifications(data.notifications)
            })
    }, [])

    return (
        <div class="container-fluid">
            <div class="container">
                <div class="home-header">
                    <div class="home-right">
                        <div class="home-searchbar">
                            <input type="text" class="search-bar" placeholder="جستجو..." />
                        </div>
                        <div class="home-notification">
                            <button type="button">
                                <i class="far fa-bell"></i>
                            </button>
                        </div>
                        <div
                            class="home-notification-modal"
                            // onMouseEnter={() => setIsShowNotificationsBox(true)}
                            // onMouseLeave={() => setIsShowNotificationsBox(false)}
                        >
                            <ul class="home-notification-modal-list">
                                {adminNotifications.map((notification) => (
                                    <li class="home-notification-modal-item">
                                        <span class="home-notification-modal-text">
                                            {notification}
                                        </span>
                                        <label class="switch">
                                            <a href="javascript:void(0)">دیدم</a>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div class="home-left">
                        <div class="home-profile">
                            <div class="home-profile-image">
                                <a href="#">
                                    <img src="/images/piolt.png" alt="" />
                                </a>
                            </div>
                            <div class="home-profile-name">
                                <a href="#">
                                    {
                                        adminInfo.name
                                    }
                                </a>
                            </div>
                            <div class="home-profile-icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

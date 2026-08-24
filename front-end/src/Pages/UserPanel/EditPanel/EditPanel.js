import React from 'react'
import { useContext, useEffect, useState } from "react";
import AuthContext from './../../../context/authContext'
import swal from 'sweetalert'

import './EditPanel.css'

export default function EditPanel() {
  const authContext = useContext(AuthContext)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setName(authContext.userInfos.name)
    setPhone(authContext.userInfos.phone)
    setUsername(authContext.userInfos.username)
    setUsername(authContext.userInfos.username)
    setEmail(authContext.userInfos.email)
  }, [])

  function editAccount(event) {
    event.preventDefault()

    const userNewInfos = {
      name,
      phone,
      username,
      email,
      password
    }

    fetch(`${process.env.REACT_APP_API_URL}/v1/users/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
      },
      body: JSON.stringify(userNewInfos)
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'اطلاعات حساب شما با موفقیت ویرایش شد',
          icon: 'success',
          buttons: "ok"
        })
      }
    })
  }

  return (

    <>
      <div className='edit-container basic-style-edit'>
        <div className='header-container'>
          <img className='verified-img' src="/Images/verified.png" alt="" />
          <div className='header-title'>
            <span className='main-title1'>اطلاعات حساب کاربری</span>
            <span className='sub-title'>ویرایش اطلاعات حساب کاربری</span>
          </div>
        </div>

        <form className='edit-form' action='#'>
          <div className='edit-personal'>
            <div className='row'>
              <div class="col-sm-6 input-box">
                <label className="edit-label">شماره موبایل *</label>
                <input
                  className="edit-input"
                  type="text"
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                  placeholder="لطفا شماره موبایل خود را وارد کنید"
                />
              </div>

              <div class="col-sm-6 input-box">
                <label class="edit-label">نام و نام خانوادگی *</label>
                <input
                  class="edit-input"
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="لطفا نام کامل خود را وارد کنید"
                /><i className="fa-regular fa-user icon-re"></i>
              </div>
              <div class="col-sm-6 input-box">
                <label class="edit-label">نام کاربری (نمایشی) *</label>
                <input
                  class="edit-input"
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                /><br></br>
                <span class="edit-help">
                  اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                </span>
              </div>
              <div class="col-sm-6 input-box">
                <label class="edit-label">آدرس ایمیل *</label>
                <input
                  class="edit-input"
                  type="text"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="لطفا ایمیل خود را وارد کنید"
                />
              </div>
            </div>
          </div>
          <div className='edit-password'>
            <div className='main-title2'>
              <span >تغییر رمز عبور</span>
            </div>

            <div className='row'>
              <div className='col-sm-6'>
                <label class="edit__label">
                  رمز عبور فعلی  (در صورتی که قصد تغییر ندارید خالی بگذارید)
                </label>
                <input
                  class="edit-input"
                  type="text"
                  placeholder="رمز عبور فعلی"
                />
              </div>
              <div className='col-sm-6'>
                <label class="edit__label">
                  رمز عبور جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)
                </label>
                <input
                  class="edit-input"
                  type="text"
                  placeholder="رمز عبور جدید"
                />
              </div>
              <div className='col-sm-6'>
                <label class="edit__label">
                  تکرار گذرواژه جدید
                </label>
                <input
                  class="edit-input"
                  type="text"
                  placeholder=" تکرار گذرواژه جدید"
                />
              </div>
            </div>
          </div>
          <div className='edit-button'>
            <button class="edit-btn" type="submit" onClick={editAccount}>
            ذخیره تغییرات
          </button>
          </div>
          
        </form>
      </div>
    </>



    // <div class="col-9">
    //   <div class="edit">
    //     <form class="edit__form" action="#">
    //       <div class="edit__personal">
    //         <div class="row">
    //           <div class="col-12">
    //             <label class="edit__label">شماره موبایل *</label>
    //             <input
    //               class="edit__input"
    //               type="text"
    //               value={phone}
    //               onChange={event => setPhone(event.target.value)}
    //               placeholder="لطفا شماره موبایل خود را وارد کنید"
    //             />
    //           </div>

    //           <div class="col-12">
    //             <label class="edit__label">نام و نام خانوادگی *</label>
    //             <input
    //               class="edit__input"
    //               type="text"
    //               value={name}
    //               onChange={event => setName(event.target.value)}
    //               placeholder="لطفا نام نمایشی خود را وارد کنید"
    //             />
    //           </div>
    //           <div class="col-12">
    //             <label class="edit__label">نام کاربری (نمایشی) *</label>
    //             <input
    //               class="edit__input"
    //               type="text"
    //               value={username}
    //               onChange={event => setUsername(event.target.value)}
    //               placeholder="لطفا نام نمایشی خود را وارد کنید"
    //             />
    //             <span class="edit__help">
    //               اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
    //             </span>
    //           </div>
    //           <div class="col-12">
    //             <label class="edit__label">آدرس ایمیل *</label>
    //             <input
    //               class="edit__input"
    //               type="text"
    //               value={email}
    //               onChange={event => setEmail(event.target.value)}
    //               placeholder="لطفا نام نمایشی خود را وارد کنید"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div class="edit__password">
    //         <span class="edit__password-title">تغییر گذرواژه</span>
    //         <div class="row">
    //           <div class="col-12">
    //             <label class="edit__label">
    //               گذرواژه پیشین (در صورتی که قصد تغییر ندارید خالی بگذارید)
    //             </label>
    //             <input
    //               class="edit__input"
    //               type="text"
    //               placeholder="گذرواژه پیشین"
    //             />
    //           </div>
    //           <div class="col-12">
    //             <label class="edit__label">
    //               گذرواژه جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)
    //             </label>
    //             <input
    //               class="edit__input"
    //               type="text"
    //               onChange={event => setPassword(event.target.value)}
    //               placeholder="گذرواژه جدید"
    //             />
    //           </div>
    //           <div class="col-12">
    //             <label class="edit__label">تکرار گذرواژه جدید</label>
    //             <input
    //               class="edit__input"
    //               type="text"
    //               onChange={event => setPassword(event.target.value)}
    //               placeholder="تکرار گذرواژه جدید"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <button class="edit__btn" type="submit" onClick={editAccount}>
    //         ذخیره تغییرات
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}

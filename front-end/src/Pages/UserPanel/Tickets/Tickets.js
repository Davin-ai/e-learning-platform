import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Tickets.css";
import Ticket from "./Ticket";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/tickets/user`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
          }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        console.log(data);
        
      });
  }, []);



  return (

    <>
      <div className="container1">
        <div className="container-header">
          <span>تیکت های من</span>
          <div className="left-navbar">
            <i className="fa-solid fa-filter icon-create"></i>
            <button class="edit-btn1" type="submit">
              + ایجاد تیکت جدید
            </button>
          </div>
        </div>
        {
          tickets.map((ticket) => (
            <div class="ticket-box">
          <div class="ticket-header1">
            <div className="title-dot">
              <span class="ticket-dot"></span>
              <span class="ticket-title">{ticket.title}</span>
            </div>
            <div class="ticket-details">
              <a class="ticket-btn">مشاهده جزئیات</a>
              <i class="fa-solid fa-arrow-left"></i>
            </div>
          </div>
          <div className="ticket-footer row">
            <div class="ticket-row col-6 col-sm-3">
              <i class="fa-regular fa-folder"></i>
              <span class="ticket-label">شماره تیکت:</span>
              <span class="ticket-value">21157</span>
            </div>

            <div class="ticket-row ticket-row col-6 col-sm-3">
              <i class="fa-regular fa-file-lines"></i>
              <span class="ticket-label">دپارتمان:</span>
              <span class="ticket-value">{ticket.departmentID}</span>
            </div>

            <div class="ticket-row col-6 col-sm-3">
              <i class="fa-regular fa-clock"></i>
              <span class="ticket-label">تاریخ ثبت:</span>
              <span class="ticket-value">۷ شهریور ۱۴۰۴</span>
            </div>

            <div class="ticket-row col-6 col-sm-3">
              <i class="fa fa-refresh ticket-icon"></i>
              <span class="ticket-label">وضعیت:</span>
              <span class="ticket-status closed">{ticket.answer === 0 ? 'پاسخ داده نشده' : 'پاسخ داده شده'}</span>
            </div>

          </div>

        </div>
          ))
        }
        
      </div>
    </>


    // <div class="col-9">
    //   <div class="ticket">
    //     <div class="ticket-header">
    //       <span class="ticket-header__title">همه تیکت ها</span>
    //       <Link class="ticket-header__link" to="/my-account/send-tickets">
    //         ارسال تیکت جدید
    //       </Link>
    //     </div>
    //     <div class="ticket-boxes">
    //       <div class="ticket-boxes__item">
    //         <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
    //         <span class="ticket-boxes__condition">باز</span>
    //         <span class="ticket-boxes__value">0</span>
    //       </div>
    //       <div class="ticket-boxes__item ticket-boxes__closed ticket-boxes__custom">
    //         <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
    //         <span class="ticket-boxes__condition">بسته</span>
    //         <span class="ticket-boxes__value ticket-boxes__value-closed">
    //           2
    //         </span>
    //       </div>
    //       <div class="ticket-boxes__item ticket-boxes__answered ticket-boxes__custom">
    //         <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
    //         <span class="ticket-boxes__condition">پاسخ داده شده</span>
    //         <span class="ticket-boxes__value ticket-boxes__value-answered">
    //           1
    //         </span>
    //       </div>
    //       <div class="ticket-boxes__item ticket-boxes__finished ticket-boxes__custom">
    //         <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
    //         <span class="ticket-boxes__condition">پایان یافته</span>
    //         <span class="ticket-boxes__value ticket-boxes__value-finished">
    //           1
    //         </span>
    //       </div>
    //       <div class="ticket-boxes__item">
    //         <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
    //         <span class="ticket-boxes__condition">همه</span>
    //         <span class="ticket-boxes__value">2</span>
    //       </div>
    //     </div>
    //     <div class="ticket-filter">
    //       <form action="#" class="ticket-filter__form">
    //         <select class="ticket-filter__select">
    //           <option class="ticket-filter__option" value="">
    //             همه
    //           </option>
    //           <option class="ticket-filter__option" value="">
    //             فرستاده شده
    //           </option>
    //           <option class="ticket-filter__option" value="">
    //             دریافتی
    //           </option>
    //         </select>
    //         <select class="ticket-filter__select">
    //           <option class="ticket-filter__option" value="">
    //             همه
    //           </option>
    //           <option class="ticket-filter__option" value="">
    //             باز
    //           </option>
    //           <option class="ticket-filter__option" value="">
    //             بسته
    //           </option>
    //           <option class="ticket-filter__option" value="">
    //             پاسخ داده شده
    //           </option>
    //           <option class="ticket-filter__option" value="">
    //             پایان یافته
    //           </option>
    //         </select>
    //         <select class="ticket-filter__select">
    //           <option class="ticket-filter__option" value="">
    //             تاریخ پاسخ
    //           </option>
    //           <option class="ticket-filter__option" value="">
    //             تاریخ ایجاد
    //           </option>
    //         </select>
    //         <button class="ticket-filter__btn" type="submit">
    //           اعمال
    //         </button>
    //       </form>
    //     </div>
    //     <div class="ticket-content">
    //       <span class="ticket-content__title">نمایش 1 تیکت</span>
    //       {
    //         tickets.map((ticket) => (
    //             <Ticket {...ticket}/>
    //         ))
    //       }
    //     </div>
    //   </div>
    // </div>
  );
}

import React, { useEffect, useState } from 'react'
import './Index.css'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import PAdminItem from '../../../Components/AdminPanel/PAdminItem/PAdminItem'

export default function AdminIndex() {

  const[infos,setInfos] = useState([])
  const[adminName,setAdminName] = useState('')
  const[lastRegisteredUser,setLastRegisteredUser] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/infos/p-admin`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
          }`,
      }
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      setInfos(data.infos)
      setLastRegisteredUser(data.lastUsers)
      setAdminName(data.adminName)
    })
  },[])

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-content-title">
            <span class="welcome">خوش آمدید,<span class="name">{adminName}</span></span>
          </div>
          <div class="home-content-boxes">
            <div class="row">
              {
                infos.map((info) => (
                  <PAdminItem info={info}/>
                ))
              }
              
            </div>
          </div>
          {/* <div class="home-content-chart">
            <div class="swiper mySwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div id="sale-chart"></div>
                </div>
                <div class="swiper-slide">
                  <div id="revanue-chart"></div>
                </div>
                <div class="swiper-slide">
                  <div id="cost-chart"></div>
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div> */}
          <div class="home-content-latset-users">
            <DataTable title={"افراد اخیرا ثبت نام شده"}>
              <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>

            {
              lastRegisteredUser.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

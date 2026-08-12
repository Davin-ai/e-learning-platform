import React from 'react'
import './Wallet.css'

export default function Wallet() {
  return (
    <>
      <div className='wallet-top row'>
        <div className='first-section col-12 col-sm-4 basic-style'>
          <img src="/Images/coins.png" alt="" />
          <div className='wallet-title_head'>
            <p className='wallet-title'>موجودی کیف پول</p>
            <p className='wallet-sub_title'>0 تومان</p>
          </div>
        </div>
        <div className='col-12 col-sm-8'>
          <div className='right-section basic-style'>
            <img src="/Images/star.png" alt="" />
            <div className='wallet-title_head'>
              <p className='wallet-title'>اشتراک سبزلرن پرو</p>
              <p className='wallet-sub_title'>این سرویس به‌زودی راه‌اندازی میشه ⏳
              </p>
            </div>
            <div className='left-button'>
              <button className="wallet-btn">
                به زودی
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='Transaction basic-style2'>
        <div className='Transaction-header'>
          <p>لیست تراکنش ها من</p>
          <i class="fa-solid fa-filter"></i>
        </div>
        <div className='Transaction-value'>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>شرح تراکنش</th>
                  <th>تاریخ</th>
                  <th>مبلغ</th>
                  <th>وضعیت</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>32001</td>
                  <td>آموزش ری اکت ( ReactJS ) در دنیای واقعی | از 0 تا استخدام [منتورشیپ]</td>
                  <td>۱۱ فروردین ۱۴۰۳</td>
                  <td>1,920,000 تومان</td>
                  <td className='status-success'>پرداخت شده</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

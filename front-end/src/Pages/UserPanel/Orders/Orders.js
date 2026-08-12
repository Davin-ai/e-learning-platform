import React, { useEffect, useState } from 'react'
import './Orders.css'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';


export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [course, setCourse] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getAllOrders()


    }, []);

    function getAllOrders() {
        fetch(`http://localhost:4000/v1/orders`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setOrders(data);
            });
    }

    const showDetails = (shortName) => {
        navigate(`/course-info/${shortName}`);
    }


    return (

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
                                <th>دوره</th>
                                <th>تاریخ</th>
                                <th>وضعیت</th>
                                <th>مبلغ</th>
                                <th>مشاهده دوره</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr>
                                    <td>
                                        <a href="#">
                                            {index + 1}
                                        </a>
                                    </td>
                                    <td>
                                        {
                                            order.course ? order.course.name : 'نامشخص'
                                        }
                                    </td>
                                    <td>
                                        <td class="order__table-body-item">{order.createdAt.slice(0, 10)}</td>
                                    </td>
                                    <td className='status-success'>
                                        تکمیل شده
                                    </td>
                                    <td>
                                        {order.price ? order.price : 'رایگان'}

                                    </td>

                                    <td class="order__table-body-item" onClick={() => order.course ? showDetails(order.course.shortName) : swal({
                                        title: "خطا",
                                        text: "دوره مورد نظر پیدا نشد",
                                        icon: "warning",
                                        dangerMode: true,
                                    })}>
                                        <a class="order__table-body-btn" href="#">
                                            نمایش
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

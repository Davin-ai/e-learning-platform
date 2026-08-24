import React, { useEffect, useState } from 'react'
import './AdminTickets.css'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'


export default function AdminTickets() {

    const [tickets, setTickets] = useState([])

    useEffect(() => {
       getAllTicket()
    }, [])

    function getAllTicket (){
         fetch(`${process.env.REACT_APP_API_URL}/v1/tickets`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }

        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTickets(data)
            })
    }

    const showTicketBody = (body) => {
        swal({
            title: body,
            buttons: "اوکی",
        })
    }

     const sendAnswer = (ticketID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        console.log(ticketID);


        swal({
            title: 'متن پاسخ را وارد کنید',
            content: 'input',
            buttons: "اوکی",
        }).then((value) => {
            let answerTicket = {
                ticketID,
                body: value
            }

            fetch(`${process.env.REACT_APP_API_URL}/v1/tickets/answer`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorageData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answerTicket)
            }).then((res) => {
                console.log(res);

                if (res.ok) {
                    swal({
                        title: 'پاسخ مورد نظر باموفقیت ثبت شد',
                        content: 'success',
                        buttons: "اوکی",
                    }).then(() => {
                        getAllTicket()
                    })

                }
            })
        }
        )
    }

    return (
        <>
            <DataTable title=' تیکت ها' >
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کاربر</th>
                            <th>عنوان</th>
                            <th>نوع تیکت</th>
                            <th>دوره</th>
                            <th>اولویت</th>
                            <th>مشاهده</th>
                            <th>پاسخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets.map((ticket, index) => (
                                <tr key={ticket._id}>
                                    <td>{index + 1}</td>
                                    <td>{ticket.user}</td>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.departmentSubID}</td>
                                    <td>{ticket.course ? ticket.course : '____'}</td>
                                    <td>
                                        {ticket.priority === 1 && 'بالا'}
                                        {ticket.priority === 2 && 'متوسط'}
                                        {ticket.priority === 3 && 'کم'}
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-primary edit-bin' onClick={() => showTicketBody(ticket.body)}>
                                            مشاهده
                                        </button>
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-primary edit-bin'  onClick={() => sendAnswer(ticket._id)}>
                                            پاسخ
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}

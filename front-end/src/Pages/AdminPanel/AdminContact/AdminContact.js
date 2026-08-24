import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'


export default function AdminContact() {

  const [contacts, setContact] = useState([])

  useEffect(() => {
    getAllContact()
  }, [])

  function getAllContact(){
    fetch(`${process.env.REACT_APP_API_URL}/v1/contact`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContact(data)
      })
  }

  const watchContact = (body) => {
    swal({
      title: body,
      buttons: "اوکی",
    })
  }

  const sendAnswer = (contactEmail) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    console.log(contactEmail);


    swal({
      title: 'متن پاسخ را وارد کنید',
      content: 'input',
      buttons: "اوکی",
    }).then((value) => {
      let answerInfo = {
        email: contactEmail,
        answer: value
      }

      fetch(`${process.env.REACT_APP_API_URL}/v1/contact/answer`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorageData.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answerInfo)
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          getAllContact()
          return res.json()
        }
      }).then((result) => console.log(result)
      )
    }
    )
  }

  const deleteContact = (contactID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title: "ایا از حذف مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "اره"],
    }).then((result) => {
      if (result) {
        fetch(`${process.env.REACT_APP_API_URL}/v1/contact/${contactID}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorageData.token}`
          }
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی"
            }).then(() => getAllContact())
          }
        })
      }
    })
  }

  return (
    <>
      <DataTable title=' پیغام ها' >
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              contacts.map((contact, index) => (
                <tr>
                  <td className={contact.answer === 1 ? 'answer-contact' : 'no-answer-contact'}>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <button type='button' className='btn btn-primary edit-bin' onClick={() => watchContact(contact.body)}>
                      مشاهده
                    </button>
                  </td>

                  <td>
                    <button type='button' className='btn btn-primary edit-bin' onClick={() => sendAnswer(contact.email)}>
                      پاسخ
                    </button>
                  </td>
                  <td>
                    <button type='button' className='btn btn-danger delete-bin' onClick={() => deleteContact(contact._id)}>
                      حذف
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

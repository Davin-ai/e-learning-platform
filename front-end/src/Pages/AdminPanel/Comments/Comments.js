import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'


export default function Comments() {

    const [comments, setComments] = useState([])

    useEffect(() => {
        getAllComments()
    }, [])

    function getAllComments() {
        fetch(`${process.env.REACT_APP_API_URL}/v1/comments`).then((res) => res.json()).then((data) => {
            console.log(data);
            setComments(data)
        })
    }

    function removeComment(commentID) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        swal({
            title: "ایا از حذف کامنت مطمئن هستید؟",
            icon: "warning",
            buttons: ["خیر", "اره"],
        }).then((result) => {
            if (result) {
                fetch(`${process.env.REACT_APP_API_URL}/v1/comments/${commentID}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${localStorageData.token}`,
                    }
                })
                    .then((res) => {
                        if (res.ok) {
                            swal({
                                title: "کامنت مورد نظر با موفقیت حذف شد",
                                icon: "success",
                                buttons: "اوکی",
                            }).then(() => getAllComments())
                        } else {
                            swal({
                                title: "حذف کامنت با مشکل مواجه شده",
                                icon: "error",
                                buttons: "اوکی",
                            })
                        }
                    })

            }
        }
        )

    }

    const watchComment = (body) => {
        swal({
            title: body,
            buttons: "اوکی",
        })
    }


    const banUser = (userID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        swal({
            title: 'ایا از بن مطمئنید؟',
            icon: 'warning',
            buttons: ["نه", "اره"]
        }).then(result => {
            if (result) {
                fetch(`${process.env.REACT_APP_API_URL}/v1/users/ban/${userID}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`
                    }
                }).then((res) => {
                    console.log(res);

                    if (res.ok) {
                        swal({
                            title: 'کاربر با موفقیت بن شد',
                            icon: 'success',
                            buttons: "ok"
                        })
                    }
                })
            }
        })

    }

    const sendAnswer = (commentID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        console.log(commentID);


        swal({
            title: 'متن پاسخ را وارد کنید',
            content: 'input',
            buttons: "اوکی",
        }).then((value) => {
            let answerComment = {
                body: value
            }

            fetch(`${process.env.REACT_APP_API_URL}/v1/comments/answer/${commentID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorageData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answerComment)
            }).then((res) => {
                console.log(res);

                if (res.ok) {
                    swal({
                        title: 'پاسخ مورد نظر باموفقیت ثبت شد',
                        content: 'success',
                        buttons: "اوکی",
                    }).then(() => {
                        getAllComments()
                    })

                }
            })
        }
        )
    }

    const acceptComment = (commentID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        swal({
            title: 'ایا از تایید کامنت مطمئنید؟',
            icon: 'warning',
            buttons: ["نه", "اره"]
        }).then(result => {
            if (result) {
                fetch(`${process.env.REACT_APP_API_URL}/v1/comments/accept/${commentID}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`
                    }
                }).then((res) => {
                    console.log(res);

                    if (res.ok) {
                        swal({
                            title: 'پاسخ مورد نظر باموفقیت ثبت شد',
                            icon: 'success',
                            buttons: "ok"
                        }).then(() => getAllComments())
                    }
                })
            }
        })

    }

    const rejectComment = (commentID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        swal({
            title: 'ایا از رد کامنت مطمئنید؟',
            icon: 'warning',
            buttons: ["نه", "اره"]
        }).then(result => {
            if (result) {
                fetch(`${process.env.REACT_APP_API_URL}/v1/comments/reject/${commentID}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`
                    }
                }).then((res) => {
                    console.log(res);

                    if (res.ok) {
                        swal({
                            title: 'پاسخ مورد نظر باموفقیت رد شد',
                            icon: 'success',
                            buttons: "ok"
                        }).then(() => getAllComments())
                    }
                })
            }
        })

    }


    return (
        <>
            <DataTable title=' دوره ها' >
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کاربر</th>
                            <th>دوره</th>
                            <th>امتیاز</th>
                            <th>مشاهده</th>
                            <th>پاسخ</th>
                            <th>تایید</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                            <th>بن</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            comments.map((comment, index) => (
                                <tr>
                                    <td className={comment.answer === 1 ? 'answer-comment' : 'no-answer-comment'}>{index + 1}</td>
                                    <td>{comment.creator.name}</td>
                                    <td>{comment.course}</td>
                                    <td>
                                        {
                                            Array(5 - comment.score).fill(0).map(item => (
                                                <img src='/Images/svgs/star.svg' alt='score'/>
                                            ))
                                        }
                                        {
                                            Array(comment.score).fill(0).map(item => (
                                                <img src='/Images/svgs/star_fill.svg' alt='score'/>
                                            ))
                                        }
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-primary edit-bin' onClick={() => watchComment(comment.body)}>
                                            مشاهده
                                        </button>
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-primary edit-bin' onClick={() => sendAnswer(comment._id)}>
                                            پاسخ
                                        </button>
                                    </td>
                                    {
                                        comment.answer === 1 ? <td>
                                            <button type='button' className='btn btn-danger delete-bin' onClick={() => rejectComment(comment._id)}>
                                                رد
                                            </button>
                                        </td> :
                                            (
                                                <td>
                                                    <button type='button' className='btn btn-primary edit-bin' onClick={() => acceptComment(comment._id)}>
                                                        تایید
                                                    </button>
                                                </td>
                                            )
                                    }
                                    <td>
                                        <button type='button' className='btn btn-primary edit-bin'>
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-danger delete-bin' onClick={() => removeComment(comment._id)}>
                                            حذف
                                        </button>
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-danger delete-bin' onClick={() => banUser(comment._id)}>
                                            بن
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

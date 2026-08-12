import React, { useEffect, useState } from "react";
import { useForm } from "./../../../Components/hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { minValidator } from "../../../validators/rules";
import swal from 'sweetalert'
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";


export default function Sessions() {
    const [courses, setCourses] = useState([]);
    const [sessionCourse, setSessionCourse] = useState('-1');
    const [sessionVideo, setSessionVideo] = useState({})
    const [isSessionFree, setIsSessionFree] = useState(1)
    const [Allsession, setAllSession] = useState([])
    const [courseName, setCourseName] = useState({})
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            time: {
                value: null,
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {

        getAllSessions()

        fetch("http://localhost:4000/v1/courses")
            .then((res) => res.json())
            .then((allCourses) => {
                console.log(allCourses);
                setCourses(allCourses);
            });
        console.log(courseName);

    }, []);

    const createNewSession = (event) => {
        event.preventDefault()
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        let formData = new FormData()

        formData.append('title', formState.inputs.title.value)
        formData.append('time', formState.inputs.time.value)
        formData.append('video', sessionVideo)
        formData.append('free', isSessionFree)

        fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: formData
        }).then((res) => {
            if (res.ok) {
                swal({
                    title: "جلسه جدید با موفقیت اضافه شد",
                    icon: "success",
                    buttons: "اوکی",
                }).then(() => {
                    console.log('دوره با موفقیت اضافه شد')
                    getAllSessions()
                }
                )
            }
        })
    }

    function getAllSessions() {
        fetch(`http://localhost:4000/v1/courses/sessions`).then((res) => res.json()).then((data) => {
            console.log(data);
            setAllSession(data)
            setCourseName(data.course)
        })
    }

    const removeSession = (sessionID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        swal({
            title: "ایا از حذف این جلسه مطمئن هستید؟",
            icon: "warning",
            buttons: ["خیر", "اره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${localStorageData.token}`,
                    }
                })
                    .then((res) => {
                        if (res.ok) {
                            swal({
                                title: "جلسه مورد نظر با موفقیت حذف شد",
                                icon: "success",
                                buttons: "اوکی",
                            }).then(() => getAllSessions())
                        } else {
                            swal({
                                title: "حذف دوره با مشکل مواجه شده",
                                icon: "error",
                                buttons: "اوکی",
                            })
                        }
                    })

            }
        }
        )

    }

    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن جلسه جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">عنوان جلسه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="title"
                                    validations={[minValidator(5)]}
                                    placeholder="لطفا نام جلسه را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">مدت زمان جلسه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="number"
                                    id="time"
                                    validations={[minValidator(4)]}
                                    placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select class="select" onChange={event => setSessionCourse(event.target.value)}>
                                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                    {courses.map((course) => (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">ادرس ویدئو</label>
                                <input type="file" onChange={event => setSessionVideo(event.target.files[0])}></input>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="condition">
                                    <label class="input-title">وضعیت دوره</label>
                                    <div class="radios">
                                        <div class="available">
                                            <label>
                                                <span>غیر رایگان</span>
                                                <input type="radio" value="0" name="condition" onInput={event => setIsSessionFree(event.target.value)} />
                                            </label>
                                        </div>
                                        <div class="unavailable">
                                            <label>
                                                <span>رایگان</span>
                                                <input type="radio" value="1" name="condition" onInput={event => setIsSessionFree(event.target.value)} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={createNewSession} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable title=' دوره ها' >
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>تایم</th>
                            <th>دوره</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Allsession.map((session, index) => (
                                <tr key={session._id}>
                                    <td>{index + 1}</td>
                                    <td>{session.title}</td>
                                    <td>{session.time}</td>
                                    {/* <td>{courseName.name}</td> */}
                                    <td>
                                        <button type='button' className='btn btn-danger delete-bin' onClick={() => removeSession(session._id)}>
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
    );
}

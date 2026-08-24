import React, { useEffect, useState } from 'react'
import { useForm } from '../../../Components/hooks/useForm';
import Input from "./../../../Components/Form/Input";
import { requiredValidator } from "../../../validators/rules";
import swal from 'sweetalert'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable';


export default function Offs() {

    const [courses, setCourses] = useState([])
    const [allOffs, setAllOffs] = useState([])
    const [offsCourses, setOffsCourses] = useState('-1')
    const [formState, onInputHandler] = useForm(
        {
            code: {
                value: "",
                isValid: false,
            },
            percent: {
                value: null,
                isValid: false,
            },
            max: {
                value: null,
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllOffs()

        fetch(`${process.env.REACT_APP_API_URL}/v1/courses`)
            .then((res) => res.json())
            .then((allCourses) => {
                console.log(allCourses);
                setCourses(allCourses);
            });
    }, [])

    function getAllOffs() {
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        fetch(`${process.env.REACT_APP_API_URL}/v1/offs`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`,
            }
        }).then((res) => res.json()).then((data) => {
            console.log('offs:',data);
            setAllOffs(data)
        })
    }

    const createOff = (event) => {
        event.preventDefault()
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        const newOffsInfo = {
            code: formState.inputs.code.value,
            percent: formState.inputs.percent.value,
            max: formState.inputs.max.value,
            course: offsCourses,
        }

        fetch(`${process.env.REACT_APP_API_URL}/v1/offs`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOffsInfo)
        }).then((res) => {
            if (res.ok) {
                swal({
                    title: "کد تخفیف با موفقیت ایجاد شد",
                    icon: "success",
                    buttons: "اوکی",
                }).then(() => {

                }
                )
            }
        })
    }

    const removeOffs = (offID) => {
         const localStorageData = JSON.parse(localStorage.getItem('user'))

        swal({
            title: "ایا از حذف کد تخفیف مطمئن هستید؟",
            icon: "warning",
            buttons: ["خیر", "اره"],
        }).then((result) => {
            if (result) {
                fetch(`${process.env.REACT_APP_API_URL}/v1/offs/${offID}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${localStorageData.token}`,
                    }
                })
                    .then((res) => {
                        if (res.ok) {
                            swal({
                                title: "کد تخفیف مورد نظر با موفقیت حذف شد",
                                icon: "success",
                                buttons: "اوکی",
                            }).then(() => getAllOffs())
                        } else {
                            swal({
                                title: "حذف کد با مشکل مواجه شده",
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
                            <div class="price input">
                                <label class="input-title">کد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="code"
                                    validations={[requiredValidator()]}
                                    placeholder="لطفا کد تخفیف را وارد نمایید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">درصد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="percent"
                                    validations={[requiredValidator()]}
                                    placeholder="لطفا درصد تخفیف را وارد نمایید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">حداکثر استفاده</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="max"
                                    validations={[requiredValidator()]}
                                    placeholder="حداکثر استفاده از کد تخفیف.."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>


                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select class="select" onChange={event => setOffsCourses(event.target.value)}>
                                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                    {courses.map((course) => (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={createOff} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable title=' تخفیف ها' >
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>شناسه</th>
                                        <th>کد</th>
                                        <th>درصد</th>
                                        <th>حداکثر استقاده</th>
                                        <th>دفعات استفاده</th>
                                        <th>سازنده</th>
                                        <th>حذف</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allOffs.map((off, index) => (
                                            <tr key={off._id}>
                                                <td>{index + 1}</td>
                                                <td>{off.code}</td>
                                                <td>{off.percent}</td>
                                                <td>{off.max}</td>
                                                <td>{off.uses}</td>
                                                <td>{off.creator}</td>
                                                <td>
                                                    <button type='button' className='btn btn-danger delete-bin' onClick={() => removeOffs(off._id)}>
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

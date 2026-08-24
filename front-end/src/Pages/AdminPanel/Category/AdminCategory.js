import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Input from "../../../Components/Form/Input";
import {
    requiredValidator,
    minValidator,
    maxValidator,
} from "../../../validators/rules";
import { useForm } from "../../../Components/hooks/useForm";
import swal from "sweetalert";
import axios from 'axios'

import "./Category.css";

export default function AdminCategory() {
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            shortname: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const [category, setCategory] = useState([])

    useEffect(() => {
        getAllCategory()
    }, [])

    function getAllCategory() {
        fetch(`${process.env.REACT_APP_API_URL}/v1/category`).then((res) => res.json()).then((result) => {
            console.log(result);
            setCategory(result)
        })
    }

    const createNewCategory = (event) => {
        event.preventDefault();
        const localStorageData = JSON.parse(localStorage.getItem("user"))

        const newCategoryInfo = {
            title: formState.inputs.title.value,
            name: formState.inputs.shortname.value,
        };

        fetch(`${process.env.REACT_APP_API_URL}/v1/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify(newCategoryInfo),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                swal({
                    title: "دسته بندی مورد نظر با موفقیت اضافه شد",
                    icon: "success",
                    buttons: "اوکی",
                }).then(() => {
                    getAllCategory();
                });
            });
    };

    const deleteCategoryHandler = (categoryID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"))

        swal({
            title: "ایا از حذف دسته بندی مطمئن هستید؟",
            icon: "warning",
            buttons: ["خیر", "اره"],
        }).then((result) => {
            if (result) {
                fetch(`${process.env.REACT_APP_API_URL}/v1/category/${categoryID}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${localStorageData.token}`,
                    }
                }).then((res) => res.json())
                    .then((result) => {
                        swal({
                            title: "دسته بندی مورد نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => getAllCategory())
                    })
            }
        }
        )
    }

    const editCategoryHandler = (categoryID, nameI) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))


        swal({
            title: "عنوان جدید دسته بندی را وارد کنید",
            content: "input",
            buttons: "ثبت عنوان جدید",
        }).then((result) => {
            console.log('result', result);

            if (result.trim().length) {
                axios.put(`${process.env.REACT_APP_API_URL}/v1/category/${categoryID}`,
                    // method: 'PUT',
                    {
                        name: nameI,
                        title: result
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorageData.token}`
                        }
                    },
                    // body: JSON.stringify({
                    //    name:nameI,
                    //    title:result
                    // }),
                ).then((data) => {
                    console.log(data);

                    swal({
                        title: "دسته بندی مورد نظر با موفقیت ویرایش شد",
                        icon: "success",
                        buttons: "اوکی",
                    }).then(() => getAllCategory())
                })
            }
        })
    }

    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن دسته‌بندی جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">عنوان</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="title"
                                    placeholder="لطفا عنوان را وارد کنید..."
                                    validations={[minValidator(5), maxValidator(20)]}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">اسم کوتاه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="shortname"
                                    placeholder="لطفا اسم کوتاه را وارد کنید..."
                                    validations={[minValidator(5), maxValidator(20)]}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input
                                        type="submit"
                                        value="افزودن"
                                        onClick={createNewCategory}
                                    />
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
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((category, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{category.title}</td>
                                    <td>
                                        <button type='button' className='btn btn-primary edit-bin' onClick={() => editCategoryHandler(category._id, category.name)}>
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button type='button' className='btn btn-danger delete-bin' onClick={() => deleteCategoryHandler(category._id)}>
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

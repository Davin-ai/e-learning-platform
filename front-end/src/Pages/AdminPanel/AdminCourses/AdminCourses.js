import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import './AdminCourses.css'
import { useForm } from '../../../Components/hooks/useForm'
import Input from '../../../Components/Form/Input'
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "./../../../validators/rules";

export default function AdminCourses() {

  const [courses, setCourses] = useState([])
  const [coursesCategory, setCoursesCategory] = useState("-1")
  const [categories, setCategories] = useState([])
  const [courseStatus, setCourseStatus] = useState('presell')
  const [courseCover, setCourseCover] = useState({})
  const [formState, onInputHandler] = useForm({
    name: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    shortName: {
      value: "",
      isValid: false,
    },
    price: {
      value: null,
      isValid: false,
    },
    support: {
      value: "",
      isValid: false,
    },
  }, false)


  useEffect(() => {
    getAllCourses()

    fetch(`${process.env.REACT_APP_API_URL}/v1/category`).then((res) => res.json()).then((result) => {
      console.log(result);
      setCategories(result)
    })
  }, [])

  function getAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`${process.env.REACT_APP_API_URL}/v1/courses`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    }).then((res) => res.json()).then((result) => {
      console.log(result);
      setCourses(result)
    })
  }

  const deleteCourseHandler = (courseID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title: "ایا از حذف دوره مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "اره"],
    }).then((result) => {
      if (result) {
        fetch(`${process.env.REACT_APP_API_URL}/v1/courses/${courseID}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${localStorageData.token}`,
          }
        })
          .then((res) => {
            if (res.ok) {
              swal({
                title: "دوره مورد نظر با موفقیت حذف شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => getAllCourses())
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

  const selectCategory = (event) => {
    setCoursesCategory(event.target.value)

  }

  const addNewCourse = (event) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    event.preventDefault()
    let formData = new FormData()
    formData.append('name', formState.inputs.name.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('price', formState.inputs.price.value)
    formData.append('support', formState.inputs.support.value)
    formData.append('categoryID', coursesCategory)
    formData.append('status', courseStatus)
    formData.append('cover', courseCover)

    if(coursesCategory === "-1"){
      swal({
          title: "لطفا دسته بندی را انتخاب کنید",
          icon: "error",
          buttons: "اوکی",
        })
    }else{
      fetch(`${process.env.REACT_APP_API_URL}/v1/courses`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "دوره جدید با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllCourses()
        })
      }
    })
    }

    

  }

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <Input
                  id='name'
                  element='input'
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text" isValid="false" placeholder="لطفا نام دوره را وارد کنید..." />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">URL دوره</label>
                <Input
                  id='shortName'
                  element='input'
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text" isValid="false" placeholder="لطفا URL دوره را وارد کنید..." />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">توضیحات دوره</label>
                <Input
                  id='description'
                  element='input'
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text" isValid="false" placeholder="لطفا توضیحات دوره را وارد کنید..." />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <Input
                  id='price'
                  element='input'
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text" isValid="false" placeholder="لطفا قیمت محصول را وارد کنید..." />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">نحوه پشتیبانی دوره</label>
                <Input
                  id='support'
                  element='input'
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text" isValid="false" placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..." />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته بندی دوره</label>
                <select onChange={selectCategory}>
                  <option value="-1">لطفا دسته بندی را انتخاب کنید</option>
                  {
                    categories.map((category) => (
                      <option value={category._id}>{category.title}</option>
                    ))
                  }
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس محصول</label>
                <input type="file" id="file" onChange={event => {
                  console.log(event.target.files[0]);
                  setCourseCover(event.target.files[0])
                }} />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>پیش فروش</span>
                        <input type="radio" value="presell" name="condition" onInput={event => setCourseStatus(event.target.value)} />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>در حال برگزاری</span>
                        <input type="radio" value="start" name="condition" onInput={event => setCourseStatus(event.target.value)} />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewCourse} />
                </div>
              </div>
            </div>
            {/* <div class="col-6">
              <div class="presell">
                <label class="input-title">وضعیت دوره</label>
                <div class="radios">
                  <div class="presell-true">
                    <label>
                      <span>پیش فروش</span>
                      <input type="radio" value="presell" name="presell" checked />
                    </label>
                  </div>
                  <div class="presell-false">
                    <label>
                      <span>در حال برگزاری</span>
                      <input type="radio" value="onperforming" name="presell" />
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
          </form>
        </div>
      </div>

      <DataTable title=' دوره ها' >
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>قیمت</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              courses.map((course, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</td>
                  <td>{course.isComplete === 0 ? 'در حال برگزاری' : 'تکمیل شده'}</td>
                  <td>{course.shortName}</td>
                  <td>{course.creator}</td>

                  <td>
                    <button type='button' className='btn btn-primary edit-bin'>
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type='button' className='btn btn-danger delete-bin' onClick={() => deleteCourseHandler(course._id)}>
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

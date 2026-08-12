import React, { use, useEffect, useState } from 'react'
import './Users.css'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import Input from "./../../../Components/Form/Input";
import { useForm } from "./../../../Components/hooks/useForm"
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "./../../../validators/rules";

export default function Users() {

  const [users, setUsers] = useState([])
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = () => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    }).then((res) => res.json()).then((data) => {
      console.log('data::', data);
      setUsers(data)
    })
  }

  const removeUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title: 'ایا از حذف مطمئنید؟',
      icon: 'warning',
      buttons: ["نه", "اره"]
    }).then(result => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/${userID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`
          }
        }).then((res) => {
          if (res.ok) {
            swal({
              title: 'کاربر با موفقیت حذف شد',
              icon: 'success',
              buttons: "ok"
            }).then(() => {
              getAllUser()
            })
          }
        })
      }
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
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`
          }
        }).then((res) => {
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
  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: `${formState.inputs.name.value}`,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch('http://localhost:4000/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'کاربر با موفقیت حذف شد',
          icon: 'success',
          buttons: "ok"
        }).then(() => {
          getAllUser()
        })
      }
    })
  };

  const changeRole = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title: 'لطفا نقش حدید را وارد نمایید',
      content: 'input'
    }).then((result) => {
      if (result.length) {
        const reqBodyInfos = {
          role: result,
          id: userID
        }
        fetch(`http://localhost:4000/v1/users/role`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBodyInfos)
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "تغییر نقش با موفقیت ایجاد شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllUser()
            }
            )
          }
        })
      }
    })

  }

  return (
    <>
      <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title='کاربران'>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>تغییر سطح</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>

            {
              users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button type='button' className='btn btn-primary edit-bin' onClick={() => changeRole(user._id)}>
                      تغییر سطح
                    </button>
                  </td>
                  <td>
                    <button type='button' className='btn btn-primary edit-bin'>
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type='button' className='btn btn-danger delete-bin' onClick={() => removeUser(user._id)}>
                      حذف
                    </button>
                  </td>
                  <td>
                    <button type='button' className='btn btn-danger delete-bin' onClick={() => banUser(user._id)}>
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

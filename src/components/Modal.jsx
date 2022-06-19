import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputAndError from "./InputAndError"
import axios from "axios"

const schema = yup.object({
  first_name: yup.string().max(25, 'Very large first name').required('First name is required'),
  last_name: yup.string().max(25, 'Very large last name').required('Last name is required'),
  email: yup.string().email('Not a correct format').required('Email is required'),
  password: yup.string().matches(/^[a-zA-Z0-9]{8,}$/, 'Should contain at least 8 characters')
                        .matches(/^(?=.*\d)/, 'Should contain at least one digit')
                        .matches(/^(?=.*[a-z])/, 'Should contain at least one lower case')
                        .matches(/^(?=.*[A-Z])/, 'Should contain at least one upper case')
                        .max(40, 'Very long password'), 
  birthday: yup.string().required('Birthday is required')
}).required()

const Modal = ({ modalActive, setModalActive, getAllUsers, dataEdit, setDataEdit }) => {
  const { register, handleSubmit, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const defaultValues = {
    first_name: dataEdit.first_name ?? '',
    last_name: dataEdit?.last_name ?? '',
    email: dataEdit?.email ?? '',
    password: dataEdit?.password ?? '',
    birthday: dataEdit?.birthday ?? ''
  }
  
  const handleCloseModal = () => {
    setDataEdit({})
    reset(defaultValues)
    setModalActive(!modalActive)
    getAllUsers()
  }

  const submit = dataUser => {
    if(Object.keys(dataEdit).length){
      const url = `https://users-crud1.herokuapp.com/users/${dataEdit.id}/`
      axios.put(url, dataUser)
      .then(res => {
        console.log('Put correcto')
        handleCloseModal()
        getAllUsers()
      })
      .catch(err => console.log(err))
    }else {
      const url = 'https://users-crud1.herokuapp.com/users/'
      axios.post(url, dataUser)
      .then(res => {
        console.log('Post correcto')
        handleCloseModal()
        getAllUsers()
      })
      .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    reset(defaultValues)
  }, [])

  return (
    <div className={`modal ${modalActive}`} onSubmit={handleSubmit(submit)}>
      <form>
        <h2>{Object.keys(dataEdit).length ? 'Edit User' : 'New User'}</h2>
        <article className="nameModal">
          <i className='bx bxs-user'></i>
          <div className="containerFirstName">
            <InputAndError 
              register={register} 
              inputType={'text'} 
              inputPlaceholder={'First name'} 
              inputRegister={'first_name'} 
              errorMessage={errors.first_name?.message}
            />
          </div>
          <div className="containerLastName">
            <InputAndError 
              register={register} 
              inputType={'text'} 
              inputPlaceholder={'Last name'} 
              inputRegister={'last_name'} 
              errorMessage={errors.last_name?.message}
            />
          </div>
        </article>
        <label htmlFor="emailModal">
          <i className='bx bxs-envelope' ></i>
          <InputAndError 
              register={register} 
              inputType={'email'} 
              inputPlaceholder={'Email'} 
              inputRegister={'email'} 
              errorMessage={errors.email?.message}
          />
        </label>
        <label htmlFor="passwordModal">
          <i className='bx bxs-lock' ></i>
          <InputAndError 
              register={register} 
              inputType={'password'} 
              inputPlaceholder={'Password'} 
              inputRegister={'password'} 
              errorMessage={errors.password?.message}
          />
        </label>
        <label htmlFor="dateModal">
          <i className='bx bxs-cake' ></i>
          <InputAndError 
              register={register} 
              inputType={'date'} 
              inputPlaceholder={''} 
              inputRegister={'birthday'} 
              errorMessage={errors.birthday?.message}
          />
        </label>
        <input 
          type="submit" 
          value={Object.keys(dataEdit).length ? 'Save Changes' : 'Add User'} 
          className="submitModal"
        />
        <i 
          className='bx bx-x'
          onClick={() => handleCloseModal()}   
        ></i>
      </form>
    </div>
  )
}

export default Modal
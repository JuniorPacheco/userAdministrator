import { useState } from "react"
import InputAndError from "./InputAndError"
import ErrorMessage from "./ErrorMessage"
import useLogicValidation from "../hooks/useLogicValidation"
import usePutAndPost from "../hooks/usePutAndPost"

const Modal = ({ modalActive, setModalActive, getAllUsers, dataEdit, setDataEdit }) => {
  const [errorAxiosRequest, setErrorAxiosRequest] = useState('')
  const { register, handleSubmit, reset, errors } = useLogicValidation()

  const { submit, handleCloseModal } = usePutAndPost( 
    setDataEdit,
    modalActive,
    setModalActive,
    dataEdit, 
    getAllUsers, 
    reset, 
    setErrorAxiosRequest )

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
              inputType={'text'} 
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
        {errorAxiosRequest && <ErrorMessage>{errorAxiosRequest}</ErrorMessage>}
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
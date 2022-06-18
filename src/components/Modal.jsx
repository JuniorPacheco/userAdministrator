import { useState } from "react"
import { useForm } from "react-hook-form"

const Modal = ({modalActive, setModalActive}) => {
  const [userStage, setUserStage] = useState({})
  const { register, handleSubmit } = useForm()

  const submit = dataUser => {
    console.log(dataUser)
    setUserStage(dataUser)
  }

  return (
    <div className={`modal ${modalActive}`} onChange={handleSubmit(submit)}>
      <form>
        <h2>New user</h2>
        <article className="nameModal">
          <i className='bx bxs-user'></i>
          <input 
            type="text" 
            placeholder="First name"
            {...register('firstName')}
          />
          <input 
            type="text" 
            placeholder="Last name"
            {...register('lastName')}
          />
        </article>
        <label htmlFor="emailModal">
          <i className='bx bxs-envelope' ></i>
          <input 
            id="emailModal" 
            type="email" 
            placeholder="Email"
            {...register('email')}
          />
        </label>
        <label htmlFor="passwordModal">
          <i className='bx bxs-lock' ></i>
          <input 
            id="passwordModal" 
            placeholder="Password"
            type="password" 
            {...register('password')}
          />
        </label>
        <label htmlFor="dateModal">
          <i className='bx bxs-cake' ></i>
          <input 
            id="dateModal" 
            type="date" 
            {...register('date')}
          />
        </label>
        <input 
          type="submit" 
          value="Add User" 
          className="submitModal"
        />
      </form>
      <i 
        className='bx bx-x'
        onClick={() => setModalActive(!modalActive)}   
      ></i>
    </div>
  )
}

export default Modal
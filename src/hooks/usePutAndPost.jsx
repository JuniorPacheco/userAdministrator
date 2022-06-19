import { useEffect } from "react"
import axios from "axios"

const usePutAndPost = ( setDataEdit, modalActive, setModalActive, dataEdit, getAllUsers, reset, setErrorAxiosRequest ) => {
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
      .then(() => {
        console.log('Put correcto')
        handleCloseModal()
        getAllUsers()
      })
      .catch(err => console.log(err))
    }else {
      const url = 'https://users-crud1.herokuapp.com/users/'
      axios.post(url, dataUser)
      .then(() => {
        console.log('Post correcto')
        handleCloseModal()
        getAllUsers()
      })
      .catch(err => {
        setErrorAxiosRequest(err.response.data.email[0])
        setTimeout(() => {
          setErrorAxiosRequest('')
        }, 2000)
      })
    }
  }

  useEffect(() => {
    reset(defaultValues)
  }, [])

  return { submit, handleCloseModal }
}

export default usePutAndPost
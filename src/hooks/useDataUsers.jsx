import { useState, useEffect } from "react"
import axios from 'axios'

const useDataUsers = () => {
    const [users, setUsers] = useState([])

    const getAllUsers = () => {
      const url = 'https://users-crud1.herokuapp.com/users/'
      axios.get(url)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
    }

    useEffect(() => {
        const url = 'https://users-crud1.herokuapp.com/users/'
        axios.get(url)
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [])
  return { users, getAllUsers }
}

export default useDataUsers
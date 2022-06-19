import { useState } from "react"
import CardUser from "./components/CardUser"
import Modal from "./components/Modal"
import useDataUsers from "./hooks/useDataUsers"
import axios from "axios"

function UserAdministrator() {
  const [filters, setFilters] = useState('')
  const [modalActive, setModalActive] = useState(false)

  const { users, getAllUsers } = useDataUsers()

  const deleteUser = (id) => {
    const url = `https://users-crud1.herokuapp.com/users/${id}/`
    axios.delete(url)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => getAllUsers())
  }

  return (
    <div className="userAdministrator">
      <header className="header">
        <section className="header__filter">
          <label htmlFor="filtro">Filtro</label>
          <select 
            id="filtro"
            onChange={e => setFilters(e.target.value)}
          >
            <option value="" >---None---</option>
            <option value="name">Name</option>
            <option value="email">E-mail</option>
            <option value="date">Date</option>
          </select>
        </section>
        <section className={`header__searcher ${filters && 'active'}`}>
          <input 
            type="text" 
            placeholder={`Search by ${filters}`}          
          />
        </section>
        <section className="header__add">
          <button
            onClick={() => setModalActive(!modalActive)}
          >
          <i className='bx bx-user-plus' ></i> Add
          </button>
          <button
            onClick={getAllUsers}
          ><i className='bx bx-refresh'></i> Refresh</button>
        </section>
      </header>

      <main className="main">
        {users.map(user => <CardUser key={user.id} user={user} deleteUser={deleteUser} getAllUsers={getAllUsers}/>)}
      </main>

      <footer className="footer">

      </footer>
      <Modal modalActive={modalActive} setModalActive={setModalActive} getAllUsers={getAllUsers}/>
    </div>
  )
}

export default UserAdministrator

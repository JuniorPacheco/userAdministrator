import { useState } from "react"
import CardUser from "./components/CardUser"
import Modal from "./components/Modal"
import useDataUsers from "./hooks/useDataUsers"
import axios from "axios"

function UserAdministrator() {
  const [filters, setFilters] = useState('')
  const [modalActive, setModalActive] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const [searchValue, setSearchValue] = useState('')

  const { users, getAllUsers } = useDataUsers()

  const handleAddUser = () => {
    setDataEdit({})
    setModalActive(!modalActive)
  }

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
            <option value="first_name">First name</option>
            <option value="last_name">Last name</option>
            <option value="email">E-mail</option>
            <option value="birthday">Birthday</option>
          </select>
        </section>
        <section className={`header__searcher ${filters && 'active'}`}>
          <input 
            onChange={e => setSearchValue(e.target.value)}
            type="text" 
            placeholder={`Search by ${filters}`}          
          />
        </section>
        <section className="header__add">
          <button
            onClick={handleAddUser}
          >
          <i className='bx bx-user-plus' ></i> Add
          </button>
          <button
            onClick={getAllUsers}
          ><i className='bx bx-refresh'></i> Refresh</button>
        </section>
      </header>

      <main className="main">
        {users.map(user => {
          if(searchValue !== ''){
            if(user[filters]?.includes(searchValue)){
              return <CardUser 
                        key={user.id} 
                        user={user} 
                        deleteUser={deleteUser} 
                        getAllUsers={getAllUsers} 
                        setDataEdit={setDataEdit} 
                        setModalActive={setModalActive}
                    />
            }
          }else {
            return <CardUser 
                      key={user.id} 
                      user={user} 
                      deleteUser={deleteUser} 
                      getAllUsers={getAllUsers} 
                      setDataEdit={setDataEdit} 
                      setModalActive={setModalActive}
                   />
          }
        })}
      </main>

      <footer className="footer">

      </footer>
      {
        modalActive && (
          <Modal 
            modalActive={modalActive} 
            setModalActive={setModalActive} 
            getAllUsers={getAllUsers} 
            dataEdit={dataEdit} 
            setDataEdit={setDataEdit}
          />
        )
      }

    </div>
  )
}

export default UserAdministrator

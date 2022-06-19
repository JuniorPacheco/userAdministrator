const CardUser = ({ user, deleteUser, getAllUsers }) => {
  const { id, email, password, first_name, last_name, birthday } = user

  const handleDeleteUser = async () => {
    await deleteUser(id)
  }

  return (
    <article className="cardUser">
        <section className="cardUser__name">
          <p>{`${first_name} ${last_name}`}</p>
        </section>
        <hr />
        <section className="cardUser__body">
          <h3>E-mail</h3>
          <p> <i className='bx bx-mail-send' ></i> {email}</p>
          <h3>Birthday Date</h3>
          <p><i className='bx bxs-cake'></i> {birthday}</p>
        </section>
        <hr />
        <section className="cardUser__actions">
          <i 
            className='bx bxs-trash' 
            onClick={handleDeleteUser}
          ></i>
          <i className='bx bxs-edit' ></i>
        </section>
    </article>
  )
}

export default CardUser
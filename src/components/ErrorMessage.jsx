const ErrorMessage = ({children}) => {
  return (
    <div className="errorMessage">
        <p>{children}</p>
    </div>
  )
}

export default ErrorMessage
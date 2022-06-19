import ErrorMessage from "./ErrorMessage"

const InputAndError = ({ register, inputType, inputPlaceholder, inputRegister, errorMessage }) => {
  return (
    <>
      <input 
        type={inputType} 
        placeholder={inputPlaceholder}
        {...register(inputRegister)}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  )
}

export default InputAndError
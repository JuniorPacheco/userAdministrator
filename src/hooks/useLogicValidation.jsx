import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    first_name: yup.string().max(25, 'Very large first name').required('First name is required'),
    last_name: yup.string().max(25, 'Very large last name').required('Last name is required'),
    email: yup.string().email('Not a correct format').required('Email is required'),
    password: yup.string().min(8, 'Should contain at least 8 characters')
                          .max(25, 'Must contain less than 25 characters')
                          .matches(/^(?=.*\d)/, 'Should contain at least one digit')
                          .matches(/^(?=.*[a-z])/, 'Should contain at least one lower case')
                          .matches(/^(?=.*[A-Z])/, 'Should contain at least one upper case'), 
    birthday: yup.string().required('Birthday is required')
  }).required()

const useLogicValidation = () => {

    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      })
  return { register, handleSubmit, reset, errors }
}

export default useLogicValidation
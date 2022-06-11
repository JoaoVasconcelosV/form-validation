import React from 'react'
import './App.css'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import errorMessages from "./utils/ErrorsMessages";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const schema = yup.object().shape({
  name: yup.string()
    .required(errorMessages.required),
  email: yup.string()
    .required(errorMessages.required)
    .email(errorMessages.emailInvalid),
  age: yup.string()
    .required(errorMessages.required),
  phone: yup.string()
    .required(errorMessages.required)
    .matches(phoneRegExp, 'Telefone invalido')
})

function App() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => console.log(data);

  console.log(errors);

  return (
    <div className="App">
      <h1>Form Validation Test</h1>
      <div className="Form">
        <input type="text" { ...register("name") } />
        { errors.name && <span>{errors.name.message}</span> }

        <input type="text" { ...register("email") } />
        { errors.email && <span>{errors.email.message}</span> }

        <input type="number" { ...register("age") } />
        { errors.age && <span>{errors.age.message}</span> }

        <input type="text" { ...register("phone") } />
        { errors.phone && <span>{errors.phone.message}</span> }

        <button onClick={handleSubmit(onSubmit)}>Enviar</button>
      </div>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import { Link } from '@reach/router';

const Add = (props) => {
  const [formState, setFormState] = useState({
    name: ""
  })
  const [errorState, setErrorState] = useState({
    name: ""
  })

  const [errors, setErrors] = useState([]);

  const onChangeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/v1/create', formState)
      .then(response => {
        if (response.data.errors) {
          setErrorState({
            name: response.data.errors.name ? response.data.errors.name.message : ""
          })
        } else {
          console.log("success")
          navigate("/")
        }
      })
      .catch(error => console.log(error))
  }
  return (
    <div>
      <p>{errorState.name}</p>
      <Link style={{ margin: '5px' }} to="/">Home</Link>
      <form onSubmit={onSubmitHandler}>
        <p>Add a new author</p>

        <input type="text" name="name" onChange={onChangeHandler} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Add

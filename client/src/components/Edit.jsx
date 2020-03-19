import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate, Link } from '@reach/router';

const Edit = (props) => {
    const [formState, setFormState] = useState({
        name: ""
    })
    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/readOne/${props.id}`)
            .then(response => {
                setFormState({ ...response.data })
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    const [errorState, setErrorState] = useState({
        name: ""
    })

    const onChangeHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/v1/updateOne/${formState._id}`, formState)
            .then(response => {
                console.log(response.data)
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

    const renderEditForm = () => {
        return (
            <div>
                <p>{errorState.name}</p>
                <Link style={{ margin: '5px' }} to="/">Home</Link>
                <form onSubmit={onSubmitHandler}>
                    <p>Edit this author</p>
                    <input type="text" name="name" onChange={onChangeHandler} value={formState.name} />
                    <button type="submit">Submit</button>
                    <button type="cancel" onClick={(e) => navigate("/")}>Cancel</button>
                </form>
            </div>
        );
    }

    const renderErrorMessage = () => {
        return (
            <div>
                <p>We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?</p>
                <Link style={{margin:'5px'}} to="/new">Add an author</Link>
            </div>
        );
    }

    return (
        <div>
            {formState.name === "CastError"
            ? renderErrorMessage()
            : renderEditForm()}

        </div>
    )
}

export default Edit


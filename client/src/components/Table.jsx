import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, navigate } from '@reach/router'

const Table = (props) => {
    const [state, setState] = useState([])
    const [deleteState, setDeleteState] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/readAll')
            .then(response => setState([...response.data]))
            .catch(error => console.log(error))
    }, [deleteState])

    const onDeleteHandler = (e, item) => {
        console.log(item._id)
        axios.delete(`http://localhost:8000/api/v1/deleteOne/${item._id}`)
            .then(response => setDeleteState(!deleteState))
            .catch(error => console.log(error))
    }
    const goToEdit = (e, item) => {
        navigate(`/edit/${item._id}`);
    }
    return (
        <div>
              <Link style={{margin:'5px'}} to="/new">Add an author</Link>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((item, index) => (
                        <tr key={index}>
                            <td><Link to={`/details/${item._id}`}>{item.name}</Link></td>
                            <td>
                                <button onClick={(e) => goToEdit(e, item)}>Edit</button> |
                <button onClick={(e) => onDeleteHandler(e, item)}>DESTROY!</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table

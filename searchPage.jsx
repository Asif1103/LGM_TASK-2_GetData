import React from 'react'
import './searchPage.css'
import { useState } from 'react'
import axios from 'axios'

const SearchPage = () => {

    const [input, setInput] = useState("")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (input < 1 || input > 2) {
                alert('Only 2 pages are there')
                return
            }
            setLoading(true)
            const response = await fetch(`https://reqres.in/api/users?page=${input}`)
            const jsonResponse = await response.json()
            setUsers(jsonResponse.data)
            setLoading(false)


            console.log(jsonResponse)


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <nav className="navbar">
                    <div className="container-fluid">
                        <h1 className="navbar-brand">Users-List</h1>
                        <div className='form'>
                            <form className="d-flex" onSubmit={handleSubmit}>
                                <input className="form-control" type="text" placeholder="    Enter page (1 or 2)" aria-label="Search" value={input} onChange={(e) => setInput(e.target.value)} required />
                                <button className="btn" type="submit">Get Users</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            {loading ? (
                <h1 className='text-center'>Loading...</h1>
            ) : (
                <div className='d-flex'>
                    {users.map(u => (
                        <div className="card" style={{ width: '14rem' }}>
                            <img src={`https://reqres.in/img/faces/${u.id}-image.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p><b>ID: </b> {u.id}</p>
                                <p><b>Name: </b>{u.first_name} {u.last_name}</p>
                                <p><b>Email: </b>{u.email}</p>

                            </div>
                        </div>

                    ))}
                </div>
            )}

        </div>
    )
}

export default SearchPage
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom';


const Books = () => {
    const [books,setBooks] = useState([])

    // Conectar ao backend
    useEffect(() => {
        const fecthAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
                // console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fecthAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/id/"+id)
            window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Livraria</h1>
            <div className="books">
                {books.map((book, index) => (
                    <div className="book" key={book.id || index}>
                        {book.COVER && <img src={book.COVER} alt=""/>}
                        <h2>{book.TITLE}</h2>
                        <p>{book.DESC}</p>
                        <span>{book.PRICE}</span>
                        <button className="delete" onClick={()=>handleDelete(book.ID)}>Delete</button>
                        <button className="update">Update</button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add">Add new book</Link>
            </button>
        </div>
    )
}

export default Books
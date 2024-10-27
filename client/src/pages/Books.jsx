import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

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

    const navigate = useNavigate()
    const handleClick = (e) => {
        try {
            navigate("./add")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <main className="main">
            <h1>Livraria do Kauê</h1>
            <div>
                <div className="books">
                    {books.map((book, index) => (
                        <div className="book" key={book.id || index}>
                            {book.COVER && <img src={book.COVER} alt=""/>}
                            <h2>{book.TITLE}</h2>
                            <p>{book.DESC}</p>
                            <span>R$ {book.PRICE}</span>
                            <div className="buttons">
                                <button className="delete" onClick={()=>handleDelete(book.ID)}>Deletar</button>
                                <button className="update"><Link className="updateLink" to={`./Update/${book.ID}`}>Alterar</Link></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="formButton" onClick={handleClick}>Adicionar novo livro</button>
        </main>      
    )
}

export default Books
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import "../styles/books.css"

const Books = () => {
    const [books, setBooks] = useState([])

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
            await axios.delete(`http://localhost:8800/books/id/${id}`)
            window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }

    const navigate = useNavigate()
    const handleAddBook = (e) => {
        try {
            navigate("./add")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="books-wrapper">
            <div className="books-header">
                <div>                    
                    <h1>📚 Catálogo de Livros Administrativo</h1>
                    <button className="add-btn" onClick={handleAddBook}>Adicionar Livro</button>
                </div>
            </div>

            <div className="books">
                <div className="books-carousel">
                    {books.map((book, index) => (
                        <div className="book-card" key={book.id || index}>
                            <div className="book-info">    
                                {book.COVER && (
                                    <img
                                        src={book.COVER}
                                        alt={`Capa de ${book.TITLE}`}
                                        className="book-cover"
                                    />
                                )}
                                <h2>{book.TITLE}</h2>
                                <p><strong>Autor:</strong> {book.AUTHOR}</p>
                                <div className="book-description">
                                {book.DESC}
                                </div>
                                <p><strong>Preço:</strong> R${book.PRICE.toFixed(2)}</p>
                            </div>
                            <div className="card-buttons">
                            <button className="delete-btn" onClick={()=>handleDelete(book.ID)}>Deletar</button>
                            <button className="edit-btn"><Link className="updateLink" to={`./update/${book.ID}`}>Editar</Link></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer">
                <p>📚 Livraria do KauêTTS © {new Date().getFullYear()} - Todos os direitos reservados</p>
            </footer>
        </div>    
    )
}

export default Books
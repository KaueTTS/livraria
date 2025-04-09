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
        <div className="book-wrapper">
            <div className="books-header">
                <h1>📚 Catálogo de Livros</h1>
                <button className="add-btn" onClick={handleClick}>Adicionar Livro</button>
            </div>

            <div className="books-carousel">
                {books.map((book, index) => (
                    <div className="book-card" key={book.id || index}>
                        <div className="book-info">    
                            <h2>{book.TITLE}</h2>
                            <p><strong>Autor:</strong> {book.AUTHOR}</p>
                            <p>{book.DESC}</p>
                            <p><strong>Preço:</strong> R${book.PRICE.toFixed(2)}</p>
                        </div>
                        <div className="card-buttons">
                        <button className="delete-btn" onClick={()=>handleDelete(book.ID)}>Deletar</button>
                        <button className="edit-btn"><Link className="updateLink" to={`./Update/${book.ID}`}>Editar</Link></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>


        // <main className="main">
        //     <h1>Livraria do Kauê</h1>
        //     <div>
        //         <div className="books">
        //             {books.map((book, index) => (
        //                 <div className="book" key={book.id || index}>
        //                     {book.COVER && <img src={book.COVER} alt=""/>}
        //                     <h2>{book.TITLE}</h2>
        //                     <p>{book.DESC}</p>
        //                     <span>R$ {book.PRICE}</span>
        //                     <div className="buttons">
        //                         <button className="delete" onClick={()=>handleDelete(book.ID)}>Deletar</button>
        //                         <button className="update"><Link className="updateLink" to={`./Update/${book.ID}`}>Alterar</Link></button>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        //     <button className="formButton" onClick={handleClick}>Adicionar novo livro</button>
        // </main>      
    )
}

export default Books
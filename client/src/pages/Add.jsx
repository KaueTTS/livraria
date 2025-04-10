import axios from "axios"
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/addAndUpdate.css"

const Add = () => {
    const [book, setBook] = useState({
        title:"",
        author:"",
        desc:"",
        price:null,
        cover:"",
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    console.log(book)
    return (
        <div className="form-container">
            <h1>ADICIONAR NOVO LIVRO</h1>
            <form>
                <input type="text" placeholder="Título" onChange={handleChange} name="title"/>
                <input type="text" placeholder="Autor" onChange={handleChange} name="author"/>
                <input type="text" placeholder="Descrição" onChange={handleChange} name="desc"/>
                <input type="number" placeholder="Preço" onChange={handleChange} name="price"/>
                <input type="text" placeholder="URL da capa" onChange={handleChange} name="cover"/>

                <button className="formButton" onClick={handleClick}>Adicionar</button>
            </form>
        </div>
    )
}

export default Add
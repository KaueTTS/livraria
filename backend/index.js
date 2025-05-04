import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()

// Conectar ao banco
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kaue12345",
    database:"livraria"
})

app.use(express.json())
app.use(cors())
app.get("/", (req,res)=>{
    res.json("Olá, isso é o backend!")
})

// Listar livros
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"

    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

    /* script busca de livros
    curl --location 'http://localhost:8800/books' \
    --data ''
    */
})

// Inserir novo livro
app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`, `author`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.author,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Livro criado com succeso!")
    })
})

// Deletar livro
app.delete("/books/id/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Livro deletado com succeso!")
    })
})

// Editar livro
app.put("/books/id/:id", (req,res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `author` = ?,`desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.author,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values,bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Livro editado com succeso!")
    })
})

// Conectar o servidor
app.listen(8800, () => {
    console.log("Conectado ao backend!")
})
const express = require('express');
const app = express();

require("./models/Artigo")
const mongoose = require('mongoose');
const Artigo = mongoose.model('artigo')

app.use(express.json())
app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if(err) return res.statusCode(400).json({
            error: true,
            message: "Erro: Artigo não cadastrado!"
        })
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    })
})

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/projetinhofellas').then(() => {
    console.log('Conexão estabelecida!')
}).catch(() => {
    console.log('Conexão não estabelecida!');
})

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080...");
});
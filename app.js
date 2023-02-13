const express = require('express');
const app = express();

require("./models/Artigo")
const mongoose = require('mongoose');
const cors = require('cors');
const Artigo = mongoose.model('artigo')

app.use(express.json())

app.use((req, res, next) => {
    //console.log("Acessou o middleware");
    //res.header("Access-Control-Allow-Origin", "http://localhost:8080")
    res.header("Access-Control-Allow-Origin", 'PUT, POST, DELETE')
    app.use(cors());
    next();
})

app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});

app.get("/artigo/:id", (req, res) => {
    Artigo.findOne({_id:req.params.id}).then((artigo) => {
        return res.json(artigo);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado para esse ID"
        })
    })
})

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

app.put("/artigo/:id", (req, res) => {
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body, (error) => {
        if(error) return res.status(400).json({
            error: true,
            message: "Erro: não foi possível editar o artigo"
        })
        return res.json({
            error: false,
            message: "Artigo editado com sucesso!"
        })
    })
})

app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, req.body, (error) => {
        if(error) return res.status(400).json({
            error: true,
            message: "Erro: não foi possível editar o artigo"
        })
        return res.json({
            error: false,
            message: "Artigo editado com sucesso!"
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
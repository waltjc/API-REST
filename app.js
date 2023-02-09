const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json())
app.get("/", (req, res) => {
    return res.json({
        titulo: "Teste de API REST"
    });
});

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost/projetinhofellas').then(() => {
    console.log('Conexão estabelecida!')
}).catch(() => {
    console.log('Conexão não estabelecida!');
})

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080...");
});
const express = require('express');
const app = express();

app.use(express.json())
app.get("/", (req, res) => {
    return res.json({
        titulo: "Teste de API REST"
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080...");
});
import crypto from "crypto";
import db from './../database/db.js'; // Importa seu arquivo de configuração do banco de dados

export default function gerarToken() {
    const token = crypto.randomBytes(3).toString("hex");

    console.log("Token gerado e armazenado com sucesso:", token);

    return token
}

gerarToken()

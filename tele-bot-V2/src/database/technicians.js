import db from "./db.js";
import utils from "../services/utils.js";

// Função para transformar db.run em uma função baseada em Promise
function runQuery(query, params) {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err); // Rejeita a Promise em caso de erro
            } else {
                resolve(this); // Resolve a Promise, podendo passar o contexto (this) se precisar
            }
        });
    });
}

// Função assíncrona para adicionar o token
async function addTechnician(name, telegram_id, authorization_level) {
    const query = `INSERT INTO Technicians (name, telegram_id, authorization_level) VALUES (?,?,?)`;

    try {
        // Usa await para aguardar a execução da query

        await runQuery(query, [name, telegram_id, authorization_level]);

        return {
            status: true,
            response: `Usuário Criado com Sucesso!`,
            userInfo: { name, telegram_id, authorization_level },
        }; // Retorna o name gerado, se necessário
    } catch (err) {
        const errorResponse = `Erro ao Cadastra o Usuário: ${err.message}`;

        return { status: false, response: errorResponse };
    }
}

function verifyUserPermission(telegram_id, expected_level) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Technicians WHERE telegram_id = ?`;

        db.get(query, [telegram_id], (err, row) => {
            if (err) {
                console.error(err.message);

                reject({ status: false, response: err });
            } else if (row) {
                if (row.authorization_level >= expected_level) {
                    resolve({
                        status: true,

                        response: "Usuário pode realizar a ação.",
                    });
                } else if (row.authorization_level < expected_level) {
                    resolve({
                        status: false,
                        response: "Usuário não tem permissão para essa ação.",
                    });
                }
            } else {
                resolve({ status: false, response: "Usuário não cadastrado" });
            }
        });
    });
}

function getUserPermission(telegram_id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Technicians WHERE telegram_id = ?`;

        db.get(query, [telegram_id], (err, row) => {
            if (err) {
                console.error(err.message);

                reject({ status: false, response: err });
            } else if (row) {
                resolve({
                    status: true,
                    response: "Usuário Cadastrado",
                    userInfo: row,
                    authorization_level: row.authorization_level,
                });
            } else {
                resolve({ status: false, response: "Usuário não cadastrado" });
            }
        });
    });
}

export default {
    addTechnician,
    verifyUserPermission,
    getUserPermission,
};

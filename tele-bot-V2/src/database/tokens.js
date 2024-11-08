import db from "./db.js";
import crypto from "crypto";
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
async function addToken() {
	const token = crypto.randomBytes(3).toString("hex");
	const query = `INSERT INTO Tokens (token) VALUES (?)`;

	try {
		// Usa await para aguardar a execução da query
		await runQuery(query, [token]);
		return token; // Retorna o token gerado, se necessário
	} catch (err) {
		console.error("Erro ao adicionar token:", err.message);
		throw new Error(`Erro ao adicionar token: ${err.message}`);
	}
}

function verifyToken(token) {
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Tokens WHERE token = ?`;
		db.get(query, [token], (err, row) => {
			if (err) {
				console.error("Erro ao verificar token:", err.message);
				reject({ status: false, response: err });
			} else if (row) {
				if (row.status === "liberado") {
					resolve({ status: true, response: "Token Autorizado" });
				} else if (row.status === "ativo") {
					resolve({ status: false, response: "Token Já Utilizado" });
				} else if (row.status === "bloqueado") {
					resolve({ status: false, response: "Token Bloqueado" });
				}
			} else {
				resolve({ status: false, response: "Token Inexistente" });
			}
		});
	});
}

function updateToken(token) {
	return new Promise((resolve, reject) => {
		const query = `UPDATE Tokens SET status = 'ativo' WHERE token = ?`;
		db.run(query, [token], function (err) {
			if (err) {
				console.error("Erro ao atualizar token:", err.message);
				reject({status: false, response: `Erro ao atualizar token: ${err.message}`});
			} else {
				resolve({status: true, response: `Token '${token}' Atualizado com sucesso.`});
			}
		});
	});
}

/**
 * Função que Verifica o token de Usuário e retorna um objeto
 * @param {string} token - String com caracteres hex adecimais
 * @returns {Promise<{status: boolean; response: string;}} { status: boolean, response: string }
 */
async function authToken(token) {
	try {
		// Realiza a Verificação do Token
		const tokenVerification = await verifyToken(token);
		if (tokenVerification.status) {
			// Atualiza o Status do Token para 'ativo'
			let updateTokenResponse = await updateToken(token);
			
			
			return {
				status: true,
				response: `Token '${token}' Cadastrado com Sucesso!`,
			};
		} else {
			return {
				status: false,
				response: tokenVerification.response
			}
		}
	} catch (error) {
		return {
			status: false,
			response: `Erro ao Autenticar Token: ${error.message}`,
		};
	}
}

/**
 * Funções e Variáveis voltadas para Criação de Usuários, Autenticação de Tokens etc.
 */
export default {
	addToken,
	verifyToken,
	updateToken,
	authToken,
};

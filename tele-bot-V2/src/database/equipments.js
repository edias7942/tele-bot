import db from "./db.js";

// Função para adicionar equipamento
function addEquipment(name, description, category, nameClass, totalStock) {
    const query = `INSERT INTO Equipments (name, description, category, name_class, total_stock) VALUES (?, ?, ?, ?, ?)`;
    db.run(
        query,
        [name, description, category, nameClass, totalStock],
        function (err) {
            if (err) {
                console.error("Erro ao adicionar equipamento:", err.message);
            } else {
                console.log(
                    "Equipamento adicionado com sucesso. ID:",
                    this.lastID
                );
            }
        }
    );
}

// Função para listar equipamentos
function listEquipments() {
    const query = `SELECT * FROM Equipments`;

    // Retorna uma Promise que resolve com os dados dos equipamentos
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                console.error("Erro ao listar equipamentos:", err.message);
                reject(err); // Rejeita a Promise em caso de erro
            } else {
                resolve(rows); // Resolve a Promise com os dados dos equipamentos
            }
        });
    });
}

function equipmentByTo(item, itemToQuery) {

    const query = `SELECT * FROM Equipments WHERE ${item} = '${itemToQuery}'`;

    // Retorna uma Promise que resolve com os dados dos equipamentos
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                console.error("Erro ao listar equipamentos:", err.message);
                reject(err); // Rejeita a Promise em caso de erro
            } else {
                resolve(rows); // Resolve a Promise com os dados dos equipamentos
            }
        });
    });
}

// Função para listar as categorias
function listCategories() {
    const query = `SELECT DISTINCT category FROM Equipments`;

    // Retorna uma Promise que resolve com os dados dos categorias
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                console.error("Erro ao listar categorias:", err.message);
                reject(err); // Rejeita a Promise em caso de erro
            } else {
                resolve(rows); // Resolve a Promise com os dados dos categorias
            }
        });
    });
}

export default {
    listCategories,
    listEquipments,
    equipmentByTo,
    addEquipment,
};

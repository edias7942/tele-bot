import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose()

const db = new sqlite.Database("./src/database/database.sqlite");

db.serialize(() => {
    // Tabela de técnicos
    db.run(`CREATE TABLE IF NOT EXISTS Technicians (
        technician_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        telegram_id TEXT,
        authorization_level INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    // // Tabela de equipamentos
    // db.run(`CREATE TABLE IF NOT EXISTS Equipments (
    //     equipment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name TEXT NOT NULL,
    //     description TEXT,
    //     category TEXT,
    //     name_class TEXT,
    //     total_stock INTEGER NOT NULL DEFAULT 0
    // );`);

    // // Tabela de estoque dos técnicos
    // db.run(`CREATE TABLE IF NOT EXISTS TechnicianStock (
    //     technician_id INTEGER,
    //     equipment_id INTEGER,
    //     quantity INTEGER NOT NULL DEFAULT 0,
    //     PRIMARY KEY (technician_id, equipment_id),
    //     FOREIGN KEY (technician_id) REFERENCES Technicians(technician_id) ON DELETE CASCADE,
    //     FOREIGN KEY (equipment_id) REFERENCES Equipments(equipment_id) ON DELETE CASCADE
    // );`);

    // // Tabela de estoque geral
    // db.run(`CREATE TABLE IF NOT EXISTS Inventory (
    //     item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     equipment_id INTEGER UNIQUE NOT NULL,
    //     total_quantity INTEGER NOT NULL DEFAULT 0, -- Quantidade total no estoque
    //     reserved_quantity INTEGER DEFAULT 0, -- Quantidade reservada ou em processamento
    //     FOREIGN KEY (equipment_id) REFERENCES Equipments(equipment_id) ON DELETE CASCADE
    // );`);

    // // Tabela de histórico de alterações no estoque
    // db.run(`CREATE TABLE IF NOT EXISTS InventoryLog (
    //     log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     equipment_id INTEGER NOT NULL,
    //     technician_id INTEGER, -- ID do técnico que requisitou o item, caso relevante
    //     warehouse_staff_id INTEGER NOT NULL, -- ID do funcionário do almoxarifado que autorizou a retirada
    //     change_type TEXT NOT NULL, -- Tipo de mudança: 'entrada', 'saída', 'ajuste'
    //     quantity INTEGER NOT NULL, -- Quantidade da mudança
    //     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     FOREIGN KEY (equipment_id) REFERENCES Equipments(equipment_id) ON DELETE SET NULL,
    //     FOREIGN KEY (warehouse_staff_id) REFERENCES Technicians(technician_id) ON DELETE SET NULL
    // );`);

    // // Tabela de tokens de acesso ao sistema
    // db.run(`CREATE TABLE IF NOT EXISTS Tokens (
    //     token_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     token TEXT UNIQUE NOT NULL,
    //     status TEXT CHECK(status IN ('ativo', 'bloqueado', 'liberado')) DEFAULT 'liberado',
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    // );`);
});

export default db;

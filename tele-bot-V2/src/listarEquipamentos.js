import dbEquipments from "./database/equipments.js";

// dbEquipments.addEquipment("Roteador Huaweii",'Roteador de 300 MEGA para clientes','Roteador','Roteador 300 MEGA',12)

let lista = dbEquipments.listEquipments()

export default async function listarEquipamentos(ctx) {
    try {
        const equipamentos = await dbEquipments.listEquipments();
        let item = equipamentos[0];
        ctx.reply(
            `${item.equipment_id} - ${item.name} - ${item.name_class}. (${item.total_stock})`
        );
        console.log(equipamentos); // Exibe o array de objetos dos equipamentos
    } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
    }
}

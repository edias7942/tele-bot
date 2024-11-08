import technicians from "../database/technicians.js";
import utils from "./../services/utils.js";
import { bot } from "./../teste.js";

export default async (ctx) => {
    let pedidoTotal = utils.pedidoTotal.get(ctx.chat.id);

    let user = await technicians.getUserPermission(ctx.chat.id);

    console.log(user);

    let orderGroupAction = `Enviando Pedido para o Grupo de pedidos.`;
    utils.userAction("success", ctx, orderGroupAction);

    let pedidoMessage =
        `🛒⬇️ Novo Pedido \n\n` +
        `Técnico: ${user.userInfo.name}. \n` +
        `ID: ${user.userInfo.technician_id} \n\n`;

    let i = 1;
    for (let item of pedidoTotal) {
        let addMessage = `${i} - ${item.item} (Qtd: ${item.quantidade})\n`;
        pedidoMessage += addMessage;
        i++;
    }

    bot.telegram.sendMessage(-1002455546170, pedidoMessage);
};

import equipments from "../database/equipments.js";
import utils from "../services/utils.js";

export default async (ctx) => {
    if (!utils.verificarEtapa(ctx, "Awaiting_Item_Quantity", utils))
        return console.log("Botão Clicado Duas Vezes.");

    // Extrai o nome do roteador da ação
    const selectedItem = ctx.match[1];

    utils.atualizarState(utils.pedidoAtual, ctx, { item: selectedItem });

    let pedidoTotal = utils.imprimirPedidoTotal(ctx, utils);

    let userMessageReply = `${pedidoTotal}\nItem: ${selectedItem}\n\nQuantos Itens/Metros você deseja?`;
    
    utils.telegramEditMessage(ctx, userMessageReply);

    utils.etapaAtual.set(ctx.chat.id, "Awaiting_Item_Quantity");

    let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
    let userMessage = `Selecionou o Item: '${selectedItem}'. (Etapa: ${etapaAtual})`;
    utils.userAction("default", ctx, userMessage);
};

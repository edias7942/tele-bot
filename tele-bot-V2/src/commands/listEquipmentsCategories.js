import equipments from "../database/equipments.js";
import utils from "./../services/utils.js";

export default async (ctx) => {
    if (!utils.verificarEtapa(ctx, "Listando_Categorias", utils)) {
        let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
        let userMessage = `Botão clicado duas vezes. (Etapa: ${etapaAtual})`;

        return utils.userAction("warning", ctx, userMessage);
    }

    

    let categoriesList = await equipments.listCategories();

    let buttons = [];

    for (let item of categoriesList) {
        buttons.push({
            value: item.category,
            action: `listEquipmentsItems_${item.category}`,
        });
    }

    buttons.push({ value: "🏠  Início", action: "inicio" });

    let pedidoTotal = utils.imprimirPedidoTotal(ctx, utils);

    let userMessageReply = `${pedidoTotal}\n⬇️  Escolha a Categoria:`;
    utils.telegramEditMessage(ctx, userMessageReply, buttons);

    utils.etapaAtual.set(ctx.chat.id, "Listando_Categorias");

    let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
    let userMessage = `Selecionou o Menu: 'Fazer Pedido'. (Etapa: ${etapaAtual})`;
    utils.userAction("default", ctx, userMessage);
};

import equipments from "../database/equipments.js";
import utils from "../services/utils.js";

export default async (ctx) => {
    if (!utils.verificarEtapa(ctx, "Listando_Itens", utils)) {
        let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
        let userActionMessage = `Botão clicado duas vezes. (Etapa: ${etapaAtual})`;
        return utils.userAction("warning", ctx, userActionMessage);
    }
    // Extrai o nome do roteador da ação
    const selectedCategory = ctx.match[1];

    let itemsListOfCategory = await equipments.equipmentByTo(
        "category",
        selectedCategory
    );

    let buttons = [];

    for (let item of itemsListOfCategory) {
        buttons.push({
            value: item.name_class,
            action: `getItemQuantity_${item.name_class}`,
        });
    }

    buttons.push({ value: "🏠  Início", action: "inicio" });

    let pedidoTotal = utils.imprimirPedidoTotal(ctx, utils);

    let userMessageReply = `${pedidoTotal}\n⬇️  Escolha um Item:`;
    utils.telegramEditMessage(ctx, userMessageReply, buttons);

    utils.etapaAtual.set(ctx.chat.id, "Listando_Itens");

    let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
    let userMessage = `Selecionou a Categoria: '${selectedCategory}'. (Etapa: ${etapaAtual})`;
    utils.userAction("default", ctx, userMessage);
};

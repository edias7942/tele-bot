import utils from "./../services/utils.js";
import { Markup } from "telegraf";

export default (ctx) => {
    if (!utils.verificarEtapa(ctx, "Listando_Itens", utils))
        return console.log("Botão Clicado Duas Vezes.");

    // Extrai o nome do roteador da ação
    const item = ctx.match[1];

    utils.atualizarPedidoAtual(utils.pedidoAtual, ctx, { item });

    let quantidadesListadas = [];

    for (let i = 1; i <= 5; i++) {
        quantidadesListadas.push([
            Markup.button.callback(`${i}`, `QuantidadeRoteador_${i}`),
        ]);
    }
    quantidadesListadas.push([Markup.button.callback("<- Voltar", "Inicio")]);

    let pedidoTotalText = utils.imprimirPedidoTotal(ctx, utils);

    ctx.editMessageText(
        `${pedidoTotalText}\nProduto Selecionado ✅\nItem: ${item} \n\nQuantos Itens deseja:`,
        Markup.inlineKeyboard(quantidadesListadas)
    );

    utils.etapaAtual.set(ctx.chat.id, "Listando_Itens");

    utils.userAction("success", ctx, `Selecionou o Item: '${item}'.`);
};

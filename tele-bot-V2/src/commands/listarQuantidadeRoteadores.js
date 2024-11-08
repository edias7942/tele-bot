import utils from "./../services/utils.js";
import { Markup } from "telegraf";

export default (ctx) => {
    if (!utils.verificarEtapa(ctx, "Listando_Quantidades", utils))
        return console.log("Botão Clicado Duas Vezes.");

    // Extrai o nome do roteador da ação
    const quantidade = ctx.match[1]; // O segundo grupo do regex contém o nome

    // Você pode usar o nome do roteador como quiser

    utils.atualizarPedidoAtual(utils.pedidoAtual, ctx, { quantidade });

    let QuantidadeListadas = [];

    for (let i = 1; i <= 5; i++) {
        QuantidadeListadas.push([
            Markup.button.callback(`${i}`, `QuantidadeRoteador_${i}`),
        ]);
    }
    
    let pedidoTotal = utils.imprimirPedidoTotal(ctx, utils);

    ctx.editMessageText(
        `Produto Adicionado ✅\n\n${pedidoTotal}\nO que deseja Fazer:`,
        Markup.inlineKeyboard([
            [Markup.button.callback("Adicionar Produto", "Inicio")],
            [Markup.button.callback("Finalizar Pedido!", "finalizarPedido")],
        ])
    );
    let pedidoAtualObj = utils.pedidoAtual.get(ctx.chat.id);

    utils.adicionarPedidoTotal(utils.pedidoTotal, ctx, pedidoAtualObj);

    utils.pedidoAtual.set(ctx.chat.id, {});

    utils.etapaAtual.set(ctx.chat.id, "Listando_Quantidades");

    utils.userAction(
        "success",
        ctx,
        `Selecionou a Quantidade: '${quantidade}'.`
    );

    utils.userAction("warning", ctx, "Limpando Pedido Atual...");

    utils.userAction("default", ctx, "Pedido Total:");

    console.log(utils.pedidoTotal.get(ctx.chat.id));
};

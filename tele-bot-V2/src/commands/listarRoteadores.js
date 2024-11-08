import utils from "./../services/utils.js";
import { Markup } from "telegraf";

export default (ctx) => {

    if (!utils.verificarEtapa(ctx, "Listando_Categorias", utils))
        return utils.userAction(
            "warning",
            ctx,
            `Botão clicado duas vezes. (Etapa: ${utils.etapaAtual.get(
                ctx.chat.id
            )})`
        );
    
    let roteadoresListados = [];

    let comandoRealizado = ctx.match[0];

    let categoriasDict = {
        listarRoteadores: "Roteadores",
    };

    let categoria = categoriasDict[comandoRealizado];

    for (let item of utils.roteadoresList) {
        roteadoresListados.push([
            Markup.button.callback(`${item.name}`, `AddRoteador_${item.name}`),
        ]);
    }
    roteadoresListados.push([Markup.button.callback("<- Voltar", "inicio")]);

    let pedidoTotal = utils.imprimirPedidoTotal(ctx, utils);

    ctx.editMessageText(
        `${pedidoTotal}\nEscolha o Item:`,
        Markup.inlineKeyboard(roteadoresListados)
    );

    utils.etapaAtual.set(ctx.chat.id, "Listando_Categorias");

    utils.userAction(
        "success",
        ctx,
        `Selecionou a Categoria: '${categoria}'. (Etapa: ${utils.etapaAtual.get(
            ctx.chat.id
        )})`
    );
};

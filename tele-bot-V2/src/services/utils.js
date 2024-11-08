import { Markup } from "telegraf";
let tokenIxc =
    "123:1126d710b86bd9344315e13133abe8cf722bcb88321203ab5d9e201475658f54";
/**
 * Armazena dados do pedido Atual do Usuário.
 * @type {Map<ctx, <object>>}
 * @description Mapa que gerencia o pedido atual de cada usuário.
 */
const pedidoAtual = new Map();

/**
 * Armazena dados do pedido Total do Usuário.
 * @type {Map<ctx, object>}
 * @description Mapa que gerencia o pedido total de cada usuário.
 */
const pedidoTotal = new Map();

/**
 * Armazena dados do Perfil do Usuário.
 * @type {Map<ctx, object>}
 * @description Mapa que gerencia o perfil do usuário.
 */
const userInfo = new Map();

/**
 * Armazena dados da etapa Atual do App em que o usuário está.
 * @type {Map<ctx, string>}
 * @description Mapa que gerencia a etapa atual do pedido de cada usuário.
 */
const etapaAtual = new Map();

// Lista de Cores para Status das Mensagens
/**
 * Lista de Cores para o Terminal.
 * @type {status: "default" | "error" | "success" | "warning" | "receiving"}
 */
const statusList = {
    default: "\x1b[0m", // Cor padrão
    error: "\x1b[31m", // Cor Vermelha
    success: "\x1b[32m", // Cor Verde
    warning: "\x1b[33m", // Cor Amarela
    receiving: "\x1b[34m", // Cor Azul
};

/**
 * Função para imprimir no Terminal uma ação de um usuário específico
 * @param {"default" | "error" | "success" | "warning" | "receiving"} status - Escolha entre uma das opções:
 *
 *  default (branco) | error (vermelho) | success (verde) | warning (amarelo) | receiving (ciano)
 * @param {object} ctx - Context para o Chat.
 * @param {string} message - Mensagem para ser impressa da ação do usuário
 */
function userAction(status, ctx, message) {
    console.log(
        `${statusList[status]}Usuário ${ctx.chat.username} (${ctx.chat.id}) --> ${message}\x1b[0m\n`
    );
}

function atualizarState(state, ctx, itemContent) {
    let originalState = state.get(ctx.chat.id);
    state.set(ctx.chat.id, { ...originalState, ...itemContent });
}

function atualizarPedidoAtual(state, ctx, itemContent) {
    let originalState = state.get(ctx.chat.id);
    state.set(ctx.chat.id, { ...originalState, ...itemContent });
}

function adicionarPedidoTotal(state, ctx, itemToAdd) {
    let originalState = state.get(ctx.chat.id);
    originalState.push(itemToAdd);
    console.log(originalState);

    state.set(ctx.chat.id, originalState);
}

function verificarEtapa(ctx, etapaParaVerificar, utils) {
    if (utils.etapaAtual.get(ctx.chat.id) === etapaParaVerificar) return false;
    else return true;
}

function imprimirPedidoTotal(ctx, utils) {
    let pedidoTotal = utils.pedidoTotal.get(ctx.chat.id);
    let pedidoAtual = utils.pedidoAtual.get(ctx.chat.id);

    let pedidoTotalText = "";

    let i = 0;

    if (
        pedidoTotal.length > 0 ||
        utils.pedidoAtual.get(ctx.chat.id).quantidade
    ) {
        pedidoTotalText = "Pedido total:\n";
        i = 0;
    }

    if (pedidoTotal) {
        for (let item in pedidoTotal) {
            pedidoTotalText += `${i + 1} • ${pedidoTotal[item].item} (Qtd: ${
                pedidoTotal[item].quantidade
            })\n`;
            i++;
        }
    }

    if (utils.pedidoAtual.get(ctx.chat.id).quantidade) {
        pedidoTotalText += `${i + 1} • ${pedidoAtual.item} (Qtd: ${
            pedidoAtual.quantidade
        })\n`;
    }

    if (
        pedidoTotal.length > 0 ||
        utils.pedidoAtual.get(ctx.chat.id).quantidade
    ) {
        pedidoTotalText += "/limparPedido\n";
        i = 0;
    }

    return pedidoTotalText;
}

/**
 *
 * @param {object}  ctx
 * @param {string}  message
 * @param {[object[]]}  buttons
 */
function telegramReply(ctx, message, buttons) {
    let buttonsArray = [];

    if (buttons) {
        buttons.forEach((row) => {
            buttonsArray.push([Markup.button.callback(row.value, row.action)]);
        });
    }

    ctx.reply(message, Markup.inlineKeyboard(buttonsArray));
}

/**
 *
 * @param {object}  ctx
 * @param {string}  message
 * @param {[object[]]}  buttons
 */
function telegramEditMessage(ctx, message, buttons) {
    let buttonsArray = [];

    if (buttons) {
        buttons.forEach((row) => {
            buttonsArray.push([Markup.button.callback(row.value, row.action)]);
        });
    }

    ctx.editMessageText(message, Markup.inlineKeyboard(buttonsArray));
}

export default {
    pedidoAtual,
    pedidoTotal,
    userInfo,
    statusList,
    etapaAtual,
    userAction,
    verificarEtapa,
    atualizarState,
    atualizarPedidoAtual,
    adicionarPedidoTotal,
    imprimirPedidoTotal,
    telegramReply,
    telegramEditMessage,
};

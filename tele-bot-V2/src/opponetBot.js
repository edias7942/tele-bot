import startCommand from "./commands/start.js";
import listarRoteadoresCommand from "./commands/listarRoteadores.js"
import inicioCommand from "./commands/inicio.js"
import addRoteadorCommand from "./commands/addRoteador.js"
import listarQuantidadeRoteadoresCommand from "./commands/listarQuantidadeRoteadores.js"
import finalizarPedidoCommand from "./commands/finalizarPedido.js"

import utils from "./services/utils.js";

import { Telegraf } from "telegraf";


// Substitua pelo token do seu bot
const bot = new Telegraf("7510688663:AAFSb1YNQH_cyTvCQquFpR3bd-WyDIC43TQ");

function imprimirPedidoTotal(pedidoTotal) {
    let pedidoObj = pedidoTotal.get(ctx.chat.id);
    console.log(pedidoObj);
}

// Comando /start com teclado inline fixo
bot.start(startCommand);

bot.action("Inicio", inicioCommand);

// Ação ao clicar na "Opção 1"
bot.action("listarRoteadores", listarRoteadoresCommand);

// Ação para adicionar um roteador
bot.action(/AddRoteador_(.+)/, addRoteadorCommand);

// Ação para adicionar um roteador
bot.action(/QuantidadeRoteador_(.+)/, listarQuantidadeRoteadoresCommand);

bot.action("finalizarPedido", finalizarPedidoCommand);

// Inicia o bot
bot.launch();

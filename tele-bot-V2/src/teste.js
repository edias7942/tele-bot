import addTokenCommand from "./commands/admin/addToken.js";
import clearOrderCommand from "./commands/clearOrder.js";
import finalizeOrderCommand from "./commands/finalizeOrder.js";
import getItemQuantityCommand from "./commands/getItemQuantity.js";
import inicioCommand from "./commands/inicio.js";
import listarEquipamentos from "./listarEquipamentos.js";
import listEquipmentsCategoriesCommand from "./commands/listEquipmentsCategories.js";
import listEquipmentsItemsCommand from "./commands/listEquipmentsItems.js";
import startCommand from "./commands/start.js";

import textMiddlewareCommand from "./middlewares/textMiddleware.js";

import tokenCommand from "./commands/authentication/token.js";

import utils from "./services/utils.js";

import { Telegraf, Markup } from "telegraf";

// Substitua pelo token do seu bot
export const bot = new Telegraf("7510688663:AAFSb1YNQH_cyTvCQquFpR3bd-WyDIC43TQ");

bot.use((ctx, next) => {
    setTimeout(() => {}, 3000);

    let pedidoTotal = utils.pedidoTotal.get(ctx.chat.id);
    let pedidoAtual = utils.pedidoAtual.get(ctx.chat.id);

    if (pedidoTotal === undefined) utils.pedidoTotal.set(ctx.chat.id, []);
    if (pedidoAtual === undefined) utils.pedidoAtual.set(ctx.chat.id, {});

    next();
});

bot.on("text", textMiddlewareCommand);

// Comando /start com teclado inline fixo
bot.start(startCommand);

bot.action("inicio", inicioCommand);

bot.action("listEquipmentsCategories", listEquipmentsCategoriesCommand);

bot.action(/listEquipmentsItems_(.+)/, listEquipmentsItemsCommand);

bot.action(/getItemQuantity_(.+)/, getItemQuantityCommand);

bot.action("clearOrder", clearOrderCommand);

bot.action("finalizeOrder", finalizeOrderCommand);

bot.command("token", tokenCommand);

bot.action("addToken", addTokenCommand);

bot.command("limparPedido", clearOrderCommand);

bot.command("teste", (ctx) => {
    console.log(ctx)
})

// Inicia o bot
bot.launch();

bot.command("Equipamentos", listarEquipamentos);

bot.command("addTec", (ctx) => {});

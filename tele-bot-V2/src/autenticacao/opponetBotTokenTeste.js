import { Telegraf, Markup } from "telegraf";
import gerarToken from "./gerarToken.js";

let usuariosAutorizados = [];

let usuariosAdministradores = [1037293989];

let tokens = {
    2431: { status: "Ativa" },
    8865: { status: "Ativa" },
};

// Substitua pelo token do seu bot
const bot = new Telegraf("7510688663:AAFSb1YNQH_cyTvCQquFpR3bd-WyDIC43TQ");

bot.command("token", (ctx) => {
    let userToken = ctx.payload.trim();
    let userId = ctx.chat.id;
    console.log(ctx.chat.id);

    if (userId in tokens) console.log("Usuário Válido");
    else console.log("Usuário Inválido");

    if (userToken in tokens) {
        userId = userId.toString();

        if (tokens[userToken].status == "Liberada") {
            tokens[userToken].userId = userId;
            tokens[userToken].status = "Ativa";
            usuariosAutorizados.push(userId);
            return ctx.reply("Token Válido!");
        } else if (tokens[userToken].status == "Ativa") {
            return ctx.reply("Este Token já foi usado.");
        }
    } else return ctx.reply("Token Inválido!");
});

bot.command("addToken", (ctx) => {
    let newToken = gerarToken();
    let userId = ctx.chat.id;

    if (usuariosAdministradores.includes(userId)) {
        if (newToken in tokens)
            return ctx.reply(`O token '${newToken}' já existe.`);
        else {
            tokens[newToken] = {status: "Liberada"}
            return ctx.reply(`O token '${newToken}' foi adicionado.`)
        }
    } else {
        console.log("usuário não é administrador")
    }
});

bot.command("show", (ctx) => {
    console.log("Usuários Autorizados:");
    console.log(usuariosAutorizados);

    console.log("Tokens:");
    console.log(tokens);
});

// Comando /start com teclado inline fixo
bot.start((ctx) => {
    let userId = ctx.chat.id;
    userId = userId.toString();

    console.log(ctx.chat.id);

    if (usuariosAutorizados.includes(userId)) {
        ctx.reply(
            "Seja bem-vindo ao Opponet Bot!\nEscolha uma opção:",
            Markup.inlineKeyboard([
                [Markup.button.callback("Roteadores", "listarRoteadores")],
                [Markup.button.callback("Saldo de Equipamentos", "a")],
                [Markup.button.callback("Outros", "Outros")],
            ])
        );
        return ctx.reply(`Usuário Autorizado!`);
    } else {
        return ctx.reply("Usuário Não Autorizado");
    }
});

// Inicia o bot
bot.launch();

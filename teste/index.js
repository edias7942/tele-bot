import { Telegraf, Markup } from "telegraf";

// Substitua pelo token do seu bot
const bot = new Telegraf("7510688663:AAFSb1YNQH_cyTvCQquFpR3bd-WyDIC43TQ");

bot.use((ctx, next) => {
    next();
});

bot.start(async (ctx) => {

    console.log(ctx.update.message.chat)

    let buttons = Markup.inlineKeyboard([
        Markup.button.callback("Value", "Action"),
    ]);

    let telegramReply = await ctx.reply("Testando...", buttons);

    telegramReply.canDelete = false
    
    console.log(telegramReply)

    const replyGroupMessage = `
Telegram ID: ${ctx.chat.id}
Mensagem: ${ctx.command}
`
    
    bot.telegram.sendMessage(-1002455546170, replyGroupMessage)

    // console.log(telegramReply);
});

bot.action("Action", (ctx) => {
    console.log("RESPOSTA DE MENSAGEM");
    
    console.log(ctx.update.callback_query.message)
})

bot.command("image", (ctx) => {
    // ctx.replyWithPhoto({source: './image.png'})
    
    bot.telegram.sendMessage(-1002455546170, "testando")
});

// Inicia o bot
bot.launch();
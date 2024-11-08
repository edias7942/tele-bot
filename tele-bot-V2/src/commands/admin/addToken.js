import tokens from "../../database/tokens.js";
import utils from "../../services/utils.js";

export default async (ctx) => {
    utils.etapaAtual.set(ctx.chat.id, "Adicionando_Token");
    let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
    let consoleMessage

    try {
        const token = await tokens.addToken(); // Chama a função e aguarda seu resultado
        
        let responseText = `
Token Criado ✅🔐
            
Peça para que o novo usuário envie mensagem e siga as instruções para utilização do Token.

Token Gerado: ${token}
    `;

        let buttons = [{ value: "🏠 Menu Inicial", action: "inicio" }];

        consoleMessage = `Criou o Token '${token}'. (Etapa: ${etapaAtual})`
        utils.userAction("success", ctx, consoleMessage)

        utils.telegramEditMessage(ctx, responseText, buttons);
    } catch (error) {
        consoleMessage = `Falha ao Criar o Token. (Etapa: ${etapaAtual})`
        console.error(error);
    }
}
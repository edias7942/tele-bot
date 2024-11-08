import utils from "./../services/utils.js";
import technicians from "../database/technicians.js";
import inicioCommand from "../commands/inicio.js";

export default async (ctx) => {
    
    // Verificação se o usuário clicou duas vezes no Botão.
    // let stepVerification = utils.verificarEtapa(ctx, "Inicio", utils);

    // if (!stepVerification) {
    //     let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
    //     let userActionMessage = `Botão clicado duas vezes. (Etapa: ${etapaAtual})`;

    //     return utils.userAction("warning", ctx, userActionMessage);
    // }

    utils.etapaAtual.set(ctx.chat.id, 'Start')

    // Coletar informações do Usuário
    let userInfo = await technicians.getUserPermission(ctx.chat.id);

    // Usuário Não existe.
    if (!userInfo.status) {
        utils.userAction("error", ctx, `${userInfo.response}`);

        // Resposta que será exibida para o Usuário.
        let responseText = `
Usuário não Cadastrado ❌
 
• Caso tenha um Token:
Suponhamos que seu token seja 123456, envie a seguinte mensagem:

/token 123456

• Caso não tenha um Token:
Entre em contato com um administrador e peça que ele gere um token para você.
        `;

        // Enviando Mensagem para o Usuário.
        return utils.telegramReply(ctx, responseText);
    }

    let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
    let userActionMessage = `Iniciou um Chat. (Etapa: ${etapaAtual})`;

    utils.userAction("default", ctx, userActionMessage);

    inicioCommand(ctx);
};

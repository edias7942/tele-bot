import utils from "../../services/utils.js";
import tokens from "../../database/tokens.js";
import technicians from "../../database/technicians.js";

export default async (ctx) => {
    utils.etapaAtual.set(ctx.chat.id, "Autenticação Token");

    let response = await technicians.getUserPermission(ctx.chat.id);

    if (response.status) {
        let userLevel;

        switch (response.authorization_level) {
            case 0:
                userLevel = "Bloqueado";
                break;

            case 1:
                userLevel = "Técnico";
                break;

            case 2:
                userLevel = "Almoxerifado";
                break;

            case 3:
                userLevel = "Administrador";
                break;

            default:
                break;
        }

        const userActiveMessage = `
Você não pode usar o Comando /token, visto que você já é um usuário Cadastrado:

ID: ${response.userInfo.technician_id}
Nome: ${response.userInfo.name}
Telegram ID: ${response.userInfo.telegram_id}
Autorização: ${userLevel} (${response.userInfo.authorization_level})
        `;
        const buttons = [{ value: "Menu Inicial", action: "inicio" }];

        return utils.telegramReply(ctx, userActiveMessage, buttons);
    }

    const userToken = ctx.payload.trim();
    const { status } = await tokens.authToken(userToken);

    const validTokenMessage = `
Token Válido ✅🔐

Agora envie seu nome para Cadastro:
    `;

    const invalidTokenMessage = `
Token Inválido 🔐❌

Confira se o Token está correto e tente novamente.

Caso esteja com problemas para autenticação, entre em contato com um Administrador.
    `;

    let etapaAtual = utils.etapaAtual.get(ctx.chat.id);

    if (status) {
        utils.etapaAtual.set(ctx.chat.id, "Awaiting_Token_Name");

        let consoleMessage = `Token '${userToken}' Válido, aguardando Nome... (Etapa: ${etapaAtual})`
        utils.userAction("success", ctx, consoleMessage)
        
        utils.telegramReply(ctx, validTokenMessage);
    } else {
        let consoleMessage = `Token '${userToken}' Inválido. (Etapa: ${etapaAtual})`;

        utils.userAction("error", ctx, consoleMessage);
        utils.telegramReply(ctx, invalidTokenMessage);
    }
};

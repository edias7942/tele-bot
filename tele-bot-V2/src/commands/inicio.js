import utils from "./../services/utils.js";
import technicians from "../database/technicians.js";

export default async (ctx) => {
    // Verificação se o usuário clicou duas vezes no Botão.
    if (!utils.verificarEtapa(ctx, "Inicio", utils)) {
        let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
        let userActionMessage = `Botão clicado duas vezes. (Etapa: ${etapaAtual})`;

        return utils.userAction("warning", ctx, userActionMessage);
    }

    // Imprimir Mensagem no LOG
    let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
    let userActionMessage = `Foi para o Menu Inicial. (Etapa: ${etapaAtual})`;
    utils.userAction("default", ctx, userActionMessage);

    // Coletar informações do Usuário
    let userInfo = await technicians.getUserPermission(ctx.chat.id);

    // Resposta que será exibida para o Usuário.
    let responseText = `
🏠 Menu Inicial
`;

    utils.etapaAtual.set(ctx.chat.id, "Inicio");

    // Acesso de Administrador (3)
    if (userInfo.userInfo.authorization_level == 3) {
        // Botões que serão enviados para o Usuário.
        let buttons = [
            { value: "🔑  Gerar Token de Acesso", action: "addToken" },
            { value: "👤  Gerenciar Usuários", action: "a" },
            { value: "⚙️  Configurações", action: "outros" },
        ];

        // Enviando Mensagem para o Usuário.
        if (etapaAtual === "Start" || etapaAtual === "Authentication") {
            return utils.telegramReply(ctx, responseText, buttons);
        } else {
            return utils.telegramEditMessage(ctx, responseText, buttons);
        }
    }

    // Acesso de Almoxerifado (2)
    else if (userInfo.authorization_level == 2) {
    }

    // Acesso de Técnico (1)
    else if (userInfo.authorization_level == 1) {
        // Botões que serão enviados para o Usuário.
        let buttons = [
            { value: "📦  Fazer Pedido", action: "listEquipmentsCategories" },
            { value: "🚚  Meus Pedidos", action: "myOrders" },
            { value: "🗄️  Meu Inventário", action: "myStock" },
        ];

        if (etapaAtual === "Start" || etapaAtual === "Authentication") {
            return utils.telegramReply(ctx, responseText, buttons);
        } else {
            return utils.telegramEditMessage(ctx, responseText, buttons);
        }
    }
};

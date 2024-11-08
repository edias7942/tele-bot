import utils from "../services/utils.js";
import technicians from "../database/technicians.js";
import startCommand from "./../commands/start.js";

export default async (ctx, next) => {
    //

    let etapaAtual = utils.etapaAtual.get(ctx.chat.id);
    let userInfo = await technicians.getUserPermission(ctx.chat.id);

    // Realizar Bloqueio por Nível de Autorização
    if (userInfo.authorization_level <= -1) {
        const blockMessage =
            "Estamos passando por atualizações e no momento o sistema está bloqueado para seu nível de acesso, para mais informações entre em contato com um administrador.";

        return utils.telegramReply(ctx, blockMessage);
    }

    if (etapaAtual === "Awaiting_Token_Name") {
        const userName = ctx.message.text.trim();

        let addTechnicianResponse = await technicians.addTechnician(
            userName,
            ctx.chat.id,
            1
        );

        if (addTechnicianResponse.status) {
            utils.etapaAtual.set(ctx.chat.id, "Authentication");
            utils.telegramReply(ctx, "Usuário cadastrado com sucesso!✅");
            startCommand(ctx);
        }
    }

    // If user is inserting a Item Quantity
    if (etapaAtual === "Awaiting_Item_Quantity") {
        // Receiving user message
        let itemQuantity = ctx.message.text.trim();

        // If user want cancel order
        if (itemQuantity === "/cancelar") {
            const userActionMessage = `Cancelando Pedido...`;
            utils.userAction("error", ctx, userActionMessage);

            utils.pedidoAtual.set(ctx.chat.id, {});

            return startCommand(ctx);
        }

        const etapaAtual = utils.etapaAtual.get(ctx.chat.id);
        const pedidoTotalText = utils.pedidoTotal.get(ctx.chat.id);

        const invalidQuantityMessage = `
Quantidade Inválida ❌

A Quantidade deve conter somente números inteiros.
Para cancelar o pedido, clique aqui: /cancelar

Por gentileza, envie a Quantidade Novamente:
            `;

        // The Quantity IS a Number
        if (!isNaN(itemQuantity)) {
            itemQuantity = parseInt(itemQuantity);

            utils.atualizarState(utils.pedidoAtual, ctx, {
                quantidade: itemQuantity,
            });

            let pedidoAtual = utils.pedidoAtual.get(ctx.chat.id);

            const validQuantityMessage = `
Item adicionado ✅
${pedidoAtual.item} (Qtd: ${pedidoAtual.quantidade})

Deseja Adicionar um novo Item?
                    `;

            let buttons = [
                {
                    value: "➕ Adicionar Item",
                    action: "listEquipmentsCategories",
                },
                {
                    value: "🔚 Finalizar Pedido",
                    action: "finalizeOrder",
                },
            ];

            // Adding pedidoAtual to pedidoTotal
            utils.adicionarPedidoTotal(utils.pedidoTotal, ctx, pedidoAtual);

            // Cleaning the pedidoAtual State
            utils.pedidoAtual.set(ctx.chat.id, {});

            const telegramReply = `Item Adicionado com Sucesso ➕✅\n ${pedidoTotalText}`;
            utils.telegramReply(ctx, validQuantityMessage, buttons);
        } else {
            utils.telegramReply(ctx, invalidQuantityMessage);

            const userActionMessage = `Quantidade '${itemQuantity}' Inválida!`;
            return utils.userAction("error", ctx, userActionMessage);
        }
    }

    next();
};

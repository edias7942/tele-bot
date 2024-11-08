import utils from "./../services/utils.js";

export default (ctx) => {
    console.log(utils.pedidoTotal.get(ctx.chat.id));

    let pedidoFinal = utils.pedidoTotal.get(ctx.chat.id)

    let pedidoFinalText = ""
    
    let i = 1
    
    for (let item of pedidoFinal) {
        pedidoFinalText += `${i} - ${item.item} (Qtd: ${item.quantidade}).\n`
        i++
    }

    ctx.editMessageText(
        `Pedido Realizado com Sucesso ✅\n\nPedido:\n\n${pedidoFinalText}\nPara realizar um novo pedido, digite /start`
    )
}
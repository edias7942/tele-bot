import startCommand from './start.js'

import utils from "../services/utils.js"

export default async (ctx) => {

    utils.pedidoAtual.set(ctx.chat.id, {})
    utils.pedidoTotal.set(ctx.chat.id, [])

    startCommand(ctx)
    
}
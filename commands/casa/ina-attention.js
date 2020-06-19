const ha = require('../../lib/home-assistant')

module.exports = (ctx) => {
  ha.post('services/rest_command/node_red_action', {
    action: 'ina_attention',
  }).catch(console.error)
  if (ctx.message) {
    return ctx.reply('Requesting attention...')
  }
  return ctx.answerCbQuery('Requesting attention...')
}

const m = require('telegraf/markup')
const ha = require('../../lib/home-assistant')

module.exports = async (ctx) => {
  ha.post('services/rest_command/node_red_action', {
    action: 'toggle_ac',
  }).catch(console.error)
  return ctx.reply('Toggling AC')
}

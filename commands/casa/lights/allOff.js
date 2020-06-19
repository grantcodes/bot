const ha = require('../../../lib/home-assistant')

module.exports = (ctx) => {
  ha.post('services/light/turn_off').catch(console.error)
  ha.post('services/switch/turn_off', {
    entity_id: 'switch.livingroom_lights',
  }).catch(console.error)
  if (ctx.message) {
    return ctx.reply('Turning off the lights')
  }
  return ctx.answerCbQuery('Turning off the lights')
}

const m = require('telegraf/markup')
const ha = require('../../../lib/home-assistant')

module.exports = async (ctx) => {
  // Handle specific switch control
  if (
    ctx.update &&
    ctx.update.callback_query &&
    ctx.update.callback_query.data &&
    ctx.update.callback_query.data.startsWith('casa_switches:')
  ) {
    const entity = ctx.update.callback_query.data.replace('casa_switches:', '')
    const { data } = await ha.post(`services/switch/toggle`, {
      entity_id: entity,
    })
    return ctx.answerCbQuery('Toggling switch')
  }

  const { data: states } = await ha.get('/states')
  // console.log(states.filter(s => s.entity_id.startsWith('switches.')))

  const switches = states
    .filter((s) => s.entity_id.startsWith('switch.'))
    .map((l) => ({
      id: l.entity_id,
      state: l.state,
      name: l.attributes.friendly_name,
    }))

  return ctx.reply(
    'switches.casa.grant.codes',
    m
      .inlineKeyboard(
        [
          // m.callbackButton("All Off", "casa_switches_allOff"),
          ...switches.map((s) =>
            m.callbackButton(`${s.name} (${s.state})`, `casa_switches:${s.id}`)
          ),
        ],
        { columns: 2 }
      )
      .removeKeyboard()
      .resize()
      .oneTime()
      .extra()
  )
}

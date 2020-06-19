const m = require('telegraf/markup')
const ha = require('../../../lib/home-assistant')

module.exports = async (ctx) => {
  // Handle specific light control
  if (
    ctx.update &&
    ctx.update.callback_query &&
    ctx.update.callback_query.data &&
    ctx.update.callback_query.data.startsWith('casa_lights:')
  ) {
    const entity = ctx.update.callback_query.data.replace('casa_lights:', '')
    const { data } = await ha.post(`services/light/toggle`, {
      entity_id: entity,
    })
    return ctx.answerCbQuery('Toggling light')
  }

  const { data: states } = await ha.get('/states')
  // console.log(states.filter(s => s.entity_id.startsWith('light.')))

  const lights = states
    .filter((s) => s.entity_id.startsWith('light.'))
    .map((l) => ({
      id: l.entity_id,
      state: l.state,
      name: l.attributes.friendly_name,
    }))

  return ctx.reply(
    'lights.casa.grant.codes',
    m
      .inlineKeyboard(
        [
          m.callbackButton('All Off', 'casa_lights_allOff'),
          ...lights.map((l) =>
            m.callbackButton(`${l.name} (${l.state})`, `casa_lights:${l.id}`)
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

const m = require('telegraf/markup')

module.exports = async (ctx) =>
  ctx.reply(
    'casa.grant.codes',
    m
      .inlineKeyboard(
        [
          m.callbackButton('Lights', 'casa_lights'),
          m.callbackButton('Ac', 'casa_ac'),
          m.callbackButton('Talk', 'casa_talk'),
          m.callbackButton('Switches', 'casa_switches'),
          // m.callbackButton("Scenes", "casa_scenes"),
          m.callbackButton('Ina Needs Attention', 'ina_attention'),
        ],
        { columns: 2 }
      )
      .removeKeyboard()
      .resize()
      .oneTime()
      .extra()
  )

const m = require('telegraf/markup')
const ha = require('../../lib/home-assistant')

module.exports = async (ctx) => {
  // Handle specific light control
  // if (
  //   ctx.update &&
  //   ctx.update.callback_query &&
  //   ctx.update.callback_query.data &&
  //   ctx.update.callback_query.data.startsWith("casa_say:")
  // ) {
  //   const message = ctx.update.callback_query.data.replace("casa_lights:", "");
  //   const { data } = await ha.post(`services/light/toggle`, {
  //     message    });
  //   return ctx.answerCbQuery("Toggling light");
  // }
  console.log(ctx.message)
  const text = ctx.message.text.replace('/say ', '')

  if (text) {
    ha.post('services/tts/microsoft_say', {
      message: text,
      entity_id:
        'media_player.google_home_office,media_player.google_home_livingroom,media_player.google_home_bedroom',
    }).catch(console.error)
    return ctx.reply(`Saying "${text}"`)
  }

  return ctx.reply('You need to write your message after the /say command')
}

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Register session middleware
bot.use(session())

// Make the bot only work for me.
bot.use((ctx, next) => {
  if (
    ctx.chat.username !== process.env.PERSONAL_USERNAME &&
    !(ctx.chat.type === 'group' && ctx.chat.id == process.env.GROUP_ID)
  ) {
    console.warn('[Outsider access attempt]', ctx.chat)
    return ctx.reply(
      `Go away. I only talk to my master @${process.env.PERSONAL_USERNAME}`
    )
  } else {
    // console.log(ctx)
    return next(ctx)
  }
})

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.command('lol', (ctx) => ctx.reply('Time for lulz'))
bot.command('casa', require('./commands/casa'))
bot.action('casa_lights', require('./commands/casa/lights'))
bot.command('casa_lights', require('./commands/casa/lights'))
bot.action(/casa_lights:(.+)/i, require('./commands/casa/lights'))
bot.action('casa_lights_allOff', require('./commands/casa/lights/allOff'))
bot.command('casa_lights_allOff', require('./commands/casa/lights/allOff'))
bot.action('casa_switches', require('./commands/casa/switches'))
bot.command('casa_switches', require('./commands/casa/switches'))
bot.action(/casa_switches:(.+)/i, require('./commands/casa/switches'))
bot.command('casa_ac', require('./commands/casa/ac'))
bot.action('casa_ac', require('./commands/casa/ac'))
bot.command('attention', require('./commands/casa/ina-attention'))
bot.action('ina_attention', require('./commands/casa/ina-attention'))
bot.command('say', require('./commands/casa/say'))

bot.on('sticker', require('./commands/casa/ina-attention'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

// bot.startPolling()

bot.use((ctx, next) => {
  console.warn('[Unrecognised command]', ctx)
  ctx.reply(`Hmmm I don't understand`)
})

bot.launch()

console.log('Started')

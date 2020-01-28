const Discord = require('discord.js')
const Enmap = require('enmap')
const fs = require('fs')

const client = new Discord.Client()
const config = require('./config.json')
const queue = []
client.queue = queue
client.config = config
client.date = getDateTime

function getDateTime () {
  var date = new Date()
  var hour = date.getHours()
  hour = (hour < 10 ? '0' : '') + hour
  var min = date.getMinutes()
  min = (min < 10 ? '0' : '') + min
  var sec = date.getSeconds()
  sec = (sec < 10 ? '0' : '') + sec
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  month = (month < 10 ? '0' : '') + month
  var day = date.getDate()
  day = (day < 10 ? '0' : '') + day
  return hour + ':' + min + ':' + sec + ' ' + day + '.' + month + '.' + year
}

process.on('SIGINT', () => {
  console.log('Bye!')
  process.exit(0)
})

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, event.bind(null, client))
  })
})

client.commands = new Enmap()

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    const props = require(`./commands/${file}`)
    const commandName = file.split('.')[0]
    console.log(`Attempting to load command ${commandName}`)
    client.commands.set(commandName, props)
  })
})

const y = process.openStdin()
y.addListener('data', res => {
  let x = res.toString().trim().split(/ +/g)
  if (x[0] === 'send') {
    if (x[1] === 'harem') {
      x = x.splice(2)
      // client.channels.get('570575169702330380').send(x.join(' '))
    }
  } else if (x[0] === 'cmd') {
    const cmd = client.commands.get(x[1])
    if (!cmd) return
    if (x[1] === 'speak') {
      if (x[2] === 'harem') x[2] = '570575169702330378'
      else x[2] = '533394970212827156'
    }
    x = x.splice(2)
    cmd.run(client, 'cmd', x)
  }
})

client.login(config.token)

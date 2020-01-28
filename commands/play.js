exports.run = (client, message, args) => {
  const fs = require('fs')
  if (!args[0]) {
    message.channel.send('Musisz mi podać nazwę sampla!')
    return
  }
  if (args[0] === 'help') {
    let help = 'Czerwoni Jeźdźcy soundboard v1.2\nDostępne sample to: ```'
    const sample = fs.readdirSync('./audio/')
    for (let i = 0; i < sample.length; i++) {
      help += sample[i].slice(0, -4) + ' \n'
    }
    help += '```'
    message.channel.send(help)
    return
  }
  if (message.mentions.members.first()) {
    if (message.member.roles.has(client.config.adminID) || message.author.id === '110170771728396288') {
      var voiceChannel = message.mentions.members.first().voice.channel
    } else {
      message.channel.send('Nie masz wystarczająych uprawnień!')
      return
    }
  } else if (!message.member.voice.channel) {
    message.channel.send('Nie jesteś na kanale głosowym!')
    return
  } else { voiceChannel = message.member.voice.channel }

  var isReady = true
  var name
  var isPresent = false
  const sampel = args[0].toLowerCase()

  function check (file) {
    const plik = file.slice(0, -4)
    if (sampel === plik) {
      isPresent = true
    }
  }
  var files = fs.readdirSync('./audio/')
  files.forEach(check)
  if (!isPresent) {
    message.channel.send(args[0] + '? Nie ma takiego sampla! Następnym razem zerknij na ich listę używając /play help')
    return
  } else {
    name = `./audio/${sampel}.mp3`
  }

  if (isReady) {
    isReady = false
    voiceChannel.join().then(connection => {
      var dispatcher = null
      dispatcher = connection.play(name)
      dispatcher.on('end', end => {
        voiceChannel.leave()
      })
    }).catch(err => console.log(err))
    isReady = true
  }
}

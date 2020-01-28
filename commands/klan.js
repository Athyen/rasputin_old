exports.run = (client, message, args) => {
  const request = require('request')

  let czlonkowie = message.guild.roles.get('533701337964085289').members.map(m => m.user.username).concat(message.guild.roles.get('533702723640492072').members.map(m => m.user.username), message.guild.roles.get('535537732357980171').members.map(m => m.user.username))
  let nicki = message.guild.roles.get('533701337964085289').members.map(m => m.nickname).concat(message.guild.roles.get('533702723640492072').members.map(m => m.nickname), message.guild.roles.get('535537732357980171').members.map(m => m.nickname))

  for (let i in nicki) {
    if (nicki[i]) { czlonkowie[i] = nicki[i] }
  }

  request({ uri: 'https://www.bungie.net/en/ClanV2?groupId=3698799' },
    function (error, response, body) {
      let msg = ''
      let msg2 = '\n\nBrakujące z Discorda:\n'
      let status = ''
      let re = /card-title">\r\n[A-Z0-9]+/gi
      let users = body.match(re).sort(function (a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()) })
      for (let i in users) {
        users[i] = users[i].slice(12).replace(/(\r\n|\n|\r)/gm, '')
        for (let j in czlonkowie) { if (users[i] === czlonkowie[j]) { status = '✅' } }
        if (status.length < 1) {
          status = '❌'
        }
        msg += users[i] + ' ' + status + '\n'
        status = ''
      }

      status = ''
      for (let i in czlonkowie) {
        for (let j in users) {
          if (czlonkowie[i] === users[j]) {
            status = 'ok'
            break
          }
        }
        if (status !== 'ok') { msg2 += czlonkowie[i] + ' ❌\n' }
        status = ''
      }
      if (msg2.length > 24) { msg += msg2 }
      message.channel.send(msg)
      if (error) { console.log(error) }
    })
}

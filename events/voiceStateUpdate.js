module.exports = (client, oldMember, newMember) => {
  require('dotenv').config()
  const textToSpeech = require('@google-cloud/text-to-speech')
  const streamifier = require('streamifier')
  const clienttts = new textToSpeech.TextToSpeechClient()

  function leaveVoiceChannel (dispatcher, voiceChannel) {
    return new Promise((resolve, reject) => {
      dispatcher.on('end', end => {
        resolve(voiceChannel.leave())
      })
    })
  }

  async function play () {
    for (let i = 0; i < client.queue.length; i++) {
      // console.log(client.queue[i])
      const voiceChannel = client.guilds.get(client.queue[i].guild).channels.get(client.queue[i].channel)

      const request = {
        input: { text: client.queue[i].text },
        voice: {
          languageCode: 'pl-PL',
          name: 'pl-PL-Wavenet-A'
        },
        audioConfig: { audioEncoding: 'MP3' }
      }

      const [response] = await clienttts.synthesizeSpeech(request)
      const stm = new streamifier.createReadStream(response.audioContent)
      const connection = await voiceChannel.join()
      const dispatcher = connection.play(stm)
      await leaveVoiceChannel(dispatcher, voiceChannel)
    }
    client.queue = []
  }

  if (newMember.id !== client.user.id) {
    let tekst = null
    switch (newMember.id) {
      case '140512886291169281':
        tekst = 'śledczy'
        break
      case '218620072304967680':
        tekst = 'Wulkanbe'
        break
      case '429693422798897153':
        tekst = 'lolajt'
        break
      case '221555959728832514':
        tekst = 'narrator'
        break
      case '373948993648066560':
        tekst = 'cerb 28'
        break
      case '514106741043101708':
        tekst = 'hipcio v2'
        break
      default:
        tekst = newMember.guild.members.get(newMember.id).nickname === null || newMember.guild.members.get(newMember.id).nickname === undefined ? newMember.guild.members.get(newMember.id).user.username : newMember.guild.members.get(newMember.id).nickname
    }
    if (newMember.channelID !== null && !oldMember.channelID) {
      // play(tekst, newMember)
      if (client.queue.length !== 0) {
        client.queue.push({ text: tekst, guild: newMember.guild.id, channel: newMember.channelID, action: 'join' })
      } else {
        client.queue.push({ text: tekst, guild: newMember.guild.id, channel: newMember.channelID, action: 'join' })
        play()
      }
      // console.log(`${newMember.guild.members.get(newMember.id).nickname === null || newMember.guild.members.get(newMember.id).nickname === undefined ? newMember.guild.members.get(newMember.id).user.username : newMember.guild.members.get(newMember.id).nickname} wszedł na kanał ${client.guilds.get(newMember.guild.id).channels.get(newMember.channelID).name}`)
    } else
    if (newMember.channelID === null) {
      // play(tekst + 'wyszedł', oldMember)
      if (client.queue.length !== 0) {
        client.queue.push({ text: tekst + ' wyszedł', guild: oldMember.guild.id, channel: oldMember.channelID, action: 'leave' })
      } else {
        client.queue.push({ text: tekst + ' wyszedł', guild: oldMember.guild.id, channel: oldMember.channelID, action: 'leave' })
        play()
      }
      // console.log(`${newMember.guild.members.get(newMember.id).nickname === null || newMember.guild.members.get(newMember.id).nickname === undefined ? newMember.guild.members.get(newMember.id).user.username : newMember.guild.members.get(newMember.id).nickname} wyszedł z kanału ${client.guilds.get(oldMember.guild.id).channels.get(oldMember.channelID).name}`)
    } else
    if (newMember.channelID && oldMember.channelID && newMember.channelID !== oldMember.channelID) {
      // play(tekst, newMember)
      if (client.queue.length !== 0) {
        client.queue.push({ text: tekst + ' wyszedł', guild: oldMember.guild.id, channel: oldMember.channelID, action: 'leave' })
        client.queue.push({ text: tekst, guild: newMember.guild.id, channel: newMember.channelID, action: 'join' })
      } else {
        client.queue.push({ text: tekst + ' wyszedł', guild: oldMember.guild.id, channel: oldMember.channelID, action: 'leave' })
        client.queue.push({ text: tekst, guild: newMember.guild.id, channel: newMember.channelID, action: 'join' })
        play()
      }
      // console.log(`${newMember.guild.members.get(newMember.id).nickname === null || newMember.guild.members.get(newMember.id).nickname === undefined ? newMember.guild.members.get(newMember.id).user.username : newMember.guild.members.get(newMember.id).nickname} zmienił kanał z ${client.guilds.get(oldMember.guild.id).channels.get(oldMember.channelID).name} na ${client.guilds.get(newMember.guild.id).channels.get(newMember.channelID).name}`)
    }
  }
}

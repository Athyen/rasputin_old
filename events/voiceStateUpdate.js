module.exports = (client, oldMember, newMember) => {
  // console.log(oldMember)
  // if (oldMember.guild.id !== '533394970212827156') return
  // if (newMember.id !== client.user.id) console.log(newMember)
  async function play (tekst, member) {
    const voiceChannel = client.guilds.get(member.guild.id).channels.get(member.channelID)
    require('dotenv').config()
    const textToSpeech = require('@google-cloud/text-to-speech')
    const streamifier = require('streamifier')
    const clienttts = new textToSpeech.TextToSpeechClient()

    const request = {
      input: { text: tekst },
      voice: {
        languageCode: 'pl-PL',
        name: 'pl-PL-Wavenet-A'
      },
      audioConfig: { audioEncoding: 'MP3' }
    }

    const [response] = await clienttts.synthesizeSpeech(request)
    const stm = new streamifier.createReadStream(response.audioContent)
    voiceChannel.join().then(connection => {
      var dispatcher = null
      dispatcher = connection.play(stm)
      dispatcher.on('end', end => {
        voiceChannel.leave()
      })
    }).catch(err => console.log(err))
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
      play(tekst, newMember)
      // client.queue.push({ text: tekst, guild: newMember.guild.id, channel: newMember.channelID, action: 'join' })
      console.log(`${newMember.guild.members.get(newMember.id).nickname === null || newMember.guild.members.get(newMember.id).nickname === undefined ? newMember.guild.members.get(newMember.id).user.username : newMember.guild.members.get(newMember.id).nickname} wszedł na kanał ${client.guilds.get(newMember.guild.id).channels.get(newMember.channelID).name}`)
    } else
    if (newMember.channelID === null) {
      play(tekst + 'wyszedł', oldMember)
      // client.queue.push({ text: tekst + ' wyszedł', guild: oldMember.guild.id, channel: oldMember.channelID, action: 'leave' })
      console.log(`${newMember.guild.members.get(newMember.id).nickname === null || newMember.guild.members.get(newMember.id).nickname === undefined ? newMember.guild.members.get(newMember.id).user.username : newMember.guild.members.get(newMember.id).nickname} wyszedł z kanału ${client.guilds.get(oldMember.guild.id).channels.get(oldMember.channelID).name}`)
    } else
    if (newMember.channelID && oldMember.channelID && newMember.channelID !== oldMember.channelID) {
      play(tekst, newMember)
      // client.queue.push({ text: tekst + ' wyszedł', guild: oldMember.guild.id, channel: oldMember.channelID, action: 'leave' })
      // client.queue.push({ text: tekst, guild: newMember.guild.id, channel: newMember.channelID, action: 'join' })
      console.log(`${newMember.guild.members.get(newMember.id).nickname === null || newMember.guild.members.get(newMember.id).nickname === undefined ? newMember.guild.members.get(newMember.id).user.username : newMember.guild.members.get(newMember.id).nickname} zmienił kanał z ${client.guilds.get(oldMember.guild.id).channels.get(oldMember.channelID).name} na ${client.guilds.get(newMember.guild.id).channels.get(newMember.channelID).name}`)
    }
  }
}

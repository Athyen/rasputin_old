exports.run = async (client, message, args) => {
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
      console.log(client.queue[i])
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

  play()
}

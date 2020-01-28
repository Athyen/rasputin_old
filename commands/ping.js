exports.run = async (client, message, args) => {
  require('dotenv').config()
  const textToSpeech = require('@google-cloud/text-to-speech')
  const streamifier = require('streamifier')
  const clienttts = new textToSpeech.TextToSpeechClient()

  // function test (voiceChannel, stm) {
  //   return new Promise((resolve, reject) => {
  //     voiceChannel.join().then(connection => {
  //       var dispatcher = null
  //       dispatcher = connection.play(stm)
  //       dispatcher.on('end', end => {
  //         voiceChannel.leave()
  //         resolve('ok')
  //       })
  //     }).catch(err => console.log(err))
  //   })
  // }
  async function play () {
    for (let i = 0; i < client.queue.length; i++) {
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
      await voiceChannel.join().then(async (connection) => {
        const dispatcher = connection.play(stm)
        await dispatcher.on('end', end => {
          voiceChannel.leave()
        })
      })
    }
  }

  play()
}

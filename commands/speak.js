exports.run = async (client, message, args) => {
  let voiceChannel = null
  if (message === 'cmd') {
    voiceChannel = client.guilds.get(args[0]).members.get(args[1]).voice.channel
    args = args.splice(2)
  } else {
    if (!message.member.voice.channel) {
      message.channel.send('Nie jesteś na kanale głosowym!')
      return
    }
    voiceChannel = message.member.voice.channel
  }
  require('dotenv').config()
  const textToSpeech = require('@google-cloud/text-to-speech')
  const streamifier = require('streamifier')

  const clienttts = new textToSpeech.TextToSpeechClient()

  let text = ''

  // if (message.author.id === '373948993648066560') { text = 'Spadaj na drzewo, małpo' } else {
  for (let i = args[0] === 'eng' || args[0] === 'jp' || args[0] === 'ru' || args[0] === 'fr' || args[0] === 'de' ? 1 : 0; i < args.length; i++) {
    text += args[i] + ' '
  }
  // }
  const request = {
    input: { text: text },
    voice: {
      languageCode: args[0] === 'eng' ? 'en-US' : args[0] === 'jp' ? 'ja-JP' : args[0] === 'ru' ? 'ru-RU' : args[0] === 'fr' ? 'fr-FR' : args[0] === 'de' ? 'de-DE' : 'pl-PL',
      name: args[0] === 'eng' ? 'en-US-Wavenet-D' : args[0] === 'jp' ? 'ja-JP-Wavenet-A' : args[0] === 'ru' ? 'ru-RU-Wavenet-E' : args[0] === 'fr' ? 'fr-FR-Wavenet-A' : args[0] === 'de' ? 'de-DE-Wavenet-A' : 'pl-PL-Wavenet-A'
    },
    // audioConfig: { audioEncoding: 'MP3' }
    audioConfig: {
      audioEncoding: 'LINEAR16',
      pitch: 0,
      speakingRate: 1
    }
  }

  // let text = ''
  // if (args[0] === 'eng') {
  //   const request = {
  //     input: { text: text },
  //     voice: {
  //       languageCode: 'en-US',
  //       name: 'en-US-Wavenet-D'
  //     },
  //     audioConfig: { audioEncoding: 'MP3' }
  //   }

  //   for (let i = 1; i < args.length; i++) {
  //     text += args[i] + ' '
  //   }
  // } else {
  //   request = {
  //     input: { text: text },
  //     voice: {
  //       languageCode: 'pl-PL',
  //       name: 'pl-PL-Wavenet-A'
  //     },
  //     audioConfig: { audioEncoding: 'MP3' }
  //   }

  //   for (const i in args) {
  //     text += args[i] + ' '
  //   }
  // }
  // const request = {
  //   input: { text: text },
  //   voice: {
  //     languageCode: 'en-US',
  //     name: 'en-US-Wavenet-D'
  //   },
  //   audioConfig: { audioEncoding: 'MP3' }
  // }

  // for (let i = 1; i < args.length; i++) {
  //   text += args[i] + ' '
  // }

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

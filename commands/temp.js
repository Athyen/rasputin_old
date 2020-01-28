exports.run = async (client, message, args) => {
  if (!message.member.voice.channel) {
    message.channel.send('Nie jesteś na kanale głosowym!')
    return
  }
  require('dotenv').config()
  const textToSpeech = require('@google-cloud/text-to-speech')
  const streamifier = require('streamifier')
  // Imports the Google Cloud client library

  // Import other required libraries
  const voiceChannel = message.guild.channels.get('533585804094734337')
  // Creates a client
  const clienttts = new textToSpeech.TextToSpeechClient()

  // The text to synthesize
  const text = args[0]

  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML Voice Gender (optional)
    voice: {
      languageCode: 'pl-PL',
      name: 'pl-PL-Wavenet-A'
    },
    // Select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' }
  }

  // Performs the Text-to-Speech request
  const [response] = await clienttts.synthesizeSpeech(request)
  // Write the binary audio content to a local file
  const stm = new streamifier.createReadStream(response.audioContent)
  voiceChannel.join().then(connection => {
    var dispatcher = null
    dispatcher = connection.play(stm)
    dispatcher.on('end', end => {
      voiceChannel.leave()
    })
  }).catch(err => console.log(err))
  /* const googleSpeech = require('@google-cloud/speech')
  const googleSpeechClient = new googleSpeech.SpeechClient()

  const { Transform } = require('stream')

  function convertBufferTo1Channel (buffer) {
    const convertedBuffer = Buffer.alloc(buffer.length / 2)

    for (let i = 0; i < convertedBuffer.length / 2; i++) {
      const uint16 = buffer.readUInt16LE(i * 4)
      convertedBuffer.writeUInt16LE(uint16, i * 2)
    }

    return convertedBuffer
  }

  class ConvertTo1ChannelStream extends Transform {
    constructor (source, options) {
      super(options)
    }

    _transform (data, encoding, next) {
      next(null, convertBufferTo1Channel(data))
    }
  }

  const connection = await message.member.voice.channel.join()
  const receiver = connection.receiver

  connection.on('speaking', (user, speaking) => {
    if (!speaking) {
      return
    }
    connection.play('./audio/athyen.mp3')
    console.log(`I'm listening to ${user.username}`)

    // this creates a 16-bit signed PCM, stereo 48KHz stream
    const audioStream = receiver.createStream(user)
    const requestConfig = {
      encoding: 'LINEAR16',
      sampleRateHertz: 48000,
      languageCode: 'en-US'
    }
    const request = {
      config: requestConfig
    }
    const recognizeStream = googleSpeechClient
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', response => {
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n')
          .toLowerCase()
        console.log(`Transcription: ${transcription}`)
      })

    const convertTo1ChannelStream = new ConvertTo1ChannelStream()

    audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream)

    audioStream.on('end', async () => {
      console.log('audioStream end')
    })
    // connection.play(audioStream)
  }) */
}

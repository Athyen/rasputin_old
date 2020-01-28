exports.run = (client, message, args) => {
  function done () {
    message.channel.bulkDelete(1)
  }
  if (message.member.roles.has(client.config.adminID) || message.author.id === '110170771728396288') {
    let messagecount = parseInt(args[0])
    if (isNaN(messagecount)) {
      message.channel.send('Musisz podać mi liczbę wiadomości, którą chcesz usunąć!')
      return
    }
    messagecount++
    message.channel.bulkDelete(messagecount).catch((err) => {
      if (err.toString() === 'DiscordAPIError: You can only bulk delete messages that are under 14 days old.') {
        message.channel.send('Nie możesz usunąć wiadomości, które są starsze niż 14 dni!')
      }
    })
    message.channel.send(`No i posprzątane! Usunąłem ${args[0]} wiadomości!`)
    setTimeout(done, 5000)
  } else { message.channel.send('Nie masz wystarczających uprawnień, aby użyć tej komendy!') }
}

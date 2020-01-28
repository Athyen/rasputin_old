module.exports = (client) => {
  console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`)
  // console.log(client.guilds.map(guild => guild.name))
  client.user.setActivity('Destiny 2')
}

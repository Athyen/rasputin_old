module.exports = (client, message) => {
  if (message.author.bot) return
  if (message.channel.id === '627220700175794177') {
    client.channels.get('627255142651134012').send(`**${client.guilds.get(message.guild.id).members.get(message.author.id).nickname ? client.guilds.get(message.guild.id).members.get(message.author.id).nickname : message.author.username}**: ${message.content.match(/(<.*>)#.*()\s/) ? message.content.replace(/(<.*>)#.*(\s)/, '$1$2') : message.content.match(/<.*>/) ? message.content : message.content.match(/@(.*?)\s/) ? (client.guilds.get('419489787477491715').members.find(member => member.nickname === message.content.match(/@(.*?)\s/)[1]) ? message.content.replace(/()@.*?(\s)/, `$1${client.guilds.get('419489787477491715').members.find(member => member.nickname === message.content.match(/@(.*?)\s/)[1])}$2`) : message.content.replace(/()@.*?(\s)/, `$1${client.guilds.get('419489787477491715').members.find(member => member.user.username === message.content.match(/@(.*?)#.*\s/)[1])}$2`)) : message.content}`)
  }
  if (message.channel.id === '627255142651134012') {
    client.channels.get('627220700175794177').send(`**${client.guilds.get(message.guild.id).members.get(message.author.id).nickname ? client.guilds.get(message.guild.id).members.get(message.author.id).nickname : message.author.username}**: ${message.content.match(/(<.*>)#.*()\s/) ? message.content.replace(/(<.*>)#.*(\s)/, '$1$2') : message.content.match(/<.*>/) ? message.content : message.content.match(/@(.*?)\s/) ? (client.guilds.get('533394970212827156').members.find(member => member.nickname === message.content.match(/@(.*?)\s/)[1]) ? message.content.replace(/()@.*?(\s)/, `$1${client.guilds.get('533394970212827156').members.find(member => member.nickname === message.content.match(/@(.*?)\s/)[1])}$2`) : message.content.replace(/()@.*?(\s)/, `$1${client.guilds.get('533394970212827156').members.find(member => member.user.username === message.content.match(/@(.*?)#.*\s/)[1])}$2`)) : message.content}`)
  }
  // if (message.guild.id !== '533394970212827156') return
  if (message.content.indexOf(client.config.prefix) !== 0) return

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = client.commands.get(command)

  if (!cmd) return

  if (command === 'klan' && message.channel.id !== '535372316901769217') { return }

  cmd.run(client, message, args)
}

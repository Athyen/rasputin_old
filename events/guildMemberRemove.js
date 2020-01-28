module.exports = (client, member) => {
  if (member.guild.id !== '533394970212827156') return
  if (member.nickname) {
    client.channels.get('534377082596360192').send(`${member.user.username} (${member.nickname}) wyszedł z serwera o \`${client.date()}\``)
  } else {
    client.channels.get('534377082596360192').send(`${member.user.username} wyszedł z serwera o \`${client.date()}\``)
  }
}

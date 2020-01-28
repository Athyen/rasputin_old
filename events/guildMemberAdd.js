module.exports = (client, member) => {
  if (member.guild.id !== '533394970212827156') return
  client.channels.get('534377082596360192').send(`${member} wszedł na serwer o \`${client.date()}\``)
  client.channels.get('533396158551162920').send(`Witaj na serwerze klanu ${member.guild.name}, ${member}! W sprawie rekrutacji zgłoś się do jednego z kapitanów - ${member.guild.members.get('392739344835674122')}, ${member.guild.members.get('110170771728396288')}, ${member.guild.members.get('384349610551803904')}, ${member.guild.members.get('270004554953654273')}`)
  // member.roles.add(member.guild.roles.find(role => role.name === 'Rekrut'))
}

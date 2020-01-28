module.exports = {
  apps: [{
    name: 'rasputin',
    script: './index.js',
    watch: true,
    log_date_format: 'DD.MM HH:mm:ss',
    ignore_watch: ['node_modules', 'config.json']
  }]
}

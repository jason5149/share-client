const express = require('express')
const compression = require('compression')
const morgan = require('morgan')

const app = express()
const history = require('connect-history-api-fallback')

const PORT = 3333

const staticFile = express.static('dist')

app.use(morgan())
app.use(compression())
app.use(staticFile)
app.use(history({
  disableDotRule:    true,
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
  logger:            console.log.bind(console),
}))
app.use(staticFile)

app.listen(PORT, () => console.info(`Open http://localhost:${ PORT }`))


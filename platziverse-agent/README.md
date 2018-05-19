# platziverse-agent

## Usage

``` js
const PlatziverseAgent = require('platziverse-agent')

const agent = new PlatziverseAgent({
  name: 'myapp',
  username: 'admin',
  interval: 2000
})

agent.addMetric('rss', function getRss() { // get resident set size
  return process.memoryUsage().rss
})

agent.addMetric('promiseMetric', function getRandomPromise() { // get resident set size
  return Promise.resolve(Math.random())
})

agent.addMetric('callbackMetric', function getRandomCallback (callback) {
  setTimeout(() => {
    callback(null, Math.random())
  }, 1000)
})

agent.connect()

// This agent only
agent.on('connected', handler)
agent.on('disconnected', handler)
agent.on('message', handler)


// Others agents
agent.on('agent/connected')
agent.on('agent/disconnected'

function handler (payload) {
  console.log(payload)
}

agent.on('agent/message', payload => {
  console.log(payload)
})

setTimeout(() => agent.disconnected(), 2000)
```
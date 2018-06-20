'use strict'

module.exports = {
  endpoint: process.env.API_ENDPOINT || 'http://localhost:3001',
  serverHost: process.env.SERVER_HOST || 'http://localhost:8080',
  mqttHost: process.env.MQTT_HOST || 'mqtt://localhost',
  apiToken: process.env.API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsInBlcm1pc3Npb25zIjpbIm1ldHJpY3M6IHJlYWQiXSwiaWF0IjoxNTI2OTU5NjQ1fQ.AwLhR1MtW3LZybsE8FzY_8JaJgKF50cGNVkLqJPpeNE'
}
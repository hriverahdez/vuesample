// qa.stage.do.linkitox.com
// stage.do.linkitox.com

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: "'http://stage.do.linkitox.com/public/graphql'"
})

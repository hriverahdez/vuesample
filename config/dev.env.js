'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// qa.stage.do.linkitox.com
// stage.do.linkitox.com

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: "'http://stage.do.linkitox.com/public/graphql'"
})

// 'use strict'

// const { Client } = require('@elastic/elasticsearch')

// const client = new Client({ nodes: ['http://workflow_es01:9200', 'http://workflow_es02:9200', 'http://workflow_es03:9200'], maxRetries: 5, requestTimeout: 60000, sniffOnStart: true })

// const run = async (name, message, status) => {
//   const date = new Date().toISOString().slice(0, 10);
//   await client.index({
//     index: `api_${process.env.ENV}-${date}`,
//     body: {
//       name: name,
//       message: message,
//       status: status
//     }
//   })
// }

// module.exports = {
//   run,
// }
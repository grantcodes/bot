const axios = require('axios')

const instance = axios.create({
  baseURL: process.env.HA_URL + 'api/',
  headers: {
    Authorization: 'Bearer ' + process.env.HA_TOKEN,
  },
})

module.exports = instance

// module.exports = {
//   get: async (path, data) => {
//     axios.
//   },
//   post: async (path, data) => {

//   }
// }

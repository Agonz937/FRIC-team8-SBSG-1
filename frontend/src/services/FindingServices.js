import axios from 'axios'
const qs = require('qs')
const hostname = process.env.VUE_APP_API_HOST

export default {
  async getFindings () {
    const res = await axios.get(`http://${hostname}:3000/findings/all`)
    return res
  },

  async getFindingSingle (findingId) {
    const res = await axios.get(`http://${hostname}:3000/findings/` + findingId)
    return res
  },

  async createFinding (form) {
    const res = await axios.post(`http://${hostname}:3000/findings/`, form)
    return res
  },

  async deleteFinding (findingId) {
    const res = await axios.delete(`http://${hostname}:3000/findings/` + findingId)
    return res
  },

  async modifyFinding (findingId, newForm) {
    const res = await axios.patch(`http://${hostname}:3000/findings/` + findingId, newForm)
    return res
  },

  async getMultipleFindings (multipleFindings) {
    const res = await axios.get(`http://${hostname}:3000/findings/multiple/findings`, {
      params: {
        arr: multipleFindings
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
    return res
  }
}

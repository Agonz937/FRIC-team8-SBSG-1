import axios from 'axios'

export default {
  async getFindings () {
    const res = await axios.get('http://localhost:3000/findings/all')
    return res
  },

  async getFindingSingle (findingId) {
    const res = await axios.get('http://localhost:3000/findings/' + findingId)
    return res
  },

  async createFinding (form) {
    const res = await axios.post('http://localhost:3000/findings/', form)
    return res
  },

  async deleteFinding (findingId) {
    const res = await axios.delete('http://localhost:3000/findings/' + findingId)
    return res
  },

  async modifyFinding (newForm, findingId) {
    const res = await axios.patch('http://localhost:3000/findings/' + findingId, newForm)
    return res
  }
}

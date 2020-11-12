import axios from 'axios'
const qs = require('qs')

export default {
  async getTasks () {
    const res = await axios.get('http://localhost:3000/tasks/all')
    return res
  },

  async getTaskSingle (taskId) {
    const res = await axios.get('http://localhost:3000/tasks/' + taskId)
    return res
  },

  async createTask (form) {
    const res = await axios.post('http://localhost:3000/tasks/', form)
    return res
  },

  async deleteTask (taskId) {
    const res = await axios.delete('http://localhost:3000/tasks/' + taskId)
    return res
  },

  async modifyTask (newForm, taskId) {
    const res = await axios.patch('http://localhost:3000/tasks/' + taskId, newForm)
    return res
  },

  async getMultipleTasks (multipleTasks) {
    const res = await axios.get('http://localhost:3000/findings/multiple/tasks', {
      params: {
        arr: multipleTasks
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
    return res
  }
}

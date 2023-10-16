<template>
 <div class="container">
      <div class="row">
        <div class="col-md-8">
            <h1 align="center" >INTERFACE DE SAISIE</h1>
        <div class="col-md-7">
          <form @submit.prevent="save" class="form">
            <div class="form-group mt-3" align="right">
              <label>Libelle</label>
              <input
                v-model="task.label"
                required
                type="text"
                class="signupform-control"
                placeholder="label"
              />
            </div>
            <div class="form-group mt-3" align="right">
              <label>Heure de début</label>
              <vue-flatpickr
                v-model="task.startTime"
                :modelValue="task.startTime"
                required
                type="datetime-local"
                class="signupform-control"
                placeholder="Heure de début"
                :config="datePickerConfig"
                @on-change="updateStartTime"
              />
            </div>
            <div class="form-group mt-3" align="right">
              <label>Heure de fin</label>
              <vue-flatpickr
                v-model="task.endTime"
                :modelValue="task.endTime"
                required
                type="datetime-local"
                class="signupform-control"
                :config="datePickerConfig"
                placeholder="Heure de fin"
                @on-change="updateEndTime"
                />
            </div>
            <button class="btn btn-primary btn-block mt-4">Enregistre</button>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
      </div>
<h2>INTERFACE 1</h2>
<div class="container_header d-flex justify-content-around  p-2 bd-highlight" >
  <div class="container_header-item">  </div>
  <button class="btn btn-secondary" @click="sortByLabel">sort by Label  </button>
  <button class="btn btn-secondary" @click="sortByStartTime">sort by Heure de début </button>
  <button class="btn btn-secondary" @click="sortByEndTime">sort by Heure de fin</button>
</div>
<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Label</th>
      <th scope="col">Heure de début</th>
      <th scope="col">Heure de fin</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in result" v-bind:key="task.id">
      <th scope="row">{{task._id}}</th>
      <td>{{task.label}}</td>
      <td>{{formatDate(task.startTime)}}</td>
      <td>{{formatDate(task.endTime)}}</td>
      <td>
       <button type="button" class="btn btn-warning" @click="remove(task)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
<h2>INTERFACE 2</h2>

<table class="table table-dark">
<thead>
    <tr>
      <th scope="col">Tàche id</th>
      <th scope="col">Tàche</th>
      <th scope="col">Houre Total de tache</th>
      <th scope="col">Select Assigned User</th>
      <th scope="col">Assigned Task</th>
      <th scope="col">Assigned User</th>
      <th scope="col">Remaining Hours</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in result" v-bind:key="task.id">
      <td>{{task._id}}</td>
      <td>{{task.label}}</td>
      <td>{{ calculateTotalHours(task.startTime, task.endTime) }}</td>
      <td>
  <div class="form-group mt-3" align="right">
    <select  v-model="task.selectedUser" @change="assignTaskToUser(task._id, task)">
       <option v-for="user in users"
                 v-bind:key="user.id"
                :disabled="isUserAlreadyAssigned(user.firstname)">
                {{ user.firstname }}</option>
    </select>
  </div>
</td>
<td>{{  task.assignedTask ? task.assignedTask : "No Assigned task"}}</td>
<td>{{ task.assignedUser ? task.assignedUser.firstname : "Not Assigned user" }}</td>
<td>{{ task.remainingHours ? task.remainingHours : 'N/A' }}</td>
<td>
          <ul v-if="task.assignedUser && task.assignedUser.assignedTasks.length > 0">
            <li v-for="task in task.assignedUser.assignedTasks" :key="task.id">{{ task.id }}</li>
          </ul>
        </td>
        <td>
  <button  class="btn btn-warning" v-if="task.selectedUser" @click="finishWork(task, task.selectedUser )">Finish Work</button>
</td>
    </tr>
  </tbody>
</table>
      </div>
</template>

<script>

import axios from 'axios'
import VueFlatpickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment-timezone'

export default {
  components: {
    VueFlatpickr
  },
  name: 'Home',
  data () {
    return {
      components: {
        VueFlatpickr
      },
      datePickerConfig: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        altFormat: 'Y-m-d H:i',
        altInput: true
      },
      result: [],
      task: {
        _id: '',
        label: '',
        startTime: '',
        endTime: '',
        selectedUser: ''
      },
      selectedUsers: {},
      users: [],
      selectedTasks: []
    }
  },

  created () {
    this.getAllDatas()
    this.getAllUser()
    this.result.forEach(task => {
      task.selectedUser = null
    })
  },
  mounted () {
    console.log('mounted()')
  },
  methods: {
    getAllDatas () {
      const page = 'http://localhost:8000/data/getAllDatas'
      axios.get(page)
        .then(
          (data) => {
            try {
              if (data.status === 200) {
                alert('Data get successfull')
                this.result = data.data.data
              } else {
                alert('failed to get datas')
              }
            } catch (error) {
              alert('Please try again')
            }
          }
        )
    },
    sortByLabel () {
      console.log('sortby label')
      this.result.sort((a, b) => (a.label > b.label) ? 1 : -1)
    },
    sortByStartTime () {
      console.log('sortby start time')
      this.result.sort((a, b) => {
        const dateA = moment.utc(a.startTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').subtract(2, 'hours')
        const dateB = moment.utc(b.startTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').subtract(2, 'hours')
        return dateA - dateB
      })
    },
    sortByEndTime () {
      console.log('sortby end time')
      this.result.sort((a, b) => {
        const dateA = moment.utc(a.endTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').subtract(2, 'hours')
        const dateB = moment.utc(b.endTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').subtract(2, 'hours')
        return dateA - dateB
      })
    },
    calculateTotalHours (startTime, endTime) {
      const start = moment.utc(startTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').subtract(2, 'hours')
      const end = moment.utc(endTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').subtract(2, 'hours')
      const duration = moment.duration(end.diff(start))
      const hours = duration.asHours()
      return hours
    },
    formatDate (dateTimeString) {
      const localTimeZone = 'Europe/Paris'
      const formatString = 'YYYY-MM-DDTHH:mm:ss.SSSZ'

      const adjustedDateTimeString = moment.utc(dateTimeString, formatString)
      //  TODO Need to find another solution here !!
        .subtract(2, 'hours')
        .format(formatString)

      const localTime = moment.utc(adjustedDateTimeString, formatString)
        .tz(localTimeZone)
        .format('YYYY-MM-DD HH:mm')

      return localTime
    },
    updateStartTime (newDates) {
      if (newDates && newDates.length > 0) {
        const lastValueIndex = newDates.length - 1
        const newValue = newDates[lastValueIndex]
        console.log('Start Time Updated:', newValue)
        this.task.startTime = newValue ? moment(newValue).format('YYYY-MM-DDTHH:mm') : ''
      }
    },
    updateEndTime (newDates) {
      if (newDates && newDates.length > 0) {
        const lastValueIndex = newDates.length - 1
        const newValue = newDates[lastValueIndex]
        console.log('End Time Updated:', newValue)
        this.task.endTime = newValue ? moment(newValue).format('YYYY-MM-DDTHH:mm') : ''
      }
    },
    save () {
      const formattedTask = {
        _id: this.task._id,
        label: this.task.label,
        startTime: moment(this.task.startTime).format('YYYY-MM-DDTHH:mm'),
        endTime: moment(this.task.endTime).format('YYYY-MM-DDTHH:mm')
      }
      console.log('End Timefrom front:', formattedTask)
      axios.post('http://localhost:8000/data/create', formattedTask)
        .then(
          (response) => {
            console.log(response.status)
            try {
              if (response.status === 201) {
                alert('Data saved successfull')
                this.getAllDatas()
                window.location.reload()
              } else {
                alert('Failed to save data')
                window.location.reload()
              }
            } catch (error) {
              alert('Please try again')
              window.location.reload()
            }
          }
        )
        .catch((error) => {
          console.log(error)
          alert('An error occurred. Please check your input and try again.')
          this.$router.push('/home')
        })
    },
    assignTaskToUser (taskId, task) {
      console.log('taskId', taskId)
      console.log('task', task)
      console.log('task.selectedUser:', task.selectedUser)
      const user = this.users.find((user) => user.firstname == task.selectedUser)
      if (user) {
        const taskHours = this.calculateTotalHours(task.startTime, task.endTime)
        console.log('taskHours', taskHours)
        if (taskHours > 8) {
          const confirmation = window.confirm(
            `Are you sure you want to assign ${task.selectedUser} to this task?`
          )
          if (confirmation) {
            const restHours = taskHours - 8
            task.remainingHours = restHours
            console.log('restHours', restHours)
            user.assignedTasks.push(task)
            task.assignedTask = task.label
            task.assignedUser = user
            // Instead of finish button we can start a timer to be started as soon as a task attached to a user
          }
        } else {
          const workingHours = 8
          if (taskHours < workingHours) {
            // Assign task to user
            const confirmation = window.confirm(
              `Are you sure you want to assign ${task.selectedUser} to this task?`
            )

            if (confirmation) {
              const restHours = taskHours - 8
              task.remainingHours = restHours
              user.assignedTasks.push(task)
              task.assignedTask = task.label
              user.workingHours -= taskHours
              task.assignedUser = user
            }
          }
        }
      }
    },
    isUserAlreadyAssigned (username) {
      for (const task of this.result) {
        if (task.assignedUser && task.assignedUser.firstname  == username) {
          return true
        }
      }
      return false
    },
    finishWork (task) {
      console.log(task)
      console.log('task.assignedUser', task.assignedUser)
      if (task.assignedUser) {
        const user = task.assignedUser
        user.workingHours += this.calculateTotalHours(task.startTime, task.endTime)
        this.removeAssignedUser(task, user)
      } else {
        console.error('No user is currently assigned to this task.')
      }
    },
    removeAssignedUser (task, user) {
      task.assignedUser = null
      task.selectedUser = null
      task.assignedTask = null
      task.remainingHours = null
    },
    getAllUser () {
      const userPage = 'http://localhost:8000/user/getAllUsers'
      axios.get(userPage)
        .then(
          (response) => {
            console.log('users', response.data.data)
            try {
              if (response.status === 200) {
                alert('Data get successfull')
                this.users = response.data.data.map((user) => {
                  return {
                    ...user,
                    assignedTasks: []
                  }
                })
              } else {
                alert('failed to get datas')
              }
            } catch (error) {
              alert('Please try again')
            }
          }
        )
    },
    remove (task) {
      console.log(task._id)
      const url = `http://localhost:8000/data/delete/${task._id}`      
      axios.delete(url)
      alert('Task deleted')
      this.getAllDatas()
    }

  }

}
</script>

<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
            <h1 align="center" >Login User</h1>
        <div class="col-md-6">
          <form @submit.prevent="login" class="form">
            <div class="form-group mt-3" align="left">
              <label>Email</label>
              <input
                v-model="user.email"
                required
                type="email"
                class="signupform-control"
                placeholder="email"
              />
            </div>
            <div class="form-group mt-3" align="left">
              <label>Password</label>
              <input
                v-model="user.password"
                type="password"
                autocomplete="new-password"
                class="signupform-control"
                required
                placeholder="password"
              />
            </div>
            <button class="btn btn-primary btn-block mt-4">Login</button>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
      </div>
      </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Registre',
  data () {
    return {
      result: {},
      user: {
        email: '',
        passowrd: ''

      }
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted()')
  },
  methods: {
    login () {
      axios.post('http://localhost:8000/user/login', this.user)
        .then(
          (response) => {
            console.log(response.status)
            try {
              if (response.status === 200) {
                this.$router.push('/home')
              } else {
                alert('Login failed')
                this.$router.push('/login')
              }
            } catch (error) {
              alert('Please try again')
              this.$router.push('/login')
            }
          }
        )
        .catch((error) => {
          console.log(error)
          alert('An error occurred. Please check your input and try again.')
          this.$router.push('/login')
        })
    }
  }

}
</script>

<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
            <h1 align="center" >Signup User</h1>
        <div class="col-md-6">
          <form @submit.prevent="signup" class="form">
            <div class="form-group mt-3" align="left">
              <label>Nom</label>
              <input
                v-model="user.firstname"
                required
                type="text"
                class="signupform-control"
                placeholder="First Name"
              />
            </div>
            <div class="form-group mt-3" align="left">
              <label>Prenom</label>
              <input
                v-model="user.secondname"
                required
                type="text"
                class="signupform-control"
                placeholder="Second Name"
              />
            </div>
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
              <!-- <div
                v-if="user.password.length > 1 && user.password.length < 6"
                class="text-danger"
              >
                password legnth should be grater than 6
              </div> -->
              <!-- <div v-html="error" /> -->
              <br />
            </div>
            <button class="btn btn-primary btn-block mt-4">Sign Up</button>
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
        id: '',
        firstname: '',
        secondname: '',
        email: '',
        passowrd: '',
        error: ''

      }
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted()')
  },
  methods: {
    signup () {
      axios.post('http://localhost:8000/user/signup', this.user)
        .then(
          (response) => {
            console.log(response.data)
            this.$router.push('/login')
          },
          (error) => {
            console.log(error)
            this.$router.push('/login')
          }
        )
    }
  }

}
</script>

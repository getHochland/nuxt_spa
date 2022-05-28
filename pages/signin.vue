<template>
  <div>
    <div class="text-center">
      <form class="form-signin" @submit.prevent="userLogin">
        <h1 class="h3 mb-3 mt-3 font-weight-normal">Пожалуйста укажите логин и пароль</h1>
        <div class="col-md-4 mb-3 mx-auto">
        <label for="inputUsername" class="sr-only">Имя пользователя</label>
        <input id="inputUsername" class="form-control" placeholder="Имя пользователя" required="" v-model="login.username">
        </div>
        <div class="col-md-4 mb-3 mx-auto">
        <label for="inputPassword" class="sr-only">Пароль</label>
        <input type="password" id="inputPassword" class="form-control mt-2" placeholder="Пароль" required="" v-model="login.password">
        </div>
        <div class="col-md-4 mb-3 mx-auto">
        <button class="btn mt-2 btn-lg btn-primary btn-block" type="submit">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "post_detail",
  data() {
    return {
      login: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>

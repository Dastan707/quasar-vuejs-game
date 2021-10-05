<template>
<div class="wrapper">
<div class="v-login">
    <p>Введите ваш e-mail :</p>
   <div class="input_form position-relative">
        <input class="input_login"
        type="text"
        v-model="inputName"
        placeholder="e-mail address"
        @keyup="submit(inputName)"
        >
        <q-inner-loading class="q-mt-md" :showing="visible" >
          <q-spinner-ios size="35px" color="primary" />
        </q-inner-loading>
    </div>
    <div v-show="showErrors">
        <p class="errors" v-if="errors.length">
        <ul>
          <li
          class="login_clues"
          v-for="(error, i) in errors"
          :key="i + 10"
          >
          {{error}}
          </li>
        </ul>
        <ul v-show="showExample">
          <p>Возможно, вы имели в виду?</p>
          <li
          class="login_domains"
          @click="selectTrueDomain"
          >
            {{this.TEST_ARRAY.did_you_mean}}
          </li>
        </ul>
        </p>
    </div>
</div>
</div>
</template>

<script>
import { debounce, Notify } from 'quasar'
// eslint-disable-next-line import/named
import { ref } from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Login',
  props: {
  },
  data () {
    return {
      inputName: '',
      errors: [],
      showExample: false,
      visible: ref(false),
      showErrors: true
    }
  },
  created () {
    this.submit = debounce(this.submit, 1500)
    this.validateInput = debounce(this.validateInput, 2000)
    console.log(localStorage.inputName, 'localStorage')
    if (localStorage.inputName) {
      this.$router.push('/game')
    } else {
      this.$router.push('/')
    }
  },
  mounted () {
    if (localStorage.name) {
      this.inputName = localStorage.inputName
    }
  },
  methods: {
    ...mapActions([
      'GET_VALUE_INPUT_NAME',
      'GET_AXIOS'
    ]),
    ...mapMutations([
      'SET_VALUE_INPUT_NAME',
      'SET_AXIOS'
    ]),
    submit (value) {
      this.GET_AXIOS(value)
      this.GET_VALUE_INPUT_NAME(value)
      this.validateInput()
    },
    validateInput () {
      // loading quasar
      this.visible = true
      this.showErrors = false

      setTimeout(() => {
        this.visible = false
        this.showErrors = true
      }, 1000)
      // end
      if (
        !this.TEST_ARRAY.format_valid
      ) {
        this.errors.splice(
          0, this.errors.length,
          'Введите адрес эл.почты корректно, oт двух символов, разрешены цифры и знаки (test@example.com)'
        )
        this.showExample = false
      } else if (this.TEST_ARRAY.mx_found === false) {
        this.errors.splice(0, this.errors.length, 'Адрес эл.почты введен неправильно')
        // this.errors.splice(0, this.errors.length, 'trrr')
        this.showExample = true
      } else if (this.inputName === '') {
        Notify.create('Заполните поле для ввода')
      } else if (this.TEST_ARRAY.reason === 'rejected_email') {
        this.errors.splice(0, this.errors.length, 'Такой эл.почты не существует, введите существующую')
      } else if (
        this.TEST_ARRAY.format_valid
      ) {
        this.errors.splice(0, this.errors.length)
        Notify.create('Данные введены верно')
        localStorage.inputName = this.inputName
        this.inputName = ''
        this.$router.push('/game')
      }
    },
    selectTrueDomain () {
      this.inputName = this.TEST_ARRAY.did_you_mean.replace(/{0-9a-zA-Z}/, this.inputName)
      this.TEST_ARRAY.email = this.TEST_ARRAY.did_you_mean.replace(/{0-9a-zA-Z}/, this.TEST_ARRAY.email)
      if (!this.TEST_ARRAY.mx_found) {
        this.TEST_ARRAY.mx_found = true
      }
      this.validateInput()
      this.errors.splice(0, this.errors.length)
      // loading quasar
      this.visible = true
      this.showErrors = false

      setTimeout(() => {
        this.visible = false
        this.showErrors = true
      }, 1000)
      // end
    }
  },
  computed: {
    ...mapGetters([
      'TEST_ARRAY',
      'INPUT_NAME'
    ])
  }
}
</script>

<style scoped>
.v-login{
  max-width: 500px;
  height: 250px;
  padding: 15px 35px 35px;
  margin: 0 auto;
  background-color: #f1f1f1 ;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}
.button_game {
  background-color: #4CAF50;
  width: 120px;
  height: 35px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 12px;
  margin-top: 10px;
}
.input_login {
  position: relative;
  font-size: 16px;
  width: 250px;
  height: 40px;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.input_login:focus {
  z-index: 2;
}
.login_clues{
  color: red;
  list-style-type: none;
  margin: 0 auto;
}
.login_domains{
  color: blue;
  list-style-type: none;
  cursor: pointer;
  text-decoration: underline;
}
.errors{
  margin-bottom: 2px;
}
.input_form{
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
</style>

<template>
    <div class="modal-wrapper" ref="modal-wrapper">
      <div class="v-modal">
          <div class="v-modal-header">
              <span class="v-modal-question">Question: "{{value.question}}"</span>
          </div>
          <div class="v-modal-content">
              <slot></slot>
              <input class="v-modal-inp"
                type="text"
                placeholder="write your answer is here..."
                v-model="text"
              />
          </div>
          <div class="v-modal-footer">
                <button id="test" class="button_game" @click="answer">Submit</button>
                <p class="timer">Ваше время : {{timer}} {{sec}}</p>
                <button class="button_game" @click="closeModal">Close Modal</button>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Notify } from 'quasar'
export default {
  name: 'Modal',
  props: {
    value: {
      type: Object
    }
  },
  data () {
    return {
      text: '',
      timer: 60,
      sec: '',
      answeredColor: [],
      wrongColor: []
    }
  },
  created () {
    console.log(localStorage.answeredQuestions)
  },
  watch: {
    timer: {
      handler (value) {
        if (value > 0) {
          setTimeout(() => {
            this.timer--
          }, 1000)
          this.secondCounter()
        } else if (this.timer === 0) {
          this.SET_INCORRECT(this.value.value)
          Notify.create('Время вышло :(')
          this.$emit('wrong', true)
          this.$emit('closeModal')
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'CORRECT',
      'INCORRECT'
    ])
  },
  methods: {
    ...mapActions([
      'GET_CORRECT',
      'GET_INCORRECT'
    ]),
    ...mapMutations([
      'SET_CORRECT',
      'SET_INCORRECT'
    ]),
    answer () {
      console.log(this.text, this.value.answer)
      if (this.value.answer.toLowerCase() === this.text.toLowerCase()) {
        this.SET_CORRECT(this.value.value)
        localStorage.setItem('correct', JSON.stringify(this.$store.state.valueCorrect))
        Notify.create('Ответ правильный!')
        this.$emit('answer', true)
        this.$emit('closeModal')
      } else if (this.text === '') {
        Notify.create('Заполните поле для ввода ответа!')
      } else {
        this.SET_INCORRECT(this.value.value)
        localStorage.setItem('incorrect', JSON.stringify(this.$store.state.valueInCorrect))
        Notify.create('Ответ неправильный!')
        this.$emit('wrong', true)
        this.$emit('closeModal')
      }
      localStorage.setItem('answeredQuestions', JSON.stringify(this.CORRECT.length + this.INCORRECT.length))
      localStorage.setItem('totalPoints', JSON.stringify(this.$store.state.valueCorrect + this.$store.state.valueInCorrect))
      localStorage.setItem('correctAnswers', JSON.stringify(this.CORRECT.length))
      localStorage.setItem('inCorrectAnswers', JSON.stringify(this.INCORRECT.length))
      if (this.value.answered) {
        localStorage.setItem('answeredColor', JSON.stringify([
          ...this.answeredColor,
          this.value
        ]))
      } else if (this.value.wrong) {
        localStorage.setItem('wrongColor', JSON.stringify([
          ...this.wrongColor,
          this.value
        ]))
      }
    },
    closeModal () {
      this.$emit('closeModal')
    },
    secondCounter () {
      if (this.timer === 1) {
        this.sec = 'cекунда'
      } else if (this.timer >= 2 && this.timer < 5) {
        this.sec = 'cекунды'
      } else if (this.timer >= 5) {
        this.sec = 'cекунд'
      }
    }
  },
  mounted () {
    const vm = this
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs['modal-wrapper']) { vm.closeModal() }
    })
    if (localStorage.wrongColor) {
      this.wrongColor = JSON.parse(localStorage.getItem('wrongColor'))
    }
  }
}
</script>
<style>
.modal-wrapper{
    background: rgba(64, 64, 64, 0.4);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.v-modal{
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 470px;
    height: 250px;
    background: #ffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    z-index: 10;
}
.v-modal-header{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
 .v-modal-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.v-modal-content{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}
.v-modal-inp{
    width: 350px;
    height: 50px;
    border: none;
    border: 2px solid #bbbbbb;
}
.timer{
  font-size: 15px;
  margin-top: 15px;
}
</style>

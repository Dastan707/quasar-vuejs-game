<template>
    <div class="v-statistic">
      <h3> {{name}}</h3>
      <div class="v-statistic-header">
      <div class="statistic-btn">
            <q-btn @click="backToGame" icon="arrow_back" color="secondary"/>
      </div>
        <div class="statistic-total">
          <h4>Всего отвеченных вопросов : {{this.answeredQuestions}} из 25</h4>
          <div class="total_points">
          <h5 class="points"> Количество правильных ответов : {{this.correctAnswers}}  ({{this.correct}} баллов)</h5>
          <h5 class="points"> Количество неправильных ответов : {{this.inCorrectAnswers}} ({{this.incorrect}} баллов)</h5>
          <h4>Итого : {{this.totalPoints}}</h4>
          </div>
        </div>
      </div>
        <div class="v-statistic-list">
        <div class="over">
            <q-btn icon="cancel" color="red" label="Закончить игру" @click="openModalExit" />
        </div>
        </div>
        <ModalExit
        v-if="isModalExitVisible"
        @continueGame="continueGame"
        />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ModalExit from './ModalExit.vue'
export default {
  name: 'Statistic',
  components: {
    ModalExit
  },
  props: {
  },
  data () {
    return {
      name: '',
      isModalExitVisible: false,
      correct: 0,
      incorrect: 0,
      totalPoints: 0,
      correctAnswers: 0,
      inCorrectAnswers: 0,
      answeredQuestions: 0
    }
  },
  mounted () {
    this.name = localStorage.inputName
    if (localStorage.getItem('incorrect')) {
      try {
        this.incorrect = JSON.parse((localStorage.getItem('incorrect')))
      } catch (e) {
        localStorage.removeItem('incorrect')
      }
    }
    if (localStorage.getItem('correct')) {
      try {
        this.correct = JSON.parse((localStorage.getItem('correct')))
      } catch (e) {
        localStorage.removeItem('correct')
      }
    }
    if (localStorage.getItem('totalPoints')) {
      try {
        this.totalPoints = JSON.parse((localStorage.getItem('totalPoints')))
      } catch (e) {
        localStorage.removeItem('totalPoints')
      }
      if (localStorage.getItem('correctAnswers')) {
        try {
          this.correctAnswers = JSON.parse((localStorage.getItem('correctAnswers')))
        } catch (e) {
          localStorage.removeItem('correctAnswers')
        }
        if (localStorage.getItem('inCorrectAnswers')) {
          try {
            this.inCorrectAnswers = JSON.parse((localStorage.getItem('inCorrectAnswers')))
          } catch (e) {
            localStorage.removeItem('inCorrectAnswers')
          }
        }
        if (localStorage.getItem('answeredQuestions')) {
          try {
            this.answeredQuestions = JSON.parse((localStorage.getItem('answeredQuestions')))
          } catch (e) {
            localStorage.removeItem('answeredQuestions')
          }
        }
      }
    }
    if (this.CLUES.length > 25) {
      this.CLUES.splice(25, this.CLUES.length)
    }
  },
  computed: {
    ...mapGetters([
      'CORRECT',
      'INCORRECT',
      'CLUES',
      'INPUT_NAME',
      'TEST_ARRAY',
      'GAME_START'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_START_GAME'
    ]),
    openModalExit () {
      this.isModalExitVisible = true
    },
    continueGame () {
      this.isModalExitVisible = false
    },
    backToGame () {
      this.$router.push('/game')
      if (this.$store.state.isGameStarted === true) {
        this.$store.state.isGameStarted = true
      } else {
        this.$store.state.isGameStarted = false
      }
    }
  },
  created () {
  }
}
</script>
<style>
.v-statistic-list{
  display: flex;
  justify-content: space-around;
}
h3, h4{
  display: flex;
  justify-content: center;
}
.button_game{
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 14px 28px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    border-radius: 12px;
}
.statistic-btn{
  margin-left: 10px;
}
.statistic-btn button{
  text-decoration: none;
}
.total-points{
  display: flex;
}
.points{
  display: flex;
  justify-content: space-around;
}
</style>

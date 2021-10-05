<template>
<div class="v-game full-width column  justify-center items-center">
  <div class="start-game">
      <h3>Game</h3>
            <button class="button_game justify-center items-center" @click="toStatistic">Посмотреть статистику</button>
        <button class="button_game btn justify-center items-center" v-show="showStartButton" @click="startGame">Начать игру!</button>
        <button class="button_game btn justify-center items-center" v-show="showOverButton" @click="overGame">Закончить игру</button>
  </div>
        <Modal
            v-if="isModalVisible"
            @closeModal="closeModal"
            :value="selectedQuestion"
            :answer="answer"
            :wrong="wrong"
            @answer='answer'
            @wrong='wrong'
        />
        <div class="v-game__started"
        >
            <div class="category_block">
                <div class="category"
                    v-for="item in CATEGORY"
                    :key="item.id"
                >
                <p class="category_item">{{item.title}}</p>
            </div>
        </div>
        <div class="value_block">
            <div class="value" v-if="CLUES"></div>
            <!-- <button
                @click="openModal(value)"
                class="value_item"
                v-for="value of CLUES"
                :key="value.id"
                :id="value.id"
                :value="value"
                :class="{
                    correct_answer: value.answered,
                    notcorrect_answer: value.wrong
                 }"
                > -->
              <button
                @click="openModal(value)"
                v-for="value of CLUES"
                class="value_item"
                :key="value.id"
                :id="value.id"
                :class="{
                  incorrect: value.wrong,
                  correct: value.answered
                }"
                >
                <span>
                <p>
                  {{value.value}}
                </p>
                </span>
            </button>
      </div>
  </div>
  </div>
</template>

<script>
/* eslint-disable */ 
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Modal from './Modal.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    Modal
  },
  data () {
    return {
      isModalVisible: false,
      showStartButton: true,
      showOverButton: false,
      isShowStat: false,
      selectedQuestion: {},
      correctAnswers: [],
      wrongAnswers: '',
      answeredColor: [],
      wrongColor: []
    }
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'GET_CATEGORIES',
      'GET_QUESTION',
      'GET_START_GAME'
    ]),
    ...mapMutations([
      'SET_START_GAME'
    ]),
    startGame () {
      this.SET_START_GAME(this.$store.state.isGameStarted = true)
      this.showStartButton = false
      this.showOverButton = true
      if (this.CLUES.length > 25) {
        this.CLUES.splice(25, this.CLUES.length)
      }
    },
    overGame () {
      this.SET_START_GAME(this.$store.state.isGameStarted = false)
      this.showOverButton = false
      this.showStartButton = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    openModal (value) {
      this.isModalVisible = true
      this.selectedQuestion = value
    },
    answer () {
      this.selectedQuestion.answered = true
      this.selectedQuestion = localStorage.answerColor
      if (this.CLUES.length > 25) {
        this.CLUES.splice(25, this.CLUES.length)
      }
    },
    wrong () {
      this.selectedQuestion.wrong = true
      if (this.CLUES.length > 25) {
        this.CLUES.splice(25, this.CLUES.length)
      }
    },
    toStatistic () {
      this.$router.push('/statistic')
    }
  },
  computed: {
    ...mapGetters([
      'CATEGORY',
      'CLUES',
      'CORRECT',
      'INCORRECT',
      'GAME_START'
    ]),
    // test () {
    //   this.wrongColor.forEach(item => {
    //     if (item.id === )
    //   });
    // }
  },
  mounted () {
    this.GET_CATEGORIES()
      .then((response) => {
        if (response.data) {
          console.log('Success')
        }
      })
    if(localStorage.correctAnswers){
      this.correctAnswers = localStorage.correctAnswers
    }
  },
  created () {
      if (this.CLUES.length > 25) {
        this.CLUES.splice(25, this.CLUES.length)
      }
      if (this.$store.state.isGameStarted) {
        this.showStartButton = false
        this.showOverButton = true
      }
      if(localStorage.wrongColor){
      this.wrongColor = JSON.parse(localStorage.getItem('wrongColor'))
      }
      console.log(this.wrongColor)
  }
})

</script>
<style>
.btn{
    margin-bottom: 25px;
    margin-left: 10px;
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
.category{
    border: 2px solid black;
    width: 280px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.v-game__started{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.value{
    display: flex;
}
.value_item{
    border: 2px solid black;
    display: flex;
    height: 55px;
    width: 50px;
    align-items: center;
    justify-content: center;
    margin: 0;
    background: #ffff;
}
.value_block{
    display: flex;
    flex-wrap: wrap;
    width: 280px;
}
/* .correct_answer{
    background: green;
    pointer-events: none;
}
.notcorrect_answer{
    background: red;
    pointer-events: none;
} */
h3{
  display: flex;
  justify-content: center;
}
.correct{
  color: green;
}
.incorrect{
  color: red;
}
</style>

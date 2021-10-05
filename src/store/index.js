import Vuex from 'vuex'
import axios from 'axios'

const store = new Vuex.Store({
  state: {
    question: {},
    category: [],
    clues: [],
    correct: [],
    incorrect: [],
    data: [],
    valueCorrect: 0,
    valueInCorrect: 0,
    inputName: '',
    testArray: {},
    isGameStarted: false
  },
  actions: {
    INIT_STORE: ({ commit }) => {
      axios.get('https://jservice.io/api/clues')
        .then(({ data }) => {
          commit('SET_STORE', data)
        })
    },
    GET_AXIOS: ({ commit }, inputName) => {
      axios
        // .get(`https://api.kickbox.com/v2/verify?email=${inputName}&apikey=test_46b13c954c9991704adc51b2dbf17e3fc63a69369a085c38b620c9d1e09675bf`)
        // .get(`https://api.kickbox.com/v2/verify?email=${inputName}&timeout:30000&apikey=live_1cc904f6964470d4604d6cc580abaea12f9aed581daf6319805a589fdb0d59b1`)
        .get(`http://apilayer.net/api/check?access_key=e2aab0414e9bf1543a318386d8f40272&email=${inputName}&smtp=1&format=1`)
        .then(({ data }) => {
          commit('SET_AXIOS', data)
          return data
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    GET_QUESTION: ({ commit }) => {
      axios
        .get('https://jservice.io/api/category?id=11496')
        .then(({ data }) => {
          commit('SET_QUESTION', data.clues)
        })
    },
    GET_CATEGORIES ({ commit }) {
      return axios('http://jservice.io/api/categories?count=5', {
        method: 'GET'
      })
        .then(({ data }) => {
          commit('SET_CATEGORIES', data)
          return data
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    GET_CORRECT: ({ commit }, value) => {
      commit('SET_CORRECT', value)
    },
    GET_INCORRECT: ({ commit }, value) => {
      commit('SET_INCORRECT', value)
    },
    GET_VALUE_INPUT_NAME: ({ commit }, value) => {
      commit('SET_VALUE_INPUT_NAME', value)
    },
    GET_START_GAME: ({ commit }, isGameStarted) => {
      commit('SET_START_GAME', isGameStarted)
    }

  },
  getters: {
    QUESTION (state) {
      return state.question
    },
    CATEGORY (state) {
      return state.category
    },
    VALUE (state) {
      return state.value
    },
    CLUES (state) {
      return state.clues
    },
    CORRECT (state) {
      return state.correct
    },
    INCORRECT (state) {
      return state.incorrect
    },
    INPUT_NAME (state) {
      return state.inputName
    },
    TEST_ARRAY (state) {
      return state.testArray
    },
    GAME_START (state) {
      return state.isGameStarted
    }

  },
  mutations: {
    SET_STORE: (state, data) => {
      state.data = data
    },
    SET_AXIOS: (state, testArray) => {
      state.testArray = testArray
      console.log(testArray, 'axiosGet')
    },
    SET_CATEGORIES: (state, category) => {
      // eslint-disable-next-line array-callback-return
      category.map((item) => {
        axios
          .get(`https://jservice.io/api/category?id=${item.id}`)
          .then(({ data }) => {
            if (data.clues.length > 5) {
              data.clues.splice(0, 5)
            } else if (state.clues.length > 20) {
              state.clues.splice(20, state.clues.length)
            }
            const answeredTrueIds = JSON.parse(localStorage.getItem('trueIds')) || []
            const answeredFalseIds = JSON.parse(localStorage.getItem('falseIds')) || []
            data.clues.forEach(function (el) {
              if (el.id !== el.category_id) {
                const isAnswered = [...answeredFalseIds, ...answeredTrueIds].indexOf(el.id) >= 0
                const answerRight = !isAnswered ? null : answeredTrueIds.indexOf(isAnswered) >= 0
                // console.log(answeredTrueIds)
                // console.log(answeredFalseIds)
                state.clues.push({
                  isAnswered,
                  answerRight,
                  ...el
                })
              }
            })
          })
        state.category = category
      })
    },
    SET_QUESTION: (state, question) => {
      state.question = question
    },
    SET_CORRECT: (state, answer) => {
      state.valueCorrect += answer
      state.correct.push(answer)
    },
    SET_INCORRECT: (state, answer) => {
      state.valueInCorrect -= answer
      state.incorrect.push(answer)
    },
    SET_VALUE_INPUT_NAME: (state, value) => {
      state.inputName = value
    },
    SET_START_GAME: (state, isGameStarted) => {
      state.isGameStarted = isGameStarted
    }
  }
})
export default store

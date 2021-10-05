<template>
<div class="modal-exit-wrapper" ref='modal-exit-wrapper'>
<div class="v-modal-exit">
  <div class="v-modal-exit-header">
    <span>Вы уверены, что хотите закончить игру?</span>
  </div>
  <div class="v-modal-exit-content">
    <div class="game_off">
        <q-btn color="secondary" label="Да" @click="overGame" />
    </div>
    <div class="game_on">
          <q-btn color="secondary" label="Нет" @click="continueGame" />
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'ModalExit',
  props: {},
  data () {
    return {}
  },
  methods: {
    overGame () {
      this.$router.push('/')
      localStorage.clear()
    },
    continueGame () {
      this.$emit('continueGame')
    }
  }
}

</script>

<style>
.modal-exit-wrapper{
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
.v-modal-exit{
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 470px;
    height: 250px;
    background: #ffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    z-index: 10;
}
.v-modal-exit-header{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 40px;
}
.v-modal-exit-content{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>

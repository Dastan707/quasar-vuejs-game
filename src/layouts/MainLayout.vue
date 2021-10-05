<template>
<div>
      <Login/>
</div>
</template>

<script>
// eslint-disable-next-line import/named
import { defineComponent } from 'vue'
import Login from '../pages/Login.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Login
  }
})
</script>

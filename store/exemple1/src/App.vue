<template>
  <div id="app">
    <counter></counter>
    <notifications></notifications>
  </div>
</template>

<script>

import Counter from './Counter.vue'
import store from './store/NotificationsStore'

let Counter2 = {
  data: function () {
    return {
      state : store.state
    }
  },
  computed:  {
      count: function () {
        return this.state.count
      }
  },
  methods : {
    increment : function () {
      store.decrement()
    }
  },
  template:`<button @click="increment"> 
   {{ count }}
  </button>`
}

let Notifications = {
  template:`<div> 
    <counter></counter>
    <button @click="addNotification">incrementer</button>
  </div>`,
  methods: {
    addNotification: function () {
      store.increment()
    }
  },
   components: { Counter,Counter2 }
}


export default {
  name: 'app',
  data () {
    return {
      notifications_count: 0
    }
  },
  components: {
    Notifications,
    Counter
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

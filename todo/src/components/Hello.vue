<template>
    <div>
  <section class="totoapp">
    <header class="header">
      <h1>Todos</h1>
       <input type="text" class="new-todo" palceholder="ajouter une tâche" v-model="newTodo" @keyup.enter="addTodo">
    </header>
    <div class="main">
      <input type="checkbox" class="toggle-all" v-model="allDone">
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :class="{completed: todo.completed, editing: todo === editing}">
          <div class="view">
            <input type="checkbox" v-model="todo.completed" class="toggle">
            <label @dblclick="editTodo(todo)" for="">{{ todo.name }}</label>
            <button class="destroy" @click="deleteTodo(todo)"></button>
          </div>
          <input type="text" class="edit" v-model="editingTodo" @keyup.esc="cancelEdit" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" v-focus="todo === editing">
        </li>
      </ul>
    </div>
    <footer class="footer">
      <span class="todo-count">{{ remainingTodosCount }} élements</span>
      <ul class="filters"> 
        <li><a href="" :class="{selected: filter === 'all'}"  @click.prevent="filter = 'all'">Toutes</a></li>
        <li><a href="" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
        <li><a href="" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
      </ul>
      <button class="clear-completed" v-show="completedTodosCount" @click.prevent="clearCompleted">effacer les tâches done</button>
    </footer>
  </section>
  </div>
</template>

<script>
import Vue from 'vue'

import store from './TodoStore'

import Vuex from 'vuex'

global.v = Vuex

export default {
  store: store,
  name: 'hello',
  data () {
    return {
      newTodo:'',
      filter:'all',
      editing:null,
      oldTodo:'',
      editingTodo:'',

    }
  },
  methods : {

    ...Vuex.mapActions({

        addTodoStore : 'addTodo',

        deleteTodo : 'deleteTodo',

        clearCompleted : 'clearCompleted',

        doneEditTodo : 'doneEdit'

      }),

    addTodo () {
      this.addTodoStore(this.newTodo)

      this.newTodo = ''
    },

    editTodo:function (todo) {
      this.editing = todo
      this.oldTodo = todo.name
      this.editingTodo = todo.name
    },

    doneEdit(todo) {
      this.doneEditTodo([this.editingTodo,todo])
      this.editing = false

    },
    cancelEdit: function () {
        this.editing.name = this.oldTodo
        this.doneEditTodo()
    }

  },
  computed : {

    // map getter important

    ...Vuex.mapGetters([
      'todos',

      'remainingTodosCount',

      'completedTodosCount',

      'remainingTodos',

      'completedTodos'

      ]),
    
    allDone: {
      get () {
          return this.remaining === 0
      },
      set (value) {
          
        this.todos.forEach(todo => {           
            todo.completed = value
        })
          
      }
    },
    filteredTodos () {

      if(this.filter === 'todo') {
          return this.remainingTodos

      } else if (this.filter === 'done') {
         return this.completedTodos

      }
      else {
          return this.todos
      }
    }

    

  },

  directives: {
      focus(el,value) {
        if(value) {
          Vue.nextTick(() => {
            el.focus()
          })
            
        }
      }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

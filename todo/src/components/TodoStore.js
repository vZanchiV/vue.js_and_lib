import Vuex from 'vuex'

const state = {
	todos: [{
		name: 'Notre première tâche',

		completed:true
	}]
}





const getters = {
	todos: state => state.todos,

	completedTodos: state => state.todos.filter(todo => todo.completed),

	remainingTodos: state => state.todos.filter(todo => !todo.completed),

	remainingTodosCount: state => getters.remainingTodos(state).length,

	completedTodosCount: state => getters.completedTodos(state).length
}


// take state and change

const mutations = {
	ADD_TODO: (state, name) => {
		state.todos.push ({
			name: name,
			completed:false
		})
	},
	DELETE_TODO: (state, todo) => {
		state.todos = state.todos.filter(i => i !== todo)
	},
	CLEAR_COMPLETED:(state, todo) => {
		state.todos = state.todos.filter(todo => !todo.completed)
	},
	DONE_EDIT:(state, params) => {
		var todo = params[1];
		var newname = params[0]

		todo.name = newname;
	}
}



// Action = function qui déclenche une mutation

const actions = {
	addTodo: (store,name) => {
		store.commit('ADD_TODO' ,name)
	},
	deleteTodo: (store,todo) => {
		
		store.commit('DELETE_TODO' ,todo)
	},
	clearCompleted: (store,todos) => {
	
		store.commit('CLEAR_COMPLETED' ,todos)
	},
	doneEdit:(store, params ) => {

		
		
		store.commit('DONE_EDIT' ,params)
	}


}



let store = new Vuex.Store( {
	state: state,

	// changement de state !!!  ex: store.commit('ADD_TODO','vivien ou gio')
	mutations: mutations,

	getters: getters,

	actions: actions,

	strict : true
})

global.store = store 

export default store

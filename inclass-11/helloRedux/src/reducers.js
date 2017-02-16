//
// Inclass Redux ToDo Exercise
// ============================
//
// Your task is to implement the reducer below.
//
// Start this exercise by running the dev server:
//    npm run dev
// then navigate to the page and open the devtools console.
// Try adding a new To Do item.  The console shows
// the previous state, the action, and the new state.
// 
// Your task is to implement the reducer to properly
// update the state.
//
// DO NOT USE MUTATION
// there should be NO assignment operators in your solution.
// 
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			// IMPLEMENT ME - done :)
			return {
				nextId: state.nextId + 1,
				todoItems: [...state.todoItems, {id: state.nextId, text: action.text, done: false}]
			}
		case 'REMOVE_TODO':
			//Maybe only do nextId: state.nextId - 1 if it's the last state?
			console.log("action.type:", action.type)
			console.log("action.id we want to remove", action.text)
			console.log("state.todoItems:", state.todoItems)
			console.log("state.nextId:", state.nextId)
			console.log("output: ", {
				nextId: state.nextId,
				todoItems: state.todoItems,
			})
			return {
				nextId: state.nextId,
				todoItems: state.todoItems.filter(todoItem => {
					return todoItem.id != action.id
				})
			}
		case 'TOGGLE_TODO':
			console.log("action.type:", action.type)
			console.log("action.id we want to flip", action.id)
			console.log("state.todoItems:", state.todoItems)
			console.log("state.nextId:", state.nextId)
			console.log("output: ", {
				nextId: state.nextId,
				todoItems: state.todoItems
			})
		default: 
			return state
	}
}

export default Reducer
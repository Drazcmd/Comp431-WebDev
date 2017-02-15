//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    render() { 
        console.log(this.state)
        console.log(this.props)
        console.log(this.props.text)
        //since we can't do this.props.key?
        console.log(this.props.id)
    return (
        //currently broken, need to fix
        <li id={this.props.id}>
            <i className="check glyphicon glyphicon-check" onClick={() => this.props.toggleDone()}></i>
            <span> {typeof(this.props.text) === "string" ? this.props.text : ""} </span>
            <i className="destroy glyphicon glyphicon-remove" onClick={() => this.props.remove()}> </i>
        </li>
        /*
        h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ])
        */
    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
        // This binding is necessary to make `this` work in the callback
        // See https://facebook.github.io/react/docs/handling-events.html
        this.addTodo = this.addTodo.bind(this)
        this.inputNode = null
    }

    addTodo() {
        //Two issues: 'this' wasn't bound, and we needed to be able
        //to access the input text field as if it was some element of 'this'.
        //We did the latter by using a magical ref thingy: the (node) => ... thing
        console.log(this.inputNode)
        console.log(this.inputNode.value)
        this.setState({ 
            todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text:this.inputNode.value}
            ]
        })
        console.log(this.state.todoItems)
    }

    removeTodo(removeId) {
        console.log("Not sure how to remove, but I'm calling removeTodo with id", removeId)
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    toggleDone(toggleId) {
        console.log("Not sure how to toggle, but I'm calling a toggle function with this id:", toggleId)
    }

    render() { return (
        <div>
            <input id="newTODO" type="text" placeholder="To Do" 
            ref={(node) => this.inputNode = node}
            />
            <button onClick={this.addTodo}>Add Item</button>
            <span className="submit">
                <a href="https://webdev-rice.herokuapp.com" target="_blank">
                Submit Your excercise!
                </a>
            </span>
            <ul className="todo">listItems </ul>
            <ul className="todo">
                <ToDoItem key={1} id={1} text="Test Item" remove={() => this.removeTodo(1)} toggleDone={()=> this.toggleDone(1)} />
            </ul>

            <ul className="todo">
                <ToDoItem key={1} id={1} text={988 /*blank if we're error ccking correctly*/} remove={() => this.removeTodo(1)} toggleDone={()=> this.toggleDone(1)} />
            </ul>
        </div>
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()

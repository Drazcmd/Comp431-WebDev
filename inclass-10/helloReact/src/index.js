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

    render() { return (
        //currently broken, need to fix
        <li id="task"> 
            <i className="check glyphicon glyphicon-check" > </i>
            <span contentEditable="return true" done="return false"></span>
            <i className="destroy glyphicon glyphicon-remove" > </i>
        }
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
        console.log(this.textNode)
        this.setState({ 
            todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text:this.inputNode.value}
            ]
        })
        this.render()
        console.log(this)
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    toggleDone(toggleId) {
        console.log(toggleId)
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
        </div>
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()

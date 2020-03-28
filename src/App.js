import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTodo from "./components/AddTodo.js";
import EditTodo from "./components/EditTodo.js";

function App() {
    const [todoState, setTodoState] = useState([]);
    const [editState, setEditState] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({
        id: "",
        task: ""
    });

    const addHandler = (newTodo) => {
        //console.log(newTodo);
        newTodo.values.id = todoState.length + 1;
        setTodoState([...todoState, newTodo.values]);
    };

    const editHandler = (todo) => {
        setEditState(true);

        setCurrentTodo({
            id: todo.id,
            task: todo.task
        });
    };

    const updateHandler = (updatedTodo) => {
        setEditState(false);

        setTodoState(
            todoState.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
        );
    };

    const deleteHandler = (todo) => {
        setTodoState(todoState.filter((todos) => todos.id !== todo.id));
    };

    return (
        <div className="App">
            <h4>Todos</h4>
            {todoState.map((todo, i) => {
                return (
                    <li key={i}>
                        {todo.id}. {todo.task}{" "}
                        <button
                            color="info"
                            onClick={() => {
                                editHandler(todo);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            color="delete"
                            onClick={() => {
                                deleteHandler(todo);
                            }}
                        >
                            Delete
                        </button>
                    </li>
                );
            })}

            {editState ? (
                <div>
                    <EditTodo
                        editState={editState}
                        currentTodo={currentTodo}
                        updateTodo={updateHandler}
                    />
                </div>
            ) : (
                <div>
                    <AddTodo addTodo={addHandler} />
                </div>
            )}
        </div>
    );
}

export default App;

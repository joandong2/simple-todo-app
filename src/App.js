import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTodo from "./components/AddTodo.js";
import EditTodo from "./components/EditTodo.js";
import { Container, Row, Col, Button, Table } from "reactstrap";

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

    const completeHandler = (id) => {
        document.getElementById(id).classList.toggle("complete");
    };

    return (
        <Container>
            <div className="App">
                <Row>
                    <Col md="7">
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
                    </Col>
                    <Col md="12">
                        <h4>Todos</h4>
                        <Table hover>
                            <thead>
                                <tr id="0">
                                    <th>Task</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todoState.map((todo, i) => {
                                    return (
                                        <tr key={i} id={todo.id}>
                                            <td>{todo.task}</td>
                                            <td>
                                                <Button
                                                    color="success"
                                                    onClick={() => {
                                                        completeHandler(
                                                            todo.id
                                                        );
                                                    }}
                                                >
                                                    Complete
                                                </Button>
                                                <Button
                                                    color="warning"
                                                    onClick={() => {
                                                        editHandler(todo);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    onClick={() => {
                                                        deleteHandler(todo);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default App;

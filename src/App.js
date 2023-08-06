import { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';

export default function App() {
	const [todos, setTodos] = useState([]);
	const [completedTodos, setCompletedTodos] = useState([]);
	const [newTodo, setNewTodo] = useState({
		title: '',
		completed: false
	});

	//createTodos
	const createTodo = async () => {
		const body = { ...newTodo };
		try {
			const response = await fetch('/api/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body) // req.body -> string version of the `todo` we created
			});
			const createdTodo = await response.json(); // turns the response we get back to a JS Object we can work with
			const todosCopy = [createdTodo, ...todos]; // add `createdTodo` to ...todos is the current list of todos (state)
			setTodos(todosCopy); // <-- set new state
			setNewTodo({
				title: '',
				completed: false
			});
		} catch (error) {
			console.error(error);
		}
	};
	//deleteTodos
	const deleteTodo = async (id) => {
		try {
			const index = completedTodos.findIndex((todo) => todo._id === id);
			const completedTodosCopy = [...completedTodos];
			const response = await fetch(`/api/todos/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			await response.json();
			completedTodosCopy.splice(index, 1);
			setCompletedTodos(completedTodosCopy);
		} catch (error) {
			console.error(error);
		}
	};
	//moveToCompleted
	const moveToCompleted = async (id) => {
		try {
			const index = todos.findIndex((todo) => todo._id === id);
			const todosCopy = [...todos];
			const subject = todosCopy[index];
			subject.completed = true;
			const response = await fetch(`/api/todos/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(subject)
			});
			const updatedTodo = await response.json();
			const completedTDsCopy = [updatedTodo, ...completedTodos];
			setCompletedTodos(completedTDsCopy);
			todosCopy.splice(index, 1);
			setTodos(todosCopy);
		} catch (error) {
			console.error(error);
		}
	};
	//getTodos
	const getTodos = async () => {
		try {
			const response = await fetch('/api/todos');
			/*
                fetch uses `GET` request by default,
                and it does not require data
                -----
                that's why theres no
                - method
                - headers
                - body
             */
			const foundTodos = await response.json();
			setTodos(foundTodos.reverse()); // reverse so newest one is on top
			const responseTwo = await fetch('/api/todos/completed');
			const foundCompletedTodos = await responseTwo.json();
			setCompletedTodos(foundCompletedTodos.reverse());
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getTodos();
	}, []);
	return (
		<>
			<TodoList
				newTodo={newTodo}
				setNewTodo={setNewTodo}
				createTodo={createTodo}
				todos={todos}
				moveToCompleted={moveToCompleted}
				completedTodos={completedTodos}
				deleteTodo={deleteTodo}
			/>
		</>
	);
}

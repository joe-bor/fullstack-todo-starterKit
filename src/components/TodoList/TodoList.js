import './TodoList.module.scss';
import Todo from '../Todo/Todo';

export default function TodoList({
	newTodo,
	createTodo,
	setNewTodo,
	todos,
	completedTodos,
	moveToCompleted,
	deleteTodo
}) {
	// console.log(`styles: ${styles}`);
	return (
		<div className={'todoList'}>
			Add New Todo:
			<input
				className={'input'}
				type="text"
				value={newTodo.title}
				onChange={(e) => {
					setNewTodo({ ...newTodo, title: e.target.value });
				}}
				onKeyDown={(e) => {
					e.key === 'Enter' && createTodo();
				}}
			/>
			<h3>Todos</h3>
			{todos.map((todo) => (
				<Todo
					key={todo._id}
					todo={todo}
					buttonAction={moveToCompleted}
					buttonText={'Complete'}
				/>
			))}
			<h3>Completed Todos</h3>
			{completedTodos.map((todo) => (
				<Todo
					key={todo._id}
					todo={todo}
					buttonAction={deleteTodo}
					buttonText={'Delete'}
				/>
			))}
		</div>
	);
}

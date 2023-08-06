import './Todo.module.scss';

export default function Todo({ todo, buttonAction, buttonText }) {
	return (
		<div className={'todo'}>
			{todo.title}
			<button className={'button'} onClick={() => buttonAction(todo._id)}>
				{buttonText}
			</button>
		</div>
	);
}

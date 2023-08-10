const Todo = require('../../models/todo');

module.exports = {
	create,
	indexComplete,
	indexNotComplete,
	show,
	update,
	destroy,
	jsonTodos,
	jsonTodo
};

// viewControllers
function jsonTodo(_, res) {
	res.json(res.locals.data.todo);
}

function jsonTodos(_, res) {
	res.json(res.locals.data.todos);
}

// create
async function create(req, res, next) {
	try {
		const todo = await Todo.create(req.body);
		res.locals.data.todo = todo;
		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

// read
async function indexComplete(req, res, next) {
	try {
		const todos = await Todo.find({ completed: true });
		res.locals.data.todos = todos;
		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function indexNotComplete(req, res, next) {
	try {
		const todos = await Todo.find({ completed: false });
		res.locals.data.todos = todos;
		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function show(req, res, next) {
	try {
		const todo = await Todo.findById(req.params.id);
		res.locals.data.todo = todo;
		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

// update
async function update(req, res, next) {
	try {
		const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});
		res.locals.data.todo = todo;
		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

// destroy
async function destroy(req, res, next) {
	try {
		const todo = await Todo.findByIdAndDelete(req.params.id);
		res.locals.data.todo = todo;
		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

const { Schema, model } = require('mongoose');

const todoSchema = new Schema(
	{
		title: { required: true, type: String },
		completed: { required: true, type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const Todo = model('Todo', todoSchema);

module.exports = Todo;

import React, { useState } from 'react';

const AddTodo = ({ updateTodos }) => {
	const [task, setTask] = useState('');
	const [notes, setNotes] = useState('');

	const handleSubmit = async () => {
		const res = await fetch(`http://localhost:3000/api/todos`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				task,
				notes,
				status: 'incomplete',
			}),
		});
		const newTask = await res.json();

		updateTodos(newTask.newTask);
		setTask('');
		setNotes('');
	};
	return (
		<div>
			<input
				value={task}
				onChange={(e) => setTask(e.target.value)}
				type="text"
			/>
			<input
				value={notes}
				onChange={(e) => setNotes(e.target.value)}
				type="text"
			/>
			<button onClick={handleSubmit}>Add</button>
		</div>
	);
};

export default AddTodo;

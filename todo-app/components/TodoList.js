import React from 'react';
import TodoItem from './ToDoItem';
import styles from '../styles/Home.module.css';

const TodoList = ({ todos, handleDelete }) => {
	return (
		<div>
			{todos.map((todo) => {
				return (
					<TodoItem handleDelete={handleDelete} todo={todo} key={todo._id} />
				);
			})}
		</div>
	);
};

export default TodoList;

import React from 'react';
import TodoItem from './ToDoItem';
import styles from '../styles/Home.module.css';

const TodoList = ({ todos }) => {
	return (
		<div>
			{todos.map((todo) => {
				return <TodoItem todo={todo} key={todo._id} />;
			})}
		</div>
	);
};

export default TodoList;

import React from 'react';
import styles from '../styles/Home.module.css';

const ToDoItem = ({ todo }) => {
	return (
		<div>
			<a href="/todo/:id" className={styles.card}>
				<h2>{todo.task}</h2>
			</a>
		</div>
	);
};

export default ToDoItem;

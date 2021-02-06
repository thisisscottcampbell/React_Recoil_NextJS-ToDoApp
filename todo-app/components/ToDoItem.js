import React from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const ToDoItem = ({ todo, handleDelete }) => {
	const handleClick = () => {
		handleDelete(todo);
	};

	return (
		<div className={styles.card}>
			<Link href={`/todo/${todo._id}`}>
				<a>
					<h2>{todo.task}</h2>
				</a>
			</Link>
			<button onClick={handleClick}>delete</button>
		</div>
	);
};

export default ToDoItem;

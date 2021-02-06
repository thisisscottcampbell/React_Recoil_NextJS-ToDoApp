import React from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const ToDoItem = ({ todo }) => {
	return (
		<Link href={`/todo/${todo._id}`}>
			<a className={styles.card}>
				<h2>{todo.task}</h2>
			</a>
		</Link>
	);
};

export default ToDoItem;

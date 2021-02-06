import React, { useState } from 'react';
import Head from 'next/head';
import TodoList from '../components/ToDoList';
import AddTodo from '../components/AddTodo';
import styles from '../styles/Home.module.css';

const Home = ({ todos }) => {
	const [newTodos, setNewTodos] = useState(
		todos.tasks.length > 0 ? todos.tasks : []
	);

	const handleDelete = async (task) => {
		console.log('i am task', task);
		const res = await fetch(`http://localhost:3000/api/todos/${task._id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
		});
		const deleteTask = await res.json();

		const todoList = newTodos.filter(
			(todo) => todo._id !== deleteTask.deletedTask._id
		);

		setNewTodos(todoList);
	};

	const updateTodos = (task) => {
		setNewTodos([...newTodos, task[0]]);
		console.log(newTodos);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>To Do App</title>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Your To DO List</h1>
				<AddTodo updateTodos={updateTodos} />
				<div className={styles.grid}>
					<TodoList handleDelete={handleDelete} todos={newTodos} />
				</div>
			</main>
		</div>
	);
};

export const getStaticProps = async () => {
	const res = await fetch(`http://localhost:3000/api/todos`);
	const todos = await res.json();

	return {
		props: {
			todos,
		},
	};
};

export default Home;

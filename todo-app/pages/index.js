import React, { useEffect } from 'react';
import Head from 'next/head';
import TodoList from '../components/ToDoList';
import AddTodo from '../components/AddTodo';
import styles from '../styles/Home.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoState, backendSelector } from '../state/states';

const Home = ({ todos }) => {
	const [newTodos, setNewTodos] = useRecoilState(todoState);

	const currState = useRecoilValue(todoState);

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
		console.log('curr state', currState);
		const updateState = [...currState, task[0]];
		setNewTodos(updateState);
		console.log('newTodos', newTodos);
	};

	useEffect(() => {
		setNewTodos(todos.tasks);
	}, []);

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

	//const todos = useRecoilState(backendSelector);

	return {
		props: {
			todos,
		},
	};
};

export default Home;

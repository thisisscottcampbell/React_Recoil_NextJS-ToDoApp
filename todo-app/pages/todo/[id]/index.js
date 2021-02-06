import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';

const TodoDetail = ({ todo }) => {
	console.log(todo);
	return (
		<div className={styles.card}>
			<h1>{todo.task}</h1>
			<p>{todo.notes}</p>
			<h5>{todo.status}</h5>
			<br />
			<br />
			<Link href="/">
				<button>Go Back</button>
			</Link>
		</div>
	);
};

export const getStaticProps = async (context) => {
	const res = await fetch(
		`http://localhost:3000/api/todos/${context.params.id}`
	);

	const todo = await res.json();

	return {
		props: {
			todo: todo.task,
		},
	};
};

export const getStaticPaths = async () => {
	const res = await fetch(`http://localhost:3000/api/todos`);
	const todos = await res.json();

	const ids = todos.tasks.map((todo) => todo._id);
	console.log(ids);
	const paths = ids.map((id) => ({ params: { id: id.toString() } }));

	return {
		paths,
		fallback: false,
	};
};

export default TodoDetail;

import { useRouter } from 'next/router';
import Link from 'next/link';

const TodoDetail = ({ todo }) => {
	return (
		<div>
			<h1>{todo.task}</h1>
			<br />
			<br />
			<Link href="/">Go Back</Link>
		</div>
	);
};

export const getStaticProps = async (context) => {
	console.log(context.params.id);
	const res = await fetch(
		`http://localhost:3000/api/todos/${context.params.id}`
	);

	const todo = await res.json();

	return {
		props: {
			todo,
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

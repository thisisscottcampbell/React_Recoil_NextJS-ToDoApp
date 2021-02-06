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
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${context.params.id}`
	);

	const article = await res.json();

	return {
		props: {
			article,
		},
	};
};

export const getStaticPaths = async () => {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
	const todos = await res.json();

	const ids = todos.map((todo) => todo._id);

	const paths = ids.map((id) => ({ params: { id: id.toString() } }));

	return {
		paths,
		fallback: false,
	};
};

export default TodoDetail;

const pgp = require('pg-promise')({
	noWarnings: true,
});

const db = pgp(
	`postgres://cxwaixqo:cFFfSD6nop9mBlsY4sgisshI2mze9A6p@ziggy.db.elephantsql.com:5432/cxwaixqo`
);

export default async (req, res) => {
	const { todoId } = req.query;

	if (req.method === 'GET') {
		try {
			const query = 'SELECT * FROM tasks WHERE _id = $1';
			const task = await db.query(query, [Number(todoId)]);

			res.status(200).json({ task: task[0] });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Internal Server Error', error: `${error}` });
		}
	} else if (req.method === 'DELETE') {
		console.log('req.query', req.query);
		try {
			const deleteQuery = 'DELETE FROM tasks WHERE _id = $1 RETURNING *';
			const deletedTask = await db.query(deleteQuery, [Number(todoId)]);

			res
				.status(200)
				.json({ message: 'Task was deleted', deletedTask: deletedTask[0] });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Internal Server Error', error: `${error}` });
		}
	}
};

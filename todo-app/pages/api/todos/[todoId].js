const pgp = require('pg-promise')({
	noWarnings: true,
});

const db = pgp(
	`postgres://cxwaixqo:cFFfSD6nop9mBlsY4sgisshI2mze9A6p@ziggy.db.elephantsql.com:5432/cxwaixqo`
);

export default async (req, res) => {
	try {
		console.log('req.query', req.query);
		const { todoId } = req.query;
		const query = 'SELECT * FROM tasks WHERE _id = $1';

		const task = await db.query(query, [Number(todoId)]);
		console.log(task);

		res.status(200).json({ task: task[0] });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Internal Server Error', error: `${error}` });
	}
};

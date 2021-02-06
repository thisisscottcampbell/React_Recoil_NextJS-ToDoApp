// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const pgp = require('pg-promise')({
	noWarnings: true,
});

const db = pgp(
	`postgres://cxwaixqo:cFFfSD6nop9mBlsY4sgisshI2mze9A6p@ziggy.db.elephantsql.com:5432/cxwaixqo`
);

export default async (req, res) => {
	if (req.method === 'GET') {
		try {
			const query = 'SELECT * FROM tasks';
			const tasks = await db.query(query);
			res.status(200).json({ tasks });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Internal Server Error', error: `${error}` });
		}
	} else if (req.method === 'POST') {
		try {
			const { task, status, notes } = req.body;

			const query =
				'INSERT INTO tasks (task, status, notes) VALUES ($1,$2,$3) returning *';
			const newTask = await db.query(query, [task, status, notes]);

			res.status(200).json({ newTask });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Internal Server Error', error: `${error}` });
		}
	}
};

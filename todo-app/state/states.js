const { atom, selector } = require('recoil');

const todoState = atom({
	key: 'todoState',
	default: [],
});

const taskState = atom({
	key: 'taskState',
	default: '',
});

const notesState = atom({
	key: 'notesState',
	default: '',
});

const backendSelector = selector({
	key: 'backendSelector',
	get: async ({ get }) => {
		get(todoState);
		const res = await fetch(`http://localhost:3000/api/todos`);
		const todos = await res.json();
		return todos;
	},
	set: ({ set }, values) => {
		return set(todoState, todos.tasks);
	},
});

export { todoState, taskState, notesState, backendSelector };

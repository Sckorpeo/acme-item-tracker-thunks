import axios from 'axios';

const loadData = () => {
	return async (dispatch) => {
		const responses = await Promise.all([
			axios.get('/api/users'),
			axios.get('/api/things'),
		]);
		dispatch({ type: 'SET_USERS', users: responses[0].data });
		dispatch({ type: 'SET_THINGS', things: responses[1].data });
	}
}

const updateThing = (thing) => {
	return async (dispatch) => {
		thing = (await axios.put(`/api/things/${thing.id}`, thing)).data;
		dispatch({ type: 'UPDATE_THING', thing });
	};
};

const deleteThing = (thing) => {
	return async (dispatch) => {
		await axios.delete(`/api/things/${thing.id}`);
		dispatch({ type: 'DELETE_THING', thing });
	};
};

const deleteUser = (user) => {
	return async (dispatch) => {
		await axios.delete(`/api/users/${user.id}`);
		dispatch({ type: 'DELETE_USER', user });
	}
}

const createUser = () => {
	return async (dispatch) => {
		const user = (await axios.post('/api/users', { name: Math.random() })).data;
		dispatch({ type: 'CREATE_USER', user });
	}
}

const removeThingFromUser = (thing) => {
	return async (dispatch) => {
		thing = { ...thing, userId: null }
		const updatedThing = (await axios.put(`/api/things/${thing.id}`, thing)).data
		dispatch({ type: 'UPDATE_THING', thing: updatedThing });
	}
}

const updateUser = (user) => {
	return async (dispatch) => {
		user = (await axios.put(`/api/users/${user.id}`, user)).data;
		dispatch({ type: 'UPDATE_USER', user });
	};
};

export {
	loadData,
	deleteThing,
	updateThing,
	deleteUser,
	createUser,
	removeThingFromUser,
	updateUser
}
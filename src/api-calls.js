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

export {
	loadData
}
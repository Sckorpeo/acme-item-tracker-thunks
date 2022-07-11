import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const viewReducer = (state = window.location.hash.slice(1), action) => {
	if (action.type === 'SET_VIEW') {
		return action.view;
	}
	return state;
};

const usersReducer = (state = [], action) => {
	if (action.type === 'DELETE_USER') {
		return state.filter(user => user.id !== action.user.id)
	}
	if (action.type === 'SET_USERS') {
		return action.users;
	}
	if (action.type === 'CREATE_USER') {
		return [...state, action.user];
	}
	if (action.type === 'UPDATE_USER') {
		return state.map(user => user.id === action.user.id ? action.user : user);
	}
	return state;
};

const thingsReducer = (state = [], action) => {
	if (action.type === 'DELETE_THING') {
		return state.filter(thing => thing.id !== action.thing.id);
	}
	if (action.type === 'UPDATE_THING') {
		return state.map(thing => thing.id !== action.thing.id ? thing : action.thing);
	}
	if (action.type === 'SET_THINGS') {
		return action.things;
	}
	if (action.type === 'CREATE_THING') {
		return [...state, action.thing];
	}
	return state;
};

const reducer = combineReducers({
	users: usersReducer,
	things: thingsReducer,
	view: viewReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;


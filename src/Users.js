import React from 'react';
import { connect } from 'react-redux';

import { deleteUser, createUser, removeThingFromUser, updateUser } from './api-calls-thunks';

const Users = ({ users, createUser, deleteUser, things, removeThingFromUser, inc }) => {
	return (
		<div>
			<h1>Users</h1>
			<button onClick={createUser}>+</button>
			<ul>
				{
					users.map(user => {
						return (
							<li key={user.id}>
								{user.name} ({user.ranking})
								<button onClick={() => inc(user, 1)}>+</button>
								<button onClick={() => inc(user, -1)}>-</button>
								<button onClick={() => deleteUser(user)}>x</button>
								<ul>
									{
										things.filter(thing => thing.userId === user.id)
											.map(thing => {
												return (
													<li key={thing.id}>
														{thing.name} ({thing.ranking})
														<button onClick={() => removeThingFromUser(thing)}>x</button>
													</li>
												);
											})

									}
								</ul>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		users: state.users,
		things: state.things
	};
}

const mapDispatch = (dispatch) => {
	return {
		createUser: () => {
			dispatch(createUser());
		},
		removeThingFromUser: (thing) => {
			dispatch(removeThingFromUser(thing));
		},
		deleteUser: (user) => {
			dispatch(deleteUser(user));
		},
		inc: (user, dir) => {
			user = { ...user, ranking: user.ranking + dir };
			dispatch(updateUser(user));
		}
	};
}

export default connect(mapStateToProps, mapDispatch)(Users);

import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import { deleteThing, updateThing } from './api-calls-thunks';


const Things = ({ things, users, deleteThing, increment, updateThing, hashMap = {} }) => {
    // Create a hash map to track the number of things a user owns.
    things.forEach(thing => {
        if (!hashMap[thing.userId]) {
            hashMap[thing.userId] = 1
        }
        else if (hashMap[thing.userId]) {
            hashMap[thing.userId] += 1;
        }
    });
    return (
        <div>
            <h1>Things</h1>
            <ul>
                {
                    things.map(thing => {
                        const user = users.find(user => user.id === thing.userId) || {};

                        return (
                            <li key={thing.id}>
                                {thing.name} ({thing.ranking})
                                owned by {user.name || 'nobody'}
                                <div>
                                    <select defaultValue={thing.userId} onChange={ev => updateThing(thing, ev.target.value)}>
                                        <option value='null'>-- nobody --</option>
                                        {
                                            users.map(user => {

                                                if (hashMap[user.id] < 3 || !hashMap[user.id] || user.id === thing.userId) {
                                                    return (
                                                        <option key={user.id} value={user.id}>{user.name}</option>
                                                    );
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                                <button onClick={() => deleteThing(thing)}>x</button>
                                <button onClick={() => increment(thing, -1)}>-</button>
                                <button onClick={() => increment(thing, 1)}>+</button>

                            </li>
                        );
                    })
                }
            </ul>
            <ThingForm />
        </div>
    );
};

export default connect(
    (state) => {
        return {
            things: state.things,
            users: state.users
        }
    },
    (dispatch) => {
        return {
            updateThing: (thing, userId) => {
                thing = { ...thing, userId: userId * 1 };
                dispatch(updateThing(thing));
            },
            increment: (thing, dir) => {
                thing = { ...thing, ranking: thing.ranking + dir };
                dispatch(updateThing(thing));
            },
            deleteThing: (thing) => {
                dispatch(deleteThing(thing));
            }
        };

    }
)(Things);

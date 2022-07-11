// External Module Imports
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, connect } from 'react-redux';

// Component Imports
import Nav from './Nav';
import Users from './Users';
import Things from './Things';
import Home from './Home';

// Internal Imports
import store from './store';
import { loadData } from './api-calls-thunks';


class _App extends Component {
	async componentDidMount() {
		window.addEventListener('hashchange', () => {
			this.props.setView(window.location.hash.slice(1));
		});
		try {
			this.props.loadData();
		}
		catch (ex) {
			console.log(ex);
		}
	}
	render() {
		const { view } = this.props;
		return (
			<div>
				<Nav />
				{
					view === '' ? <Home /> : null

				}
				{
					view === 'users' ? <Users /> : null

				}
				{
					view === 'things' ? <Things /> : null

				}
			</div>
		);
	}
}


const mapDispatch = (dispatch) => {
	return {
		setView: (view) => {
			dispatch({ type: 'SET_VIEW', view });
		},
		loadData: () => {
			dispatch(loadData());
		}
	};
};
const mapStateToProps = state => {
	return {
		view: state.view
	};
};

const App = connect(mapStateToProps, mapDispatch)(_App);
const root = createRoot(document.querySelector('#app'));
root.render(<Provider store={store}><App /></Provider>);


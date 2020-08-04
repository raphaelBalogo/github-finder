import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/Pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
	//------------------------------------------------------------------------------------------------------//
	//State

	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	};

	//------------------------------------------------------------------------------------------------------//
	//Methods

	async componentDidMount() {
		//To change component state, must call function below
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({
			users: res.data,
			loading: false,
		});
	}

	//Search users from github
	searchUsers = async text => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({
			users: res.data.items,
			loading: false,
		});
	};

	//Get user profile details
	getUser = async username => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({
			user: res.data,
			loading: false,
		});
	};

	//Get user repos
	getUserRepos = async username => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({
			repos: res.data,
			loading: false,
		});
	};

	//Set alert if search is empty
	setAlert = (message, type) => {
		this.setState({
			alert: {
				message: message,
				type: type,
			},
		});

		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	//Clear users from state
	clearUsers = e => this.setState({ users: [], loading: false });

	//------------------------------------------------------------------------------------------------------//
	//Render
	render() {
		const { users, loading, alert, user, repos } = this.state;
		const { searchUsers, clearUsers, setAlert, getUser, getUserRepos } = this;

		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Fragment>
										<Search
											searchUsers={searchUsers}
											setAlert={setAlert}
											clearUsers={clearUsers}
											showClear={users.length > 0 ? true : false}
										/>

										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exatc path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={props => (
									<User
										{...props}
										getUser={getUser}
										getUserRepos={getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

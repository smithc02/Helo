import React, { Component } from 'react';
import axios from 'axios';

export class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	componentDidUpdate(){
		
	}

	handleSubmit = (username, password) => {
		axios.post('/api/login', { username, password });
	};
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						name="username"
						type="username"
						placeholder="username"
						onChange={e => this.handleChange(e)}
					/>
					<input
						name="password"
						type="password"
						placeholder="password"
						onChange={e => this.handleChange(e)}
					/>
					<input
						className="login-button"
						type="submit"
						value="login"
					/>
				</form>
			</div>
		);
	}
}

export default Auth;

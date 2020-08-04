import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
	state = {
		text: '',
	};

	onSubmit = e => {
		e.preventDefault();

		if (this.state.text === '') {
			this.props.setAlert('Please type something', 'light');
		} else {
			this.props.searchUsers(this.state.text);
			this.setState({ text: '' });
		}
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { clearUsers, showClear } = this.props;
		const { text } = this.state;

		return (
			<form onSubmit={this.onSubmit} className='form'>
				<input
					type='text'
					name='text'
					placeholder='Search users...'
					value={text}
					onChange={this.onChange}
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
				{showClear && (
					<input
						type='button'
						value='Clear'
						className='btn btn-light btn-block'
						onClick={clearUsers}
					/>
				)}
			</form>
		);
	}
}

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default Search;

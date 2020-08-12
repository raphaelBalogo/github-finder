import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const [text, setText] = useState('');
	const { setAlert } = alertContext;

	const onSubmit = e => {
		e.preventDefault();

		if (text === '') {
			setAlert('Please type something', 'light');
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	const onChange = e => setText(e.target.value);

	return (
		<form onSubmit={onSubmit} className='form'>
			<input
				type='text'
				name='text'
				placeholder='Search users...'
				value={text}
				onChange={onChange}
			/>
			<input type='submit' value='Search' className='btn btn-dark btn-block' />
			{githubContext.users.length > 0 && (
				<input
					type='button'
					value='Clear'
					className='btn btn-light btn-block'
					onClick={githubContext.clearUsers}
				/>
			)}
		</form>
	);
};

export default Search;

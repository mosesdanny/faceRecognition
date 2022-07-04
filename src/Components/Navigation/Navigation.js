import React from 'react';


const Navigation = ({ onRouteChange, isSignedIn }) => {

	if (isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer'
					onClick={() => onRouteChange('signin')}>
					Sign out
				</p>
			</nav>
		) // return
	} // if isSignedIn
	else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer'
					onClick={() => onRouteChange('signout')}>
					Sign In
				</p>
				<p className='f3 link dim black underline pa3 pointer'
					onClick={() => onRouteChange('register')}>
					Register
				</p>
			</nav>
		) // return
	} // if not isSignedIn

	/*
		Font size: f3
		Font color: black
		Font effect: underline
		Text justify to the right: tr
		Text a little padded from the right: pr3
		When hovering dim text: dim
		when hovering set cursor to a pointer: pointer
	 */
} // Navigation(()

export default Navigation ;
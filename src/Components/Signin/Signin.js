import React from 'react';

class Signin extends React.Component {

	  // constuctor()
	constructor(props){
		super(props);
		
		  // state information for Signin
		this.state = {
			signInEmail: '',	// The user's email
			signInPassword: ''	// The user's password
		} // state information of Signin
	} //Signin's constructor
	
	  // 
	  // Methods for storing user input
	  //
	
	  // onEmailChange - invoked whenever a user clicks an email
	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	} // onEmailChange
	  
	  // onPasswordChanged - invoked whenever a user clicks a password
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	} // onPasswordChanged
	  
	  // onSubmitSignin - invoked whenever the user clicks 'sign in'
	onSubmitSignIn() {
		  // Generate an HTTP POST and check the response 
		fetch('http://localhost:3000/signin', 
			  {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				}, // header attributes
				body: JSON.stringify( 
					{
						email: this.state.signInEmail,
						password: this.state.signInPassword
					}  // json info in body
				) // JSON.stringify
			  } // fetch attributes`
		 ) // fetch
		 .then(response => {
			 if (response.ok) {
				 return response.json()
			 } //if response.ok
			 else throw(response)
		 }) // .then response =>
		 .then(data => {
			 this.props.setUserProfile(data);
			 this.props.onRouteChange('signout');
		 }) // .then data=>
		 .catch ((error) => {
			 console.log('Error in signin:');
			 console.log('HTTP response status: ', error.status);
			 console.log('HTTP response text ', error.text);
		 }) // .catch

	} // onSubmitRegister
	  
	  //render()
	render() {
		const { onRouteChange, setUserProfile } = this.props; 	// distructure props
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					  <legend 
						className="f1 fw6 ph0 mh0">
						Sign In
					  </legend>
					  <div className="mt3">
						<label 
							className="db fw6 lh-copy f6" 
							htmlFor="email-address">
							Email
						</label>
						<input 
							onChange={this.onEmailChange}
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="email" 
							name="email-address"  
							id="email-address" />
					  </div>
					  <div className="mv3">
						<label 
							className="db fw6 lh-copy f6" 
							htmlFor="password">
							Password
						</label>
						<input 
							onChange={this.onPasswordChange}
							className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="password" 
							name="password"  
							id="password" />
					  </div>
					</fieldset>
					<div className="">
					  <input 
						onClick={() => this.onSubmitSignIn()}
						className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						type="submit" 
						value="Sign in" />
					</div>
					<div className="lh-copy mt3">
					  <p 
						className="f6 link dim black db pointer"
						onClick={() => onRouteChange('register')}>
						Register</p>
					</div>
				  </div>
				</main>
			</article>
		); // return
	} // render() of component Signin
} // class Signin

export default Signin ;
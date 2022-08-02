import React from 'react';

class Register extends React.Component {
	  // constuctor()
	constructor(props){
		super(props);
		
		  // state information for Register
		this.state = {
			registerEmail: '',		// The user's email
			registerPassword: '',	// The user's password
			registerName: ''		//The user's name
		} // state information of Register
	} // Register's constructor
	
	  // 
	  // Methods for storing user input
	  //
	
	  // onEmailChange - invoked whenever a user clicks an email
	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	} // onEmailChange
	  
	  // onPasswordChanged - invoked whenever a user clicks a password
	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	} // onPasswordChanged
	  
	  // onNameChanged - invoked whenever a user clicks a name
	onNameChange = (event) => {
		this.setState({registerName: event.target.value});
	} // onNameChanged
	  
	  // onSubmitRegister - invoked whenever the user clicks 'register'
	onSubmitRegister() {
	
		  // Generate an HTTP POST  
		fetch('http://localhost:3000/register', 
			  {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				}, // header attributes
				body: JSON.stringify( 
					{
						email: this.state.registerEmail,
						password: this.state.registerPassword,
						name: this.state.registerName
					}  // json info in body
				) // JSON.stringify
			  } // fetch attributes`
		 ) // fetch

		this.props.onRouteChange('signout');
	} // onSubmitSignIn
	  
	  //render()
	render() {
		const { onRouteChange } = this.props; 	// distructure props
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
					<fieldset id="register" className="ba b--transparent ph0 mh0">
					  <legend 
						className="f1 fw6 ph0 mh0">
						Register
					  </legend>
					  <div className="mt3">
						<label 
							className="db fw6 lh-copy f6" 
							htmlFor="name">
							Name
						</label>
						<input 
							onChange={this.onNameChange}
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="text" 
							name="name"  
							id="name" />
					  </div>
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
						onClick={() => this.onSubmitRegister()}
						className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						type="submit" 
						value="Register" />
					</div>
				  </div>
				</main>
			</article>
		); // return
	} // render() of component Register
} // class Register

export default Register ;
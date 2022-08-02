import React, {Component} from 'react';
import Clarifai from 'clarifai';
import './App.css';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';


//console.log("Clarifai models id:", Clarifai);
//console.log("Use the FACE_DETECT_MODEL");		
		// Clarifai model id: "a403429f2ddf4b49b307e318f00e528b"
		// my userID: 613ulr1cu0p7
		// my-first-application-all-scopes key: "0dbd7673d482454b9b16f1f551194586"
		// Clarifai API key: "df5d30650ff04b50b1c1284cbeea5cd0"
		
		
	// Instantiate a clarifai app object

const app = new Clarifai.App({
		apiKey: 'df5d30650ff04b50b1c1284cbeea5cd0'	// this is the Clarifai API key.
}); //app
	
class App extends Component {
	constructor () {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			userProfile: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			} //userProfile
		} // this.state
	} // constructor
	

	componentDidUpdate() {
		console.log('componentDidUpdate');
		console.log('------------------');
		console.log('User profile:');
		console.log(this.state.userProfile);
	} //componentDidUpdate
	
	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
										//the bounding box object provided by clarifai API
		const image = document.getElementById('inputImage') ;
										// Grab the element containing the image from the dom
		const width = Number(image.width) ;
										// The actual wdth of the image
		const height = Number(image.height) ;
										// The actual height of the image
		
		   // Return an object that defines the actual place of the 4 box lines
		   // By using the percentage values provided by the clarifai API
		return {
			leftCol: width * clarifaiFace.left_col,
			topRow: height * clarifaiFace.top_row,
			rightCol: width - (width * clarifaiFace.right_col),
			bottomRow: height - (height * clarifaiFace.bottom_row)
		} // returned object
	} // calculateFaceLocation
	
	displayFaceBox = (box) => {
		this.setState({box: box});
	} // displayFaceBox

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	} // onInputChange()
	
	onRouteChange = (newRoute) => {
		if (newRoute==='signout') {
			this.setState({isSignedIn: true})
		} // if Sign Out was clicked
		else {
			this.setState({isSignedIn: false})
		} // if Register or Sign In was clicked
		this.setState({route: newRoute});
	} // onRouteChange()
	
	onButtonSubmit = (event) => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => {
				if (response) {
					fetch('http://localhost:3000/image', 
					  {
						method: 'put',
						headers: {
							'Content-Type': 'application/json'
						}, // header attributes
						body: JSON.stringify( 
							{
								id: this.state.userProfile.id
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
						 this.setState(
							Object.assign(this.state.userProfile, 
							{entries: data}));
						 this.props.onRouteChange('signout');
					 }) // .then data=>
					 .catch ((error) => {
						 console.log('Error in signin:');
						 console.log('HTTP response status: ', error.status);
						 console.log('HTTP response text ', error.text);
					 }) // .catch

				} // if a response exists
				this.displayFaceBox(this.calculateFaceLocation(response))
			}) // .then response
			.catch(err => console.log(err));
	} // onButtonSubmit()
	
	setUserProfile = (profile) => {
		this.setState({userProfile: {
			id: profile.id,
			name: profile.name,
			email: profile.email,
			entries: profile.entries,
			joined: profile.joined
			} // userProfile
		}); // setState
	} // setUserProfile
	
	render(){
		var Components;
		
		  // Select the components to be displayed
		if (this.state.route === 'signin') {
			Components = 
				<div className="App">
					<Navigation 
						onRouteChange={this.onRouteChange}
						isSignedIn={this.state.isSignedIn}/>
					<Signin 
						onRouteChange={this.onRouteChange}
						setUserProfile={this.setUserProfile}/>
				</div>;
		} // if route is signin
		else if (this.state.route === 'register'){
			Components = 
				<div className="App">
					<Navigation 
						onRouteChange={this.onRouteChange}
						isSignedIn={this.state.isSignedIn}/>
					<Register 
						onRouteChange={this.onRouteChange}/>
				</div>;
		} // if route is 'regsietr'
		else {
			Components = 
				<div className="App">
					<Navigation 
						onRouteChange={this.onRouteChange}
						isSignedIn={this.state.isSignedIn}/>
					<Logo />
					<Rank 
						name={this.state.userProfile.name}
						entries={this.state.userProfile.entries} />
					<ImageLinkForm 
						onInputChange={this.onInputChange}
						onButtonSubmit={this.onButtonSubmit} />
					<FaceRecognition
						box={this.state.box}
						imageUrl={this.state.imageUrl} />
				</div>;
		} // if route is not signin
		return (
			Components
		); //return()
	} // render()
} // class App

export default App;

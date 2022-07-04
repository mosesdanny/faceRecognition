import React from 'react';
import Tilt from 'react-parallax-tilt' ;
import brain from './icons8-brain-52.png';


const Logo = () => {
	return (
		<Tilt 	className = "m13 parallax-efect-glare-scale"
				tiltEnable= {true}
				perspective={500}
				glareEnable={true}
				glareMaxOpacity={0.45}
				scale={1.02} 
				style={{ 
								height: '90px', 
								width: '100px', 
								backgroundColor: 'darkgreen',
				      }}>
			<div>
 				<img src={brain} alt='logo' className='mt3'></img>
			</div>
		</Tilt>
	); // return
} // Logo(()

export default Logo ;


/*
		<Tilt>
			<div style={{ height: '300px', backgroundColor: 'darkgreen'}}>
 				<img alt="logo" src="icons8-brain-52.png", className='br4 h3 w3 dib'>
			</div>
		</Tilt>
*/

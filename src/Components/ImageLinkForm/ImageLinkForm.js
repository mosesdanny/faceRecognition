import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className='f3'>
				Enter a picture and I will detect the face.
			</p>
			<div className='myCenter'>
				<div className='form pa4 br3 shadow-5'>
					<input 
						className='f4 pa2 w-70 center' 
						type="text" 
						id="imgInId" 
						name="imgInName"
						placeholder="enter URL"
						onChange={onInputChange} />
					<button 
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer'
						onClick={onButtonSubmit}>
						Detect
					</button>
				</div>
			</div>
		</div>
	); // return
} // ImageLinkForm(()

export default ImageLinkForm ;


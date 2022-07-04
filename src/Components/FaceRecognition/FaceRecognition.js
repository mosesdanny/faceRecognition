import React from 'react';
import './FaceRecognition.css'; 

const FaceRecognition = ({ box, imageUrl }) => {
	return (
		<div className='myCenter ma'>
			<div className='absolute mt2'>
				<img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'></img>
				<div className='bounding_box'
					style={{
					 top: box.topRow,
					 right: box.rightCol,
					 bottom: box.bottomRow,
					 left: box.leftCol
					}}>
				</div>
			</div>
		</div>
	); // return
} // FaceRecognition(()

export default FaceRecognition ;
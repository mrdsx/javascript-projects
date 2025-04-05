import React, { useState } from 'react'
import './index.css'

function ColorPicker() {
	const [selectedColor, setColor] = useState("#000000");
	const selectedColorBoxStyle = {
		backgroundColor: selectedColor,
	}

	function updateColor(e) {
		const curColor = e.target.value;
		setColor(curColor);
	}

	return (
		<>
			<div className="container">
				<h1>Color picker</h1>
				<div className="selected-color-box" style={selectedColorBoxStyle}>
					<p className="selected-color-title">Selected color: {selectedColor}</p>
				</div>
				<div className="select-color-options">
					<p className="select-color-title">Select a color:</p>
					<input type="color" id="select-color-input" onChange={updateColor}/>
				</div>
			</div>
		</>
	);
}

export default ColorPicker

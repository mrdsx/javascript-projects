import Timer from './Timer.jsx'

function Countdown() {

	return (<>
		<div className="container">
			<h1>Countdown Timer App</h1>
			<h2 className="countdown-time-remaining">Time remaining:</h2>
			<Timer />
		</div>
	</>)
}

export default Countdown
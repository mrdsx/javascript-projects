import { useState, useEffect } from "react";
import formatTwoDigit from "./formatTwoDigit.js";

function Timer() {
	let inputDate;
	useEffect(() => {
		inputDate = document.getElementById("input-date");
	}, []);

	const [timeLeft, setTimeLeft] = useState({
		days: 0, hours: 0, minutes: 0, seconds: 0
	});
	const [congratulationText, setCongratulationText] = useState("");
	const [congratTextMarginTop, setCongratTextMarginTop] = useState("0");
	const congratTextStyles = {
		marginTop: congratTextMarginTop
	}

	let date = new Date();
	let startDate = {
		milliseconds: date.getTime(),
		day: String(date.getDate()),
		month: String(date.getMonth() + 1),
		year: String(date.getFullYear())
	}
	let inputDateValue = `${startDate.year}-${formatTwoDigit(startDate.month)}-${formatTwoDigit(startDate.day)}`;
	const timeOffsetInHours = date.getTimezoneOffset() / 60

	let isTimeUpdating = false;

	function updateTime() {
		if (isTimeUpdating) return;
		isTimeUpdating = true;

		function loop() {
			date = new Date();
			startDate.milliseconds = date.getTime();

			const milliseconds = {
				inDay: 86_400_000, inHour: 3_600_000, inMinute: 60_000, inSecond: 1_000
			}
			let leftDaysVal, leftHoursVal, leftMinutesVal, leftSecondsVal;

			const chosenDate = inputDate.valueAsNumber;
			let leftTime = chosenDate - startDate.milliseconds;
			if (leftTime <= 0) {
				leftTime = leftDaysVal = leftHoursVal = leftMinutesVal = leftSecondsVal = 0;

				setCongratulationText("Congratulations!");
				setCongratTextMarginTop("20px");
			}
			else {
				leftDaysVal = Math.floor(leftTime / milliseconds.inDay);
				leftHoursVal = Math.floor((leftTime % milliseconds.inDay) / milliseconds.inHour + timeOffsetInHours);
				leftMinutesVal = Math.floor(((leftTime % milliseconds.inDay) % milliseconds.inHour + timeOffsetInHours) / milliseconds.inMinute);
				leftSecondsVal = Math.floor((((leftTime % milliseconds.inDay) % milliseconds.inHour + timeOffsetInHours) % milliseconds.inMinute) / milliseconds.inSecond);

				setCongratulationText("");
				setCongratTextMarginTop('0');
			}

			setTimeLeft({
				days: leftDaysVal,
				hours: leftHoursVal,
				minutes: leftMinutesVal,
				seconds: leftSecondsVal
			});

			setTimeout(loop, 1000);
		}

		loop();
	}

	return (
		<>
			<div className="countdown-time">
				<div className="counter days">
					<p className="digit days-value">{timeLeft.days}</p>
					<p className="p-days">days</p>
				</div>
				<div className="counter hours">
					<p className="digit hours-value">{timeLeft.hours}</p>
					<p className="p-hours">hours</p>
				</div>
				<div className="counter minutes">
					<p className="digit minutes-value">{timeLeft.minutes}</p>
					<p className="p-minutes">minutes</p>
				</div>
				<div className="counter seconds">
					<p className="digit seconds-value">{timeLeft.seconds}</p>
					<p className="p-seconds">seconds</p>
				</div>
			</div>
			<div className="countdown-inputs">
				<input type="date" id="input-date" defaultValue={inputDateValue}
							 min={inputDateValue} onInput={updateTime} />
			</div>
			<div className="congratulation">
				<p className="congratulation-title" style={congratTextStyles}>
					{congratulationText}
				</p>
			</div>
		</>
	)
}

export default Timer

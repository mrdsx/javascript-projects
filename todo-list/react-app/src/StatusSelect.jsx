import {useState, useEffect, useRef, useContext} from "react";
import { TaskContext } from "./TodoList.jsx";

import arrowDown from "./assets/arrow-down-white.png";
import arrowUp from "./assets/arrow-up-white.png";

export default function StatusSelect() {
	const [arrowDownURL, arrowUpURL] = [`url("${arrowDown}")`, `url("${arrowUp}")`]

	const statusSelectRef = useRef(null);
	const [selectStyle, setSelectStyle] = useState({ backgroundImage: arrowDownURL });

	const filterTasks = useContext(TaskContext);

	function changeSelectStyle() {
		if (selectStyle.backgroundImage === arrowDownURL) {
			setSelectStyle({ backgroundImage: arrowUpURL});
		} else {
			setSelectStyle({ backgroundImage: arrowDownURL});
		}
	}

	function handleClickOutside(event) {
		if (statusSelectRef.current && !statusSelectRef.current.contains(event.target)) {
			setSelectStyle({ backgroundImage: `url("${arrowDown}")` });
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);

		return (
			document.removeEventListener("click", handleClickOutside)
		)
	}, []);

	return (
		<select name="select-menu" id="status-select" className="btn"
						style={selectStyle} onClick={changeSelectStyle}
						onChange={filterTasks} ref={statusSelectRef}>
			<option value="all">All</option>
			<option value="completed">Completed</option>
			<option value="uncompleted">Uncompleted</option>
		</select>
	)
}

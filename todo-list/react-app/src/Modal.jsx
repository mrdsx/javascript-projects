import { useEffect, useRef, useContext, useState } from "react";
import { TaskContext } from "./TodoList.jsx";

export default function Modal({ isOpen, onClose }) {
	const [task, setIsModalOpen, changeTask, addTask] = useContext(TaskContext);

	const modalInputRef = useRef(null);
	const [modalInputStyle, setModalInputStyle] = useState({ outline: "none" });
	const [modalInputPlaceholder, setModalInputPlaceholder] = useState("Input your note...");

	function handleClickInside() {
		if (modalInputRef.current) {
			setModalInputStyle({ outline: "var(--purple-outline-color) 2px solid" });
			setModalInputPlaceholder("");
			modalInputRef.current.focus();
		}
	}

	function handleClickOutside(event) {
		if (modalInputRef.current && !modalInputRef.current.contains(event.target)) {
			setModalInputStyle({ outline: "none" });
			setModalInputPlaceholder("Input your note...");
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<h2>NEW NOTE</h2>
				<input type="text" className="modal-input" ref={modalInputRef} placeholder={modalInputPlaceholder}
					style={modalInputStyle} value={task} onChange={changeTask} onClick={handleClickInside} />
				<div className="modal-buttons">
					<button className="cancel-btn btn" onClick={onClose}>CANCEL</button>
					<button className="apply-btn btn" onClick={addTask}>APPLY</button>
				</div>
			</div>
		</div>
	);
}

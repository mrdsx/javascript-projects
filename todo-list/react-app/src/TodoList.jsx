import { useState, useEffect, createContext } from 'react';
import SearchBar from './SearchBar.jsx';
import StatusSelect from './StatusSelect.jsx';
import AppearanceButton from './AppearanceButton.jsx';
import Modal from "./Modal.jsx";

import detectiveImage from './assets/detective.png';
import plusImage from './assets/plus.png';
import moonImage from "./assets/moon-image.png";
import sunImage from "./assets/sun-image.png";
import './index.css';

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext(null);
export const ThemeContext = createContext(null);

export default function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { text: 'task 1', isCompleted: true, inputId: 'check0' },
    { text: 'meeting with John Pork', isCompleted: true, inputId: 'check1' },
    { text: 'grocery shopping', isCompleted: false, inputId: 'check2' },
    { text: 'coding project', isCompleted: false, inputId: 'check3' }
  ]);
  const taskDivStyle = { borderBottom: "rgba(108, 99, 255, 0.4) 2px solid" };

  const completedTasks = tasks.filter(t => t.isCompleted);
  const uncompletedTasks = tasks.filter(t => !t.isCompleted);

  const emptyTasks =  <>
                        <img src={detectiveImage} alt="detective-check" width="221" height="174"/>
                        <div className="empty-title">Empty...</div>
                      </>

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [taskCategory, setTaskCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  function filterTasks(event) {
    setTaskCategory(event.target.value);
  }

  function handleSearch(query) {
    setSearchQuery(query.toLowerCase());
  }

  const [colorTheme, setColorTheme] = useState(localStorage.getItem("theme"));
  const [colorThemeImage, setColorThemeImage] = useState(moonImage);

  function changeColorTheme() {
    setColorTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setColorThemeImage((prevThemeImage) => (prevThemeImage === moonImage ? sunImage : moonImage));
  }

  useEffect(() => {
    let newFilteredTasks = tasks;

    if (taskCategory === "completed") {
      newFilteredTasks = tasks.filter(t => t.isCompleted);
    } else if (taskCategory === "uncompleted") {
      newFilteredTasks = tasks.filter(t => !t.isCompleted);
    }

    if (searchQuery.trim() !== "") {
      newFilteredTasks = newFilteredTasks.filter(t =>
        t.text.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredTasks(newFilteredTasks);
  }, [tasks, taskCategory, searchQuery]);

  function changeTask(event) {
    setTask(event.target.value);
  }

  function addTask() {
    if (task.trim().length > 0) {
      setTasks(t => [...t, { text: task, isCompleted: false, inputId: `check${t.length}` }]);
      setTask("");
      setIsModalOpen(false);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function getCheckboxValue(event) {
    const { id, checked } = event.target;

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.inputId === id ? { ...task, isCompleted: checked } : task
      )
    );
  }

  function deleteTask(event) {
    const btnIdNum = event.target.id.slice(-1);

    const removalTask = filteredTasks[btnIdNum];
    const returnTasks = filteredTasks.filter(ft => ft.inputId.slice(-1) !== removalTask.inputId.slice(-1));

    const uncompletedTasksIndexOffset = (
      (taskCategory !== "uncompleted" && !removalTask.isCompleted)
        ? completedTasks.length
        : 0
    );
    const removalUncompletedTask = uncompletedTasks[btnIdNum - uncompletedTasksIndexOffset];
    const returnUncompletedTasks = uncompletedTasks.filter(ft => ft.inputId.slice(-1) !== removalUncompletedTask.inputId.slice(-1));

    if (taskCategory === "all") {
      setTasks(returnTasks);
    }
    else if (taskCategory === "completed") {
      setTasks(returnTasks.concat(uncompletedTasks));
    }
    else if (taskCategory === "uncompleted") {
      setTasks(completedTasks.concat(returnUncompletedTasks));
    }
  }

  useEffect(() => {
    if (filteredTasks.length > 0) {
      const taskDivs = document.getElementsByClassName("task-div");

      for (let i = 0; i < taskDivs.length; i++) {
        taskDivs[i].style.borderBottom = "rgba(108, 99, 255, 0.4) 2px solid";
      }
      taskDivs[taskDivs.length - 1].style.borderBottom = "none";
    }
  }, [tasks, filteredTasks]);

  return (
    <div className={`${colorTheme}`}>
      <div className="container">
        <div className="title">TODO LIST</div>
        <div className="header">
          <SearchBar onSearch={handleSearch} />
          <TaskContext.Provider value={filterTasks}>
            <StatusSelect />
          </TaskContext.Provider>
          <ThemeContext.Provider value={[colorThemeImage, changeColorTheme]}>
            <AppearanceButton />
          </ThemeContext.Provider>
        </div>
        <div className="body">
          {filteredTasks.length === 0 ? emptyTasks : (
            <ul>
              {filteredTasks.map((t, index) => (
                <li key={index}>
                  <div className="task-div" style={taskDivStyle}>
                    <div className="task-left">
                      <input
                        type="checkbox" className="btn" id={t.inputId}
                        onChange={getCheckboxValue} checked={t.isCompleted} />
                      <label id={`label-${t.inputId}`}>{t.text}</label>
                    </div>
                    <div className="task-actions">
                      <button name="delete" className="delete-btn" id={`delete-btn${index}`}
                              onClick={deleteTask}></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <TaskContext.Provider value={[task, setIsModalOpen, changeTask, addTask]}>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
          </TaskContext.Provider>
        </div>
        <div className="footer">
          <button className="add-task-btn btn" onClick={() => setIsModalOpen(true)}>
            <img src={plusImage} alt=""/>
          </button>
        </div>
      </div>
    </div>
  );
}

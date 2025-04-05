import { useContext } from "react";
import { ThemeContext } from "./TodoList.jsx";

export default function AppearanceButton() {
	const [colorThemeImage, changeColorTheme] = useContext(ThemeContext);

	return (
		<button className="btn" onClick={changeColorTheme}>
			<img src={colorThemeImage} alt=""/>
		</button>
	)
}

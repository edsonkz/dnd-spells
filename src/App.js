import logo from "./logo.svg";
import "./App.css";
import api from "./services/api";
import { useEffect, useState } from "react";

function App() {
	const [spells, setSpells] = useState([]);

	useEffect(() => {
		api.get("/spells")
			.then((response) => {
				console.log(response.data.results);
				return setSpells(response.data.results);
			})
			.catch((err) => {
				console.error("Requisição falhou! " + err);
			});
	}, []);

	return (
		<div className="App">
			{spells.length > 0 ? (
				spells.map((spell) => {
					return <li key={spell.name}>{spell.name}</li>;
				})
			) : (
				<a>Ronaldo</a>
			)}
		</div>
	);
}

export default App;

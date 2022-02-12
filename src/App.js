import logo from "./logo.svg";
import "./App.css";
import api from "./services/api";
import { useEffect, useState } from "react";

function App() {
	const [spells, setSpells] = useState([]);

	useEffect(async () => {
		try{
			const response = await api.get("spells");
			var {results} = response.data;

			for (var i = 0; i < results.length; i++){
				results[i].description = await (await api.get(results[i].url.substring(5))).data.desc;
			}

			return setSpells(results);

		} catch (err){
			console.error("Requisição falhou! " + err);
		}
	}, []);

	return (
		<div className="App">
			{spells.length > 0 ? (
				spells.map((spell) => {
					return (<div key={spell.name}>
						<h1>{spell.name}</h1>
						<a>{spell.description}</a>
					</div>);
				})
			) : (
				<a>Loading...</a>
			)}
		</div>
	);
}

export default App;

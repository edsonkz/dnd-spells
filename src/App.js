import "./App.css";
import api from "./services/api";
import SpellItem from "./Spell";
import { useEffect, useState } from "react";

function App() {
	const [spells, setSpells] = useState([]);
	const [currentSpells, setCurrentSpells] = useState([]);
	const [page, setPage] = useState(1);
	const [lastSpell, setLastSpell] = useState();

	useEffect(async () => {
		try{
			const response = await api.get("spells");
			var {results} = response.data;
			var cSpells = [];
			for (var i = 0; i < 25; i++){
				results[i].description = (await api.get(results[i].url.substring(5))).data.desc;
				cSpells[i] = results[i]
			}


			return setSpells(results), setCurrentSpells(cSpells), setLastSpell(cSpells[cSpells.length - 1]);

		} catch (err){
			console.error("Requisição falhou! " + err);
		}
	}, []);

	return (
		<div className="App">
			{currentSpells.length > 0 ? (
				currentSpells.map((spell) => {
					return (<div key={spell.name}>
						<SpellItem spell={spell}/>
					</div>);
				})
			) : (
				<a>Loading...</a>
			)}
		</div>
	);
}

export default App;

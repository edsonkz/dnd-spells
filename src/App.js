import "./App.css";
import api from "./services/api";
import SpellItem from "./Spell";
import { useEffect, useState } from "react";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
 

function App() {
	const [spells, setSpells] = useState([]);
	const [currentSpells, setCurrentSpells] = useState([]);
	const [totalSpells, setTotalSpells] = useState(0);
	const [numberOfSpells, setNumberOfSpells] = useState(0);
	
	async function loadMore() {
		let cSpells = currentSpells;
		let requestSpells = 0;
		if (cSpells.length + 25 > totalSpells){
			requestSpells = totalSpells - cSpells.length;
		} else if (cSpells.length === totalSpells){
			return;
		} else {
			requestSpells = 25;
		}

		try{
			for (var i = numberOfSpells; i < numberOfSpells + requestSpells; i++){
				let aux = {}
				aux.name = spells[i].name;
				aux.description = (await api.get(spells[i].url.substring(5))).data.desc;
				console.log(aux);
				cSpells[i] = aux;
			}
			//console.log(cSpells);
	
			return setCurrentSpells(cSpells), setNumberOfSpells(numberOfSpells + requestSpells);
		} catch (err){
			console.error("Requisição falhou! " + err);
		}
	}
	useBottomScrollListener(loadMore);
	
	useEffect(async () => {
		try{
			const response = await api.get("spells");
			const {results} = response.data;
			console.log(response.data.count);
			let cSpells = [];
			for (var i = numberOfSpells; i < numberOfSpells + 25; i++){
				let aux = {}
				console.log(i);
				aux.name = results[i].name;
				aux.description = (await api.get(results[i].url.substring(5))).data.desc;
				cSpells[i] = aux;
			}
			//console.log(cSpells);

			return setSpells(results), setCurrentSpells(cSpells), setNumberOfSpells(numberOfSpells + 25), setTotalSpells(response.data.count);

		} catch (err){
			console.error("Requisição falhou! " + err);
		}
	}, []);

	return (
		<div className="App">
			{currentSpells.length > 0 ? (
				currentSpells.map((spell, index) => {
					return <SpellItem key={index} spell={spell}/>;
				})
			) : (
				<a>Loading...</a>
			)}
		</div>
	);
}

export default App;

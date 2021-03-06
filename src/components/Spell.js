import React from "react";
import "./Spell.css";

export default function SpellItem({ spell }) {
	return (
		<div className="spellItem">
			<h1>{spell.name}</h1>
			<span>{spell.description}</span>
		</div>
	);
}

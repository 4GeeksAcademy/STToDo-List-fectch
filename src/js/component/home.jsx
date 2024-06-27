import React from "react";
import { Todolist } from "./Todolist";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-white">TODOS</h1>
			<Todolist />
			
		</div>
	);
};
export default Home;
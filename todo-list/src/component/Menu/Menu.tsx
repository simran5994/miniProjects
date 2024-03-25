import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import TaskList from "../TaskList/TaskList";
import data from '../../data.json';

const Menu = () => {
	return (
		<div className="listview">
			<SearchBar />
			<TaskList dataObject={data.data} />
		</div>
	);
};

export default Menu;

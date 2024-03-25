import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./src/component/Menu/Menu";

const Title = () => (
	<h1 id='heading' className='head' tabIndex='5'>
		React Todo App
	</h1>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

//to render functional component
root.render(<Menu />);

import React from "react";

// import { connect } from "react-redux";
// import { addTodo } from "./actions/actions";

// import AddTodo from "./components/AddTodo";
// import TodoList from "./components/TodoList";

// import PropTypes from 'prop-types';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	state = {
		data: require("./data/current.json"),
	};

	codes = {
		1:"watched",
		11:"all",
		12:"reviewed",
		13:"ost",
		14:"op-ed",
		2:"ongoinhg",
		3:"high-priority",
		4:"incomplete",
		5:"on-hold",
		6:"dropped",
	}

	order = [
		"Title",
		"Alt",
		"Name",
		"CODE",
		"Season",
		"Episode",
		"Resolution",
		"Rating",
		"Watched",
		"Creator",
		"Producer",
		"Year",
		"Season__1",
		"Genre",
		"Subgenre",
		"Source",
		"link",
		"Review",
		"Clean",
		"Unclean",
		"Subbed",
		"Left",
		"Downloaded",
		"Filtered",
	];


	render() {
		console.log(this.state.data);

		// const { dispatch, visibleTodos } = this.props;
		return (
			<div class="container">
				<table>
					<thead>
						<tr>
							{Object.keys(this.state.data[0]).map((colHead) => (
								<th>{colHead}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((show) => (
							<tr class={"code code-" + this.codes[show.CODE]}>
								{Object.keys(show).map(key => {
									if (key == this.order[0]) {
										return <th>{show[key]}</th>;
									} else {
										return <td>{show[key]}</td>;
									}
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;


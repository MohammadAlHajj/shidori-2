import React from "react";

// import { connect } from "react-redux";
// import { addTodo } from "./actions/actions";

// import AddTodo from "./components/AddTodo";
// import TodoList from "./components/TodoList";

// import PropTypes from 'prop-types';
// import logo from './logo.svg';
import "./App.css";

class App extends React.Component {
	state = {
		data: require("./data/current.json"),
	};

	codes = {
		1: "watched",
		11: "all",
		12: "reviewed",
		13: "ost",
		14: "op-ed",
		2: "ongoinhg",
		3: "high-priority",
		4: "incomplete",
		5: "on-hold",
		6: "dropped",
	};

	order = [
		"Title",
		"Alt-Name",
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
			<div class="container container-natural-and-earthy">
				<table>
					<thead>
						<tr>
							{this.state.order.map((colHead) => (
								<th class={colHead.replace(" ", "-")}>{colHead}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((show) => (
							<tr class={"code code-" + this.codes[show.CODE]}>
								{Object.keys(show).map((key) => {
									if (key === "Title") {
										return (
											<th id="title" class="cs">
												{show[key]}
											</th>
										);
									} else if (key === "Code") {
										return <td id="progress-code">{show[key]}</td>;
									} else {
										return <td>{show[key]}</td>;
									}
								})}

								<td colSpan="3">
									<th id="title" class="cs">
										{show.Title}
									</th>
									<td id="alt-name">{show["Alt Name"]}</td>
									<td id="progress-code" class="ce">
										{show.CODE}
									</td>
								</td>

								<td id="season" class="cs">
									{show.Season}
								</td>
								<td id="episode">{show.Episode}</td>
								<td id="resolution">{show.Resolution}</td>
								<td id="rating">{show.Rating}</td>
								<td id="Watched" class="ce">
									{show.Watched}
								</td>

								{/* // "Season",
										// "Episode",
										// "Resolution",
										// "Rating",
										// "Watched",

										// "Creator",
										// "Producer",
										// "Year",
										// "Season__1",
										// "Genre",
										// "Subgenre",
										// "Source",
										// "link",
										// "Review",
										// "Clean",
										// "Unclean",
										// "Subbed",
										// "Left",
										// "Downloaded",
										// "Filtered", */}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;

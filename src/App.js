import React from "react";

// import { connect } from "react-redux";
// import { addTodo } from "./actions/actions";

// import AddTodo from "./components/AddTodo";
// import TodoList from "./components/TodoList";

// import PropTypes from 'prop-types';
// import logo from './logo.svg';
import "./App.css";
import { getAllPossibleAnimeFromList } from "./MAL-Extractor-js/mal-extractor";
import Popup from "./components/Popup";

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
		"Alt Name",
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
		// console.log(this.state.data);
		// getAllPossibleAnimeFromList([
		// 	"91 Days",
		// 	"A Certain Magical Index",
		// 	"A Certain Scientific Railgun",
		// ]);

		var showPopup = true
		// const { dispatch, visibleTodos } = this.props;
		return (
			// container-natural-and-earthy
			<div className="container ">
				{/* {showPopup && <Popup />} */}
				<Popup />
				<table>
					<thead>
						<tr>
							<th colSpan="2">Name</th>
							<th colSpan="1"></th>
							<th colSpan="5">Personal Reference</th>
							<th colSpan="8">Release Info</th>
							<th colSpan="1"></th>
							<th colSpan="4">Opening and Ending</th>
							<th colSpan="2">OST Download</th>
						</tr>
						<tr>
							{this.order.map((colHead) => (
								<th className={colHead.replace(" ", "-")}>{colHead}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((show) => (
							<tr className={"code code-" + this.codes[show.CODE]}>
								{this.order.map((key, i) => {
									var tag = "td";
									// var classProp = ' class="' + key.replace(" ", "-");
									var classProp = key.replace(" ", "-");
									var colSpan = 1;
									var content = show[key];
									var style = {}

									if (key.toLowerCase() === "title") {
										tag = "th";
										classProp += " cs";
									} else if (key.toLowerCase() === "season") {
										classProp += " cs";
										if (show.Season === "COM" || show.Episode === "") {
											colSpan = 2
										}
									} else if (key.toLowerCase() === "episode") {
										if (show.Season === "COM" || show.Episode === "" || show.Episode ==="COM") {
											style = { display: "none" };
										}
									} else if (key.toLowerCase() === "creator") {
										classProp += " cs";
									} else if (key.toLowerCase() === "link") {
										// todo fix broken link
										content = (
											<a href={show[key]}>{show[key] ? "MAL_link" : ""}</a>
										);
									} else if (key.toLowerCase() === "review") {
										classProp += " cs";
									} else if (key.toLowerCase() === "clean") {
										classProp += " cs";
									} else if (key.toLowerCase() === "downloaded") {
										classProp += " cs";
									}

									var props = {
										className: classProp,
										colSpan,
										style,
									};
									return React.createElement(tag, props, content);
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

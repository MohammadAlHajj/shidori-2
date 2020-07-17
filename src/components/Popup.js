import React, { Component } from "react";
import PropTypes from "prop-types";
import { getAllPossibleAnimeFromList } from "../MAL-Extractor-js/mal-extractor";

export default class Popup extends Component {
	state = {
		animeList: [],
		isChecked: [],
	};

	componentDidMount() {
		var namesList = ["A Certain Scientific Railgun"];
		getAllPossibleAnimeFromList(namesList, this);
		// var a1 = animeList;

		// console.log(JSON.stringify(a1));
		// console.log(a1);
		// obj[Object.keys(obj)[0]];

		// this.state.animeList = animeList.map(anime => ({ [anime]: false }));
		// this.state.animeList = Object.entries(
		// 	animeList["A Certain Scientific Railgun"]
		// ).forEach(([key, value]) => (animeList[key] = [value, false]));

		// console.log(this.state.animeList);
	}

	render() {
		var currlist = "";
		if (this.state.animeList) {
			currlist = <h1>hi</h1>
			// currlist = this.state.animeList.map((possibility, i) => (
			// 	<p key={i}>
			// 		<h2>{"A Certain Scientific Railgun"}</h2>

			// 		<input
			// 			type="checkbox"
			// 			// checked={(e) => (this.state.isChecked[i] = e.checked)}
			// 			// onChange={this.props.markComplete.bind(this, id)}
			// 		/>
			// 		{" hello"}
			// 		{console.log(possibility.title)}
			// 	</p>
			// ));
		} ;
		return (
			<div>
				<form>
					<h2>{"A Certain Scientific Railgun"}</h2>
					{currlist}
					<div>
						<button type="submit" >
							Let's Go
						</button>
						<button type="button" onclick="closeForm()">
							Close
						</button>
					</div>
				</form>
			</div>
		);
	}
}


import React , {Component} from 'react';
import GifGrid from './GifGrid.react.js';
var giphy = require('giphy-api')();
var searchPlaceHolder = "Type Here";

export default class SearchPage extends React.Component{
	costructor(props){

		this.state = {
           isFocused : false,
           isBlurred : false,
           searchResult : {}
        };
        this.searchResult = {};
        this.showResultGrid = this.showResultGrid.bind(this);
      	this.onBlur = this.onBlur.bind(this);
      	this.onFocus = this.onFocus.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.render = this.render.bind(this)

	}

	onFocus() {
		console.log("onFocus");
		this.setState({isFocused: true});
	}

	onBlur() {
		this.setState({isFocused: false},function(){
			console.log("Blur");
		});
		
	}

	onTextChange (e) {
		var searchString = document.getElementById('searchButton').value;
		let that = this;
		giphy.search(searchString).then(function(resp){
			console.log("onTextChange",resp);
			if(resp.message  && resp.message === 'API rate limit exceeded'){
				return;
			}
			else{
				//that.setState({searchResult : resp});
				that.searchResult = resp;
			}
		})
		.catch(function(){
			console.log('giphy failed');
		});
	}

	handleKeyDown(e){
		console.log("Key Down");
	}

	render(){
		let searchBoxStyle = {};
		searchBoxStyle = {
		    width: "200px",
            height: "15px",
            border: "3px",
            borderColor: "#050100",
            backgroundColor: "rgb(208, 203, 198)",
            color: "#000000",
            margin : "20px 0px"
		};
		//console.log("this.state.searchResult",this.state.searchResult);
		let resultGrid = this.searchResult ? 
			(
				<GifGrid id = 'resultGrid'
						searchResult = {this.searchResult}/>
		    ): "";
		
		return(
			<React.Fragment>
				<div id= "FullScreen" style = {{
					height: "100%",
					width: "100%",
					backgroundColor: "rgba(123, 123, 47, 0.93)",
				}}>
					<input
		                id="searchButton"
		                className="inputBoxStyle"
		                type="text"
		                ref="UISearchBoxInput"
		                placeholder={searchPlaceHolder}
		                onFocus={e => this.onFocus(e)}
		                onBlur={e => this.onBlur(e)}
		                onChange={e => this.onTextChange(e)}
		                onKeyDown={e => this.handleKeyDown(e)}
		                style={searchBoxStyle}
			        />
			        {resultGrid}
			    </div>
		    </React.Fragment>
        );
	}
}

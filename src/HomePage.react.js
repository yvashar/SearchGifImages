import React , {Component} from 'react';
import GifGrid from './GifGrid.react.js';
var giphy = require('giphy-api')();
var searchPlaceHolder = "Search Here";


export default class HomePage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchResult : {},
			isFocused : false,
			noResultFound : false,
			loading : false
		};
		this.state = {
          searchResult : {}
        };
        this.searchResult = {};
       
      	this.onBlur = this.onBlur.bind(this);
      	this.onFocus = this.onFocus.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.render = this.render.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        

	}

	onFocus() {
		this.setState({isFocused : true, noResultFound : false});
		document.getElementById("searchButton").value = "";
	}

	onBlur() {
		this.setState({isFocused : false, loading : true});
		this.searchHandler();
	}

	searchHandler(e){
		this.setState({searchResult : [],loading : true})
		var searchString = document.getElementById('searchButton').value;
		let that = this;
		if(searchString){
			giphy.search(searchString).then(function(resp){
				if(resp.message  && resp.message === 'API rate limit exceeded'){
					that.setState({noResultFound : true, loading: false})
					return;
				}
				else{
					that.setState({searchResult : resp, loading : false});
				}
			})
			.catch(function(){
				console.log('giphy failed');
				
			});
		}else{
			this.setState({loading : false});
		}
		
	}

	onTextChange (e) {
		
	}

	handleKeyDown(e){
		this.setState({loading:false});
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
            margin : "15px 0px 15px",
            borderRadius: "3px"
		};
		
		let resultGrid = this.state.searchResult && !this.state.isFocused? 
			(
				<GifGrid id = 'resultGrid'
						style = {{
							height: "100%",
							width : "100%",
							position: "absolute",
							top: "10px",
							bbackgroundColor:"#00f4ff24"
						}}
						searchResult = {this.state.searchResult}/>
		    ): "";
		
		return(
			<React.Fragment>
				<div id= "header" style = {{
					height: "50px",
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
			        <span id="Go"
			        	   onClick = {e => this.searchHandler(e)}
			        	   style={{
			        	   	color: '#000000',
			        	   	fontSize: "10px",
			        	   	fontWeight: "500",
			        	   	cursor: "pointer",
			        	   	position:"relative",
			        	   	left: "5px"
			        	   }}> Go </span>
			    </div>
			    {this.state.loading ? (<div id="loading" style={{marginTop:"50px"}}> loading... </div>) : ""}
			    {this.state.noResultFound && !this.state.loading? (<div id="noResultFound" style={{
			    	marginTop: "50px"
			    }}>No Results Found</div>) : resultGrid}
			    
		    </React.Fragment>
        );
	}
}

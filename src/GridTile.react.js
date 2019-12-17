import React from 'react';
//import GifImageDisplay from "./GifImageDisplay.react.js";

export default class GifTile extends React.Component{
	constructor(props){
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.state = {
			imageUrl : undefined
		}
		this.tile = undefined;
	}

	onClickHandler(e, clickedUrl){
		this.props.tileClickHandler(clickedUrl);
	}

	componentDidMount(){
		console.log('gridTile:: mounted');
	}

	render(){
		return (
			
				<div id="gridTile" style={{height: "100px", width: "100px", border :"2px" , marginRight : "5px",marginBottom: "5px" }}>
					<img src = {this.props.url}
						style={{height: "100%", width: "100%" }}
						onClick = {e => this.onClickHandler(e, this.props.url)}>
					</img>
				</div>
				
			
		);
	}	
}

  
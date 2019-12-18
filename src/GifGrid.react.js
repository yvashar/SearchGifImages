import React from 'react';
import GridTile from './GridTile.react.js';
import GifImageDisplay from './GifImageDisplay.react.js';

export default class GifGrid extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			gridContent : this.props.searchResult,
			clickedTileUrl : undefined
		}
		this.generateTile = this.generateTile.bind(this);
		this.tileClickHandler = this.tileClickHandler.bind(this);
		this.closeButtonHandler = this.closeButtonHandler.bind(this);
		this.grids = undefined;
		
	}

	componentDidMount(){
		console.log('gifGrid: mounted'); 
	}

	componentDidUpdate(){
		console.log('gifGrid: updated'); 
		
	}

	tileClickHandler(clickedUrl){
		this.setState({clickedTileUrl: clickedUrl});
	}
	

	closeButtonHandler(){
		
		this.setState({clickedTileUrl : undefined});
	}

	generateTile(){
		let grids = this.props.searchResult.data && this.props.searchResult.data.map((item, index) => {
			return (
				<GridTile id = {"gridTile_"+index}
						key = {"gridTile_"+index}
						  images = {item.images}
						  tileClickHandler={this.tileClickHandler}/>
			);
		});
		return grids;
	}

	render(){
		
		let grids;
		if(this.props.searchResult && this.props.searchResult.data && this.props.searchResult.data.length > 0){
			
			grids = this.generateTile();
		}
		if(this.state.clickedTileUrl){
			return(<GifImageDisplay id= "gifImageDisplay1"
							imageUrl = {this.state.clickedTileUrl} 
							handleCloseButton = {this.closeButtonHandler}>
					</GifImageDisplay>
				);
		}
		else{
			return (
					<div id="gridView" 
						style= {{
								flexDirection: "column",
								flexFlow: "wrap",
								zIndex: "99",
								display: "flex",
								padding: "10px 20px 0 20px"
						}}>
						{grids}
					</div>
				
				);
		}
		
			
	}
}
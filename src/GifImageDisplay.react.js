import React from 'react';
export default class GifImageDisplay extends React.Component{
	constructor(props){
		super(props);
		this.closeButtonHandler = this.closeButtonHandler.bind(this);
	}

	closeButtonHandler(){
		this.props.handleCloseButton();
	}

	render(){
		let that = this;
		return (
			<div id= "gifImage" 
				style = {{height: "100%",
								width: "100%",
								position: "absolute",
								top: "50px",
								justifyContent: "center",
								backgroundColor: "#000000",
								opacity: "1"}}>
				<div id = "closeButton"
					data-milestonesbuttontitle="close"
					onClick = {e => this.closeButtonHandler(e)}
					style ={{
						color: "#ffffff",
						fontSize:"10px",
						cursor: 'pointer',
						position: "absolute",
						right: "50px",
						paddingTop: "10px"

					}}>close
				</div>
				<img src = {this.props.imageUrl} 
					style = {{height: "50%", width : "50%", position: "relative",top: "50px"}}>
				</img>
			</div>
		);
	}	
}
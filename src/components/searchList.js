import React, {Component} from 'react';

//Spotify API implementation

//Song playing will have onClick={()=>this.props.setTone(arr[i].index)}
class searchList extends Component{
    render(){
        
        let songData = this.props.searchResults.map((el,i,arr)=>{
            return (
            <div className="musicBox flexContainer">
                <div>
                    <a href={this.props.searchResults[i].url}>
                    <img className="albumCover" src={this.props.searchResults[i].albumCover} /> 
                    </a>
                </div>
                <div className="flexContainer">
                    <div className="flexColumn">
                        <div>Title:</div>
                        <div>Artists:</div>
                        <div>Album:</div>
                        {/* <div>Uri: {this.props.searchResults[i].uri}</div> */}
                    </div>
                    <div className="flexColumn">
                        <div>{this.props.searchResults[i].name}</div>
                        <div>{this.props.searchResults[i].artists}</div>
                        <div>{this.props.searchResults[i].album}</div>
                        {/* <div>{this.props.searchResults[i].uri}</div> */}
                    </div>
                    <div className="flexColumn">
                        <button onClick={()=>this.props.inputTone(this.props.searchResults[i].name, this.props.searchResults[i].artists)}>submit</button>
                    </div>
                </div>
            </div>
        )});
        return(

            <div>
            {songData}
            </div>
        )
    }
}

export default searchList;
import React, {Component} from 'react';

//Spotify API implementation
//https://developer.spotify.com/technologies/widgets/spotify-play-button/
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
                        {/* <iframe src="https://open.spotify.com/embed?uri=spotify:track:5JunxkcjfCYcY7xJ29tLai"
        frameborder="0" allowtransparency="true"></iframe> */}

                        {/* <iframe src={"https://open.spotify.com/embed?uri=spotify:track:" + this.props.searchResults[i].uri}
        frameborder="0" allowtransparency="true"></iframe> */}

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
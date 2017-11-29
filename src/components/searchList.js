import React, {Component} from 'react';

//Spotify API implementation
//https://developer.spotify.com/technologies/widgets/spotify-play-button/
//Song playing will have onClick={()=>this.props.setTone(arr[i].index)}
class searchList extends Component{
    render(){
        
        let songData = this.props.searchResults.map((el,i,arr)=>{
            return (
            <div className="musicBox flexContainer">
                <div className="flexContainer">
                    <div className="flexColumn">        
                        <iframe src={"https://open.spotify.com/embed?uri=" + this.props.searchResults[i].uri}
                            frameorder="0" allowtransparency="true" height="80px" width="100%"></iframe>    
                        <button onClick={()=>this.props.inputTone(this.props.searchResults[i].name, this.props.searchResults[i].artists, this.props.searchResults[i].id)}>submit</button>
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
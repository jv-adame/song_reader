import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//Spotify API implementation

//Song playing will have onClick={()=>this.props.setTone(arr[i].index)}
class searchList extends Component{
    render(){
        
        let songData = this.props.songs.map((el,i,arr)=>{
            return (
            <div className="musicBox">
                <div>{this.props.songs[i].title}: <button className="toneSet" onClick={()=>this.props.setTone(arr[i].index)} >Play</button>
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
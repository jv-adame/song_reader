import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class SongsList extends Component{
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

export default SongsList;
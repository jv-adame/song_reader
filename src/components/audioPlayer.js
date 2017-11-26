import React, {Component} from 'react';




class AudioPlayer extends Component{
    render(){
        return(
           <div className="audio">
           
               <audio id='player'src={this.props.songs[this.props.songId].source}/>
               <button onClick={()=>{
                   document.getElementById('player').pause();
                   this.props.onPause();
                   }}>Pause</button>
               
           </div>
        )
    }
}
export default AudioPlayer;
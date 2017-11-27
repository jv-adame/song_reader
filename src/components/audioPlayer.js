import React, {Component} from 'react';




class AudioPlayer extends Component{
    render(){
        return(
           <div className="audio">
           
               <audio id='player'src={this.props.songs[this.props.songId].source}/>
               {/* <audio id="player" src="spotify:track:7fyx7nBQTEtYrfXc0UgUYs"/> */}
               {/* <audio id='player'src="https://open.spotify.com/track/56sk7jBpZV0CD31G9hEU3b"/> */}

               <button onClick={()=>{
                   document.getElementById('player').pause();
                   this.props.onPause();
                   }}>Pause</button>
               
           </div>
        )
    }
}
export default AudioPlayer;
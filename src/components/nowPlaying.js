import React, {Component} from 'react';


class NowPlaying extends Component{

    render(){
        let playingSong = this.props.song;
        let playingArtist = this.props.artist[0];
        return(
            <div className="nowPlaying">
               <h2> {(playingSong) ? "Now Animating:" : ""} {playingSong} {(playingSong) ? "-" : ""} {playingArtist}</h2>
            </div>
        )
    }
}

export default NowPlaying;
import React, {Component} from 'react';


class NowPlaying extends Component{

    render(){
        let playingSong = this.props.song;
        let playingArtist = this.props.artist;
        return(
            <div>
                {(playingSong) ? "Now Analyzing:" : ""} {playingSong} {(playingSong) ? "-" : ""} {playingArtist}
            </div>
        )
    }
}

export default NowPlaying;
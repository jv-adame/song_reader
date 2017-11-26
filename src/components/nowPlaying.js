import React, {Component} from "react";

class NowPlaying extends Component{
    render(){
        return(
            <div className="flexContainer">
                {(this.props.moving) ? "Now Playing" : "On Dock"}: {this.props.songs[this.props.id].title}
            </div>
        )
    }
}

export default NowPlaying
import React, {Component} from 'react';

class EmotionReader extends Component{
    render(){
        //Only for use in error messages
            let playingSong = this.props.song;
            let playingArtist = this.props.artist[0];
            let p = Array.from(this.props.percentage);
            let instrumental = (((p[0] === p[1]) && (p[0] === p[2])) && p[0] === 33) ? "is an instrumental" : "" ;
            let cantFind = (((p[0] === p[1]) && (p[0] === p[2])) && p[0] === 66) ? "cannot be found on Genius.com" : "";
        //error message end
        let energy = Math.ceil(this.props.energy * 100);
        let tempo = Math.ceil(this.props.tempo);
        let playing = (this.props.song) ? "flex" : "none";
        let emotionJSX = this.props.emotion.map((thisArray, index)=>{
            let emotion;
            if (index === 0)
            {emotion = "Anger"}
            if (index === 1)
            {emotion = "Disgust"}
            if (index === 2)
            {emotion = "Fear"}
            if (index === 3)
            {emotion = "Joy"}
            if (index === 4)
            {emotion = "Sadness"}

            return(
              <div className={emotion}>

                <div>
                  {emotion}:
                </div>
                <div>
                  {thisArray}%
                </div>
              </div>      
            )
          });
        //If the given song is an instrumental or cannot be found on Genius.com, display error message
        if (instrumental || cantFind)
        {
          return(
            <div className="errorMessage readContainer">
              <h2>The song "{playingSong}" by {playingArtist} {instrumental}{cantFind}</h2>
            </div>
          )
        }
        //Otherwise display analysis of song
        else{
          return(
            <div>
              <div className="flexContainer readContainer" style={{display:playing}}>
                  {emotionJSX}
                  <div className="Tempo" >
                    <div >
                      Tempo:
                    </div>
                    <div>
                      {tempo} BPM
                    </div>
                  </div>
                  <div className="Energy">
                    <div >
                      Energy:
                    </div>
                    <div>
                      {energy}%
                    </div>
                  </div>
              </div>
            </div>
        )
        }

    }
}

export default EmotionReader;
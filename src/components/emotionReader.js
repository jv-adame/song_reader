import React, {Component} from 'react';

class EmotionReader extends Component{
    render(){
        let energy = Math.ceil(this.props.energy * 100);
        let tempo = Math.ceil(this.props.tempo);
        let playing = (this.props.song) ? "block" : "none";
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
              <div>
                <div>
                  {emotion}:
                </div>
                <div className={emotion}>
                  {thisArray}%
                </div>
              </div>      
            )
          });
        return(
            <div>
              <div className="flexContainer readContainer">
                  {emotionJSX}
                  <div style={{display:playing}}>
                    <div>
                      Tempo:
                    </div>
                    <div className="Tempo" >
                      {tempo} BPM
                    </div>
                  </div>
                  <div style={{display:playing}}>
                    <div>
                      Energy:
                    </div>
                    <div className="Energy">
                      {energy}%
                    </div>
                  </div>
              </div>
            </div>
        )
    }
}

export default EmotionReader;
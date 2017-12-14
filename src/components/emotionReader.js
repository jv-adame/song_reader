import React, {Component} from 'react';

class EmotionReader extends Component{
    render(){
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
                <div >
                  {emotion}:
                </div>
                <div>
                  {thisArray}%
                </div>
              </div>      
            )
          });
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

export default EmotionReader;
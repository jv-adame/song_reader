import React, {Component} from 'react';

class EmotionReader extends Component{
    render(){
        let energy = Math.ceil(this.props.energy * 100);
        let tempo = Math.ceil(this.props.tempo);
        //Use this value for error messages
        let p = Array.from(this.props.percentage);
        let instrumental = ((p[0] === p[1]) && p[0] === 33);
        let cantFind = ((p[0] === p[1]) && p[0] === 66);
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
        if (instrumental)
        {
          return(
            <div className="errorMessage">
              <h2>The song being analyzed is an instrumental</h2>
            </div>
          )
        }
        else if (cantFind)
        {
          return(
            <div className="errorMessage">
              <h2>The analyzed song cannot be found</h2>
            </div>
          )

        }
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
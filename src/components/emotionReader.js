import React, {Component} from 'react';

class EmotionReader extends Component{
    render(){
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
            
            let show = (this.props.moving) ? "block" : "none";
            return(
              <div style={{display:show}}>
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
            <div className="flexContainer">
                {emotionJSX}
            </div>
        )
    }
}

export default EmotionReader;
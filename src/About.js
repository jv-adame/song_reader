import React, { Component } from 'react';
import {Link} from "react-router-dom";
import cancel from "./images/cancel.png";
import spotify from "./images/spotify.png";
import watson from "./images/watson.png";
import genius from "./images/genius.png";
import github from "./images/git_hub.png";

class About extends Component{
    render(){
        return(
            <div className="about">
          

        <div className="header aboutHeader flexContainer default">
          <div className="aboutContainer">
            <div className="aboutSpacer">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/about">About</Link>
            </div>
          </div>
          <div className="headerContainer">
          <h2>About the App</h2>
            <div className="iconTray">
              <div>Powered By:</div>
              <div className="iconContainer"><a href="https://developer.spotify.com/web-api/" target="_blank"><img className="iconImg" src={spotify} alt="Spotify"/></a></div>
              <div className="iconContainer"><a href="https://www.ibm.com/watson/services/tone-analyzer/" target="_blank"><img className="iconImg" src={watson} alt="Watson"/></a></div>
              <div className="iconContainer"><a href="https://genius.com/developers" target="_blank"><img className="iconImg" src={genius} alt="Genius"/></a></div>
              <div className="iconContainer"><a href="https://github.com/jv-adame/song_reader" target="_blank"><img className="iconImg" src={github} alt="Github"/></a></div>
            </div>
          </div>
          
        </div>
        <div className="header aboutHeader flexContainer responsive">
          <div className="aboutContainer">
            <div className="aboutSpacer">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/about">About</Link>
            </div>
          </div>
          <div className="headerContainer">
          <h2>About the App</h2>
            <div className="iconTray">
              <div>Powered By:</div>
              <div className="iconContainer"><a href="https://developer.spotify.com/web-api/" target="_blank"><img className="iconImg" src={spotify} alt="Spotify"/></a></div>
              <div className="iconContainer"><a href="https://www.ibm.com/watson/services/tone-analyzer/" target="_blank"><img className="iconImg" src={watson} alt="Watson"/></a></div>
              <div className="iconContainer"><a href="https://genius.com/developers" target="_blank"><img className="iconImg" src={genius} alt="Genius"/></a></div>
              <div className="iconContainer"><a href="https://github.com/jv-adame/song_reader" target="_blank"><img className="iconImg" src={github} alt="Github"/></a></div>
            </div>
          </div>
        </div>
         <div className="wrapper flexClass">
          <div className="aboutText">
          <p>The search function uses the Spotify API to search for tracks.  
            Searching here will function exactly the same as searching "Songs" 
            with the Spotify application.  Pressing the Watson API logo next 
            to a given song will send a query to the Genius.com API to find the track on the site.
            </p>
            <p>  
            If the song is found, the lyrics of the song will be given to the Watson API.  
            The Watson API will generate what it interprets as the emotional content of that lyrics; 
            the likelihood of Anger, Disgust, Fear, Sadness and Joy being present in the track.  
            This data gets visualized alongside "Tempo" and "Energy" stats provided by the Spotify API
              to create a dynamic graphic that represents the song. </p>
              <p>
              If the given song is an instrumental the app should detect it as such as long 
              as the song is present in Genius.com's site and the lyrics only 
              contains the word "Instrumental".</p>
            </div>
         </div>   










            
                
            

            </div>
        )
    }
}

export default About;
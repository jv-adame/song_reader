import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Animation from "./components/animation";
import EmotionReader from "./components/emotionReader";
import {Link} from "react-router-dom";
import SearchList from "./components/searchList";
import SearchBar from "./components/searchBar";
import NowPlaying from "./components/nowPlaying";
import searchIcon from "./images/search_icon.png"
import spotify from "./images/spotify.png";
import watson from "./images/watson.png";
import genius from "./images/genius.png";
import exceptions from "./exceptions/exceptionsTitle";
import exceptionsURL from "./exceptions/exceptionsUrl";
import circularJSON from "circular-json";
import { lchmod } from 'fs';

//Default colors and percentages on startup
const color = ["#DE0017", "#375E29", "#562786", "#FBD500", "#276DB4"];
const percentage = [20, 20, 20, 20, 20];
const initial = [];
class App extends Component {
  constructor(){
    super();

    this.state ={
      emotion: initial,
      color: color,
      searchResults: initial,
      percentage: percentage,
      moving: false,
      tempo: 100,
      energy: 0,
      song: "",
      artist:""
    }
   this.setEmotion = this.setEmotion.bind(this);
   this.setColor = this.setColor.bind(this);
   this.search = this.search.bind(this);
   this.inputTone = this.inputTone.bind(this);
   this.tempoEnergy = this.setTempoEnergy.bind(this);
   this.setPlaying = this.setPlaying.bind(this);
  }

  //Populate based on search query
  search(query){
      query = query.replace("&", "and")
    axios.get("/search/" + 
      query.replace("/", " "))
    .then((result)=>{
      let queryResults = [];
      for (let i = 0; i < result.data.items.length; i++)
      {
       
        let artistList = [];
        for (let j = 0; j < result.data.items[i].artists.length; j++)
        {
            artistList[j] = result.data.items[i].artists[j].name;
        }

        let entry = {
          name: result.data.items[i].name,
          artists: artistList,
          album: result.data.items[i].album.name,
          albumCover: result.data.items[i].album.images[0].url,
          id: result.data.items[i].id,
          uri: result.data.items[i].uri,
        }
        queryResults.push(entry);
      }
      this.setState({
        searchResults: queryResults
      });      
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  //Pass arguments to Genius API call
  inputTone(song, artist, id){
      //Having a question mark at the end of the song title and next to the slash messes up the axios call.
      //Having slashes other than the ones already indicated in the localhost path break the query
      //Passing the "/" in as characters that the query can accept while turning it back into a slash server side for search purposes
      let songTitle = song.replace("?", "")
                          .replace("/", "_-_");
      axios.get("/lyrics/" + songTitle + "/" + artist)
      .then((result)=>{
        axios.get("/tempo/" + id)
        .then((tempo)=>{
          let toneArray = [];
          for (let i = 0; i < result.data.length; i++)
          {
            toneArray.push(Math.ceil(result.data[i].score*100));
          }
          this.setTempoEnergy(tempo.data);
          this.setEmotion(toneArray);
          this.setColor(toneArray);
          this.setPlaying(song, artist);
        })
        .catch((error)=>{
          console.log(error)
        })

      })
      .catch((error)=>{
        console.log(error);
      })
  }

  //Set Emotion State
  setEmotion(array){
    this.setState({
      emotion: array
    });
  }
  //Set Tempo and Energy State
  setTempoEnergy(input){
    this.setState({
      tempo: input.tempo,
      energy: input.energy
    })
  }
  setPlaying(inSong, inArtist){
    this.setState({
      song: inSong,
      artist: inArtist
    })
  }

  //Assign colours based on intensity of respective emotion
  setColor(colorList){
    /*
        0: Anger
        1: Disgust
        2: Fear
        3: Joy
        4: Sadness
    */
     
    let copy = Array.from(this.state.color);
    //anger index 0
    if (colorList[0] < 20){
      copy[0] = "#F8A095";
    }
    else if (colorList[0] >= 20 && colorList[0] < 40)
    {
      copy[0] = "#ff5151";
    }
    else if (colorList[0] >= 40 && colorList[0] < 60)
    {
      copy[0] = "#DE0017";
    }
    else if (colorList[0] >= 60)
    {
      copy[0] = "crimson";
    }
    //disgust index 1
    if (colorList[1] < 20){
     copy[1] = "#82B252";
    }
    else if (colorList[0] >= 20 && colorList[1] < 40)
    {
      copy[1] = "#32CD32";
    }
    else if (colorList[0] >= 40 && colorList[1] < 60)
    {
      copy[1] = "#006400";
    }
    else if (colorList[1] >= 60)
    {
      copy[1] = "#0f3a00";
    }
    //fear index 2
    if (colorList[2] < 20){
      copy[2] = "#A479DB";
    }
    else if (colorList[2] >= 20 && colorList[2] < 40)
    {
      copy[2] = "#884fd1";
    }
    else if (colorList[2] >= 40 && colorList[2] < 60)
    {
      copy[2] = "#562786";
    }
    else if (colorList[2] >= 60)
    {
      copy[2] = "#3e1c60";
    }
    //joy index 3
    if (colorList[3] < 20){
     copy[3] = "#FDF169";
    }
    else if (colorList[3] >= 20 && colorList[3] < 40)
    {
      copy[3] = "#ffee35";
    }
    else if (colorList[3] >= 40 && colorList[3] < 60)
    {
      copy[3] = "#FBD500";
    }
    else if (colorList[3] >= 60)
    {
      copy[3] = "#ffd800";
    }
    //sadness index 4
    if (colorList[4] < 20){
     copy[4] = "#76C4E4";
    }
    else if (colorList[3] >= 20 && colorList[4] < 40)
    {
      copy[4] = "#3578d6";
    }
    else if (colorList[3] >= 40 && colorList[4] < 60)
    {
      copy[4] = "#0047ab";
    }
    else if (colorList[3] >= 60)
    {
      copy[4] = "#191970";
    }

    this.setState({
      color: copy,
      percentage: colorList
    });
  }

  render() {
      let playingSong = this.state.song;
      let playingArtist = this.state.artist;

      //default or responsive will become visible depending on the device screen width
    return (
      <div className="App">
        <Link to="/about">Hi there</Link>
        <div className="header flexContainer default">
          <div className="headerContainer">
            <SearchBar search={this.search} /> 
            <NowPlaying song={this.state.song} artist={this.state.artist}/>
            <div className="iconTray">
              <div>Powered By:</div>
              <div className="iconContainer"><a href="https://developer.spotify.com/web-api/" target="_blank"><img className="iconImg" src={spotify} alt="Spotify"/></a></div>
              <div className="iconContainer"><a href="https://www.ibm.com/watson/services/tone-analyzer/" target="_blank"><img className="iconImg" src={watson} alt="Watson"/></a></div>
              <div className="iconContainer"><a href="https://genius.com/developers" target="_blank"><img className="iconImg" src={genius} alt="Genius"/></a></div>
            </div>
          </div>
          
        </div>
        <div className="header flexContainer responsive">
          <div className="headerContainer">
            <SearchBar search={this.search} /> 
            <div className="iconTray">
              <div>Powered By:</div>
              <div className="iconContainer"><a href="https://developer.spotify.com/web-api/" target="_blank"><img className="iconImg" src={spotify} alt="Spotify"/></a></div>
              <div className="iconContainer"><a href="https://www.ibm.com/watson/services/tone-analyzer/" target="_blank"><img className="iconImg" src={watson} alt="Watson"/></a></div>
              <div className="iconContainer"><a href="https://genius.com/developers" target="_blank"><img className="iconImg" src={genius} alt="Genius"/></a></div>
            </div>
          </div>
          <NowPlaying song={this.state.song} artist={this.state.artist}/>
        </div>
         <div className="wrapper flexClass">
            <Animation color={this.state.color} percentage={this.state.percentage} tempo={this.state.tempo} energy={this.state.energy}/>
            <EmotionReader emotion={this.state.emotion} moving={this.state.moving} percentage={this.state.percentage} tempo={this.state.tempo} energy={this.state.energy} song={this.state.song} song={this.state.song} artist={this.state.artist}/>       
            <SearchList setTone={this.setTone} onPause={this.onPause} searchResults={this.state.searchResults} inputTone={this.inputTone}/>
         </div>      
      </div>
    );
  }
}

export default App;

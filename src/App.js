import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Tones from "./tones";
import spiral from "./spiral.svg";
import SongsList from "./components/songsList";
import AudioPlayer from "./components/audioPlayer";
import Animation from "./components/animation";
import EmotionReader from "./components/emotionReader";
import NowPlaying from "./components/nowPlaying";
import SearchList from "./components/searchList";
import SearchBar from "./components/searchBar";
import config from "./config";
import circularJSON from "circular-json";

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
      id: 0
    }
   this.setTone = this.setTone.bind(this);
   this.setEmotion = this.setEmotion.bind(this);
   this.setColor = this.setColor.bind(this);
   this.onPause = this.onPause.bind(this);
   this.playCurrent = this.playCurrent.bind(this);
   this.search = this.search.bind(this);
   this.inputTone = this.inputTone.bind(this);
  }





  //Populate based on search query
  search(query){
    axios.get("http://localhost:8080/search/" + query)
    .then((result)=>{
      console.log(result.data.items[0]);
      let queryResults = []
      for (let i = 0; i < result.data.items.length; i++)
      {
        let entry = {
          name: result.data.items[i].name,
          artists: result.data.items[i].album.artists[0].name,
          album: result.data.items[i].album.name,
          albumCover: result.data.items[i].album.images[0].url,
          id: result.data.items[i].id,
          url: result.data.items[i].external_urls.spotify,
          uri: result.data.items[i].uri,
          duration: result.data.items[i].duration_ms
        }
        queryResults.push(entry);
      }
        console.log(queryResults);
      this.setState({
        searchResults: queryResults
      });      
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  //Pass arguments to Genius API call
  inputTone(song, artist){
      console.log("song:", song + " artist:", artist);
      axios.get("http://localhost:8080/lyrics/" + song + "/" + artist)
      .then((result)=>{
        console.log(result.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }
  /*
  Takes lyrics to call the Tone Analyzer API, will get numbers based on emotional content of lyrics
  */
  setTone(index){
    //this axios call will go towards a Genius.com API call
  //  let baseURL = "http://localhost:8080/tone/" + index;
 
    let toneArray = [];
    let p = axios.get("http://localhost:8080/tone/" + index);
    p.then((result)=>{
      //Turn data into percentages
      for (let i = 0; i < result.data.length; i++)
      {
        toneArray.push(Math.ceil(result.data[i].score*100));
      }
      //Put both of these in promises
      this.setEmotion(toneArray);
      this.setColor(toneArray);

      //change state to play song based on id
      this.onPlay(index);

    });
    p.catch((error)=>{
      console.log(error);
    });
    
  }



  //Set Emotion State
  setEmotion(array){
    this.setState({
      emotion: array
    });
  }

  //Assign colours based on intensity of respective emotion
  //Color can be "" if at not high enough rating
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
    if (colorList[0] < 15){
      copy[0] = "white";
    }
    else if (colorList[0] >= 15 && colorList[0] < 30)
    {
      copy[0] = "#F8A095";
    }
    else if (colorList[0] >= 30 && colorList[0] < 45)
    {
      copy[0] = "red";
    }
    else if (colorList[0] >= 45 && colorList[0] < 60)
    {
      copy[0] = "#DE0017";
    }
    else if (colorList[0] >= 60)
    {
      copy[0] = "crimson";
    }
    //disgust index 1
    if (colorList[1] < 15){
      copy[1] = "white";
    }
    else if (colorList[1] >= 15 && colorList[1] < 30)
    {
      copy[1] = "#82B252";
    }
    else if (colorList[0] >= 30 && colorList[1] < 45)
    {
      copy[1] = "green";
    }
    else if (colorList[0] >= 45 && colorList[1] < 60)
    {
      copy[1] = "#375E29";
    }
    else if (colorList[1] >= 60)
    {
      copy[1] = "deepgreen";
    }
    //fear index 2
    if (colorList[2] < 15){
      copy[2] = "white";
    }
    else if (colorList[2] >= 15 && colorList[2] < 30)
    {
      copy[2] = "#A479DB";
    }
    else if (colorList[2] >= 30 && colorList[2] < 45)
    {
      copy[2] = "purple";
    }
    else if (colorList[2] >= 45 && colorList[2] < 60)
    {
      copy[2] = "#562786";
    }
    else if (colorList[2] >= 60)
    {
      copy[2] = "#3e1c60";
    }
    //joy index 3
    if (colorList[3] < 15){
      copy[3] = "white";
    }
    else if (colorList[3] >= 15 && colorList[3] < 30)
    {
      copy[3] = "#FDF169";
    }
    else if (colorList[3] >= 30 && colorList[3] < 45)
    {
      copy[3] = "yellow";
    }
    else if (colorList[3] >= 45 && colorList[3] < 60)
    {
      copy[3] = "#FBD500";
    }
    else if (colorList[3] >= 60)
    {
      copy[3] = "#ffd800";
    }
    //sadness index 4
    if (colorList[4] < 15){
      copy[4] = "white";
    }
    else if (colorList[3] >= 15 && colorList[4] < 30)
    {
      copy[4] = "#76C4E4";
    }
    else if (colorList[3] >= 30 && colorList[4] < 45)
    {
      copy[4] = "blue";
    }
    else if (colorList[3] >= 45 && colorList[4] < 60)
    {
      copy[4] = "#276DB4";
    }
    else if (colorList[3] >= 60)
    {
      copy[4] = "#1f5a96";
    }

    this.setState({
      color: copy,
      percentage: colorList
    });
  }

  //AUDIO PLAYER FUNCTIONS
  componentDidUpdate(){
    if(this.state.moving){
      document.getElementById("player").play();
    }
    else if (!this.state.moving){
      document.getElementById("player").pause();
    }
  }
  onPlay(index){
    this.setState({
        moving: true,
        id: index
    })
  }
  onPause(){
    this.setState({
      color: color,
      percentage: percentage,
      moving: false
    });
  }


  playCurrent(){
    this.setState({
      moving: true
    });
  }
  render() {

    return (
      <div className="App" >
         <Animation color={this.state.color} percentage={this.state.percentage}/>
         <NowPlaying songs={this.props.songs} moving={this.state.moving} id={this.state.id}/>
         <EmotionReader emotion={this.state.emotion} moving={this.state.moving}/>
         <SearchBar search={this.search} />
         <SearchList setTone={this.setTone} onPause={this.onPause} searchResults={this.state.searchResults} inputTone={this.inputTone}/>
         <SongsList songs={this.props.songs} setTone={this.setTone} onPause={this.onPause} />
         <AudioPlayer songId={this.state.id}  songs={this.props.songs} onPause={this.onPause}/>
      </div>
    );
  }
}

export default App;

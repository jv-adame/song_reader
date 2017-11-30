import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Animation from "./components/animation";
import EmotionReader from "./components/emotionReader";
import SearchList from "./components/searchList";
import SearchBar from "./components/searchBar";
import config from "./config";
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
    axios.get("http://localhost:8080/search/" + query)
    .then((result)=>{
      let queryResults = [];
      for (let i = 0; i < result.data.items.length; i++)
      {

        let entry = {
          name: result.data.items[i].name,
          artists: result.data.items[i].album.artists[0].name,
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
      axios.get("http://localhost:8080/lyrics/" + song + "/" + artist)
      .then((result)=>{
        axios.get("http://localhost:8080/tempo/" + id)
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
    if (colorList[0] < 30){
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
    if (colorList[1] < 30){
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
    if (colorList[2] < 30){
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
    if (colorList[3] < 30){
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
    if (colorList[4] < 30){
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

  render() {
      let playingSong = this.state.song;
      let playingArtist = this.state.artist;
    return (
      <div className="App">
         <Animation color={this.state.color} percentage={this.state.percentage} tempo={this.state.tempo} energy={this.state.energy}/>
         <div>
            Now Playing: {playingSong} - {playingArtist}
          </div>
         <EmotionReader emotion={this.state.emotion} moving={this.state.moving} tempo={this.state.tempo} energy={this.state.energy}/>
         <SearchBar search={this.search} />
         <SearchList setTone={this.setTone} onPause={this.onPause} searchResults={this.state.searchResults} inputTone={this.inputTone}/>
      </div>
    );
  }
}

export default App;

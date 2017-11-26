import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';





//replace all with applicable songs for index

function Song(source, title, artist, index) {
    this.source = source;
    this.title = title;
    this.artist = artist;
    this.index = index;

  }
  
  
  const songs = [
    new Song('/tracks/piano_man.mp3', "Piano Man", "Billy Joel", 0),
    new Song('/tracks/waka_waka.mp3',  "Waka Waka", "Shakira", 1),
    new Song('/tracks/thank_you.mp3', "Thank You", "DiDo", 2),
    new Song('/tracks/shall_we_dance.mp3', "Shall We Dance ", "Peter Gabriel", 3),
    new Song('/tracks/i.mp3',  "i", "Kendrick Lamar", 4),
    new Song('/tracks/killing_in_the_name.mp3', "Killing in the Name", "Rage Against the Mahcine", 5),
    new Song('/tracks/perfect_places.mp3', "Perfect Places", "Lorde", 6),
    new Song('/tracks/stupid_me.mp3', "Stupid Me", "MAGIC!", 7)
  ]
  



ReactDOM.render(<App songs={songs}/>, document.getElementById('root'));
registerServiceWorker();

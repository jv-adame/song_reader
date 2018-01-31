const axios = require("axios");
const CircularJSON = require("circular-json");
const cheerio = require("cheerio");
const config = require("./config"),
    watson = config.watson_api_key;
    spotify = config.spotify_api_key;
    genius = config.genius_api_key;
const exceptions = require("./exceptions/exceptions");
const accent = require("./exceptions/accentNormalize");
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 8080;

app.use(express.static(__dirname+"/build"))

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Spotify search call
app.get("/search/:query", (req, res)=>{
  let search = req.params.query;

  //Spotify Authorization
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: spotify.user,
      password: spotify.pass
    }
  }).then((authorized)=>{
    //Receiving data to pass to app
    axios({
      url: "https://api.spotify.com/v1/search?q=" + search + "&type=track&limit=5",
      method: "get",
      params: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      headers: {
        "Authorization": "Bearer " + authorized.data.access_token
      }
    })
    .then((response)=>{
     // console.log(response.data.tracks.items[0]);
      let json = CircularJSON.stringify(response.data.tracks);
      res.send(json);
    })
    .catch((error)=>{ 
      let json = CircularJSON.stringify(error);
      res.send(json);
    })
  }).catch((error)=> {
  });
});

//Spotify Audio-Features call
app.get("/tempo/:id", (req, res)=>{
  let search = req.params.id;

  //Spotify Authorization
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: spotify.user,
      password: spotify.pass
    }
  }).then((authorized)=> {
    //Receiving data to pass to app
    axios({
      url: "https://api.spotify.com/v1/audio-features/" + search,
      method: "get",
      params: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      headers: {
        "Authorization": "Bearer " + authorized.data.access_token
      }
    })
    .then((response)=>{
      let pass = {
        tempo: response.data.tempo,
        energy: response.data.energy
      }
      let json = CircularJSON.stringify(pass);
      res.send(json);
    })
    .catch((error)=>{ 
      let json = CircularJSON.stringify(error);
      res.send(json);
    })
  }).catch((error)=> {
      console.log(error);
  });
});

//Genius API call
app.get("/lyrics/:song/:artist", (req,res)=>{
  //Panic at the Disco and Fall Out Boy should be safe.  
  //The regular expressions below changes Spotify given titles to be in line with Genius.com's song title conventions
  
  //First .replace(): Changes any irregular Spotify apostraphes to be in line with Genius.com's conventions
  //Second .replace(): removes all artists credited as (with <artist name>) from song title
  //Third .replace(): removes all artists credited as (feat. <artist name>) from song title
  //Fourth .replace(): removes parts of common Spotify song titles like " - Remastered"
  //Fifth .replace(): removes any text in square brackets in song title (WHY?!?!?!)
  //Sixth .replace(): removes all titles with (Parody of <song name>) in title.  Weird Al clause
  //Seventh .replace(): Trims any excess (more than one) space
  let searchSong = req.params.song             
                    .replace("’", "'")
                    .replace(/\(with.*\)/g, "")
                    .replace(/\(feat.*\)/g, "")
                    .replace(/ - .*/g, "")
                    .replace(/\[.*\]/g, "")
                    .replace(/ \(Parody.*\)/g, "")
                    .replace(/ * {2,} /g, "");
            
      //Exception Handler: Evaluates string in exceptions.js
      searchSong = exceptions(searchSong);         
  //Only remove ampersand sign for the sake of search query, this character messes with Spotify search results
  //A question mark (?) next to a forward slash (/) also causes a defunct query
  let querySong = searchSong.replace("&", "")
                          .replace("?", "");

  //Seperates artists into an array when there are more than one credited
  let searchArtist = req.params.artist.toString().split(",");
  //simplify the artist entry entered into the Genius.com API call
  let queryArtist = searchArtist[0];            

  //axios authorization 
    axios({
      url: "http://api.genius.com/search?q=" + querySong + " " + queryArtist,
      method: "get",
      params: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      headers: {
        "Authorization": "Bearer " + genius.token
      }
    })
    .then((response)=>{
      let searchResults = response.data.response.hits;
      let found;

      //change loop below to break once result is found
      for(i = 0; i < searchResults.length; i++)
      {
        //query is substring of title
        //Spotify and Genius use different characters for apostraphes.  This remove any non standard characters for the sake of evaluation including all apostraphes
        let evaluateTitle = searchResults[i].result.title.toLowerCase().replace(/[^a-z A-Z 0-9 ; : \- & ~`,.]/g, " ");  
        //Normalizes accented letters from evaluateArtist to match Spotify's artist naming convention
        let evaluateArtist = accent(searchResults[i].result.primary_artist.name.toLowerCase());
        let eSearchSong = searchSong.toLowerCase().replace(/[^a-z A-Z 0-9 ; : \- & ~`,.]/g, " ");
        
        let foundResult = searchResults[i].result;    
        
        console.log("matching song:", evaluateTitle);
        console.log("matching artist:", evaluateArtist);
        
        //search for every artist in the array
        for (j = 0; j < searchArtist.length; j++)
        {
        
          let eSearchArtist = searchArtist[j].toLowerCase();

        //return the object where the title and artist match the search term's. Redundant but readable
        //There might be some false positives using this methodology
          if((evaluateTitle === eSearchSong && evaluateArtist === eSearchArtist) || 
          (evaluateTitle.includes(eSearchSong) && evaluateArtist === eSearchArtist) || 
          (eSearchSong.includes(evaluateTitle) && evaluateArtist === eSearchArtist) || 
          (evaluateTitle === eSearchSong && evaluateArtist.includes(eSearchArtist)) ||
          (evaluateTitle.includes(eSearchSong) && evaluateArtist.includes(eSearchArtist)) ||
          (evaluateTitle[1] === eSearchSong && evaluateArtist === eSearchArtist))
          {
            found = foundResult; 
          }
        }
        
      } //end loop
     // console.log("We found:", found); 

      //Kendrick Lamar Logic bomb: why doesn't "i" === "i"?
      // let logic = searchResults[0].result.title[1].toUpperCase() === searchSong.toUpperCase();
      //Turns out it's the api's fault: Api side title was two characters (somehow?)
      // let show = {
      //   searched: searchSong,
      //   first: searchResults[0].result.title,
      //   logic: logic,
      //   found: found 
      // }
      // console.log(show);

      //If specific artist/song combination cannot be found in genius.com do something
      //Flesh out more to alter emotionReader client side
      if(!found || !found.url)
      {
        let placeholder = [
          {score: 0.66},
          {score: 0.66},
          {score: 0.66},
          {score: 0.66},
          {score: 0.66}
        ]

        res.send(placeholder);
      }
      //otherwise commence analysis
      else
      {
        axios.get(found.url)
        .then((response)=>{
          const fill = [];
          let $ = cheerio.load(response.data);

          //First .replace(): Wipeout all square brackets and characters between square brackets
          //Second .replace(): Wipeout any character that is NOT listed within the square brackets
          //Third .replace(): Reduce any excess white space
        let lyrics = $(".lyrics").text()
            .replace(/\[.*\]/g, "")
            .replace(/[^a-z A-Z 0-9 ; : \- & ~`',.]/g, " ")
            .replace(/\s/g, " ");

          //test for false positives
         console.log(lyrics);
          
          //Watson Lyric Analysis
          axios.get("https://"+ watson.user +":"+ watson.pass +"@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=" + lyrics, {   
            header: "X-Watson-Learning-Opt-Out: true"      
          })
          .then((response)=> {
              
              let insert = [
                {score: 0.33},
                {score: 0.33},
                {score: 0.33},
                {score: 0.33},
                {score: 0.33}
              ]
              //if lyrics contain the word "instrumental" with only spaces preceding and following the string and nothing else, send placeholder 
              if (lyrics.toLowerCase().includes(" instrumental ")){
                res.send(insert);
              }
              else
              {
                res.send(response.data.document_tone.tone_categories[0].tones);
              }
            
          })
        .catch((error)=> {
          console.log("Breakpoint 1:", error);
        });
      })
    .catch((error)=>{
      console.log("Breakpoint 2:", error);
    })      
      }

  })
  .catch((error)=>{ 
    let json = CircularJSON.stringify(error);
    console.log("Breakpoint 3:", error);
    res.send(json);
  })
})

app.get("*", (req, res)=>{
  res.sendFile(__dirname+"/build/index.html")
})

//Listener
app.listen(PORT, ()=> {
console.log(`server running on ${PORT}! Press Ctrl+C to kill `);
})
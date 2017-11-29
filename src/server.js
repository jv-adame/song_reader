
const axios = require("axios");
const CircularJSON = require("circular-json");
const cheerio = require("cheerio");
const config = require("./config"),
    watson = config.watson_api_key;
    spotify = config.spotify_api_key;
    genius = config.genius_api_key;
const express = require('express'),
    app = express();



app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Display list of songs via the search function
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
  }).then(function(authorized) {
    //Receiving data to pass to app
    axios({
      url: "https://api.spotify.com/v1/search?q=" + search + "&type=track&limit=10",
      method: "get",
      params: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      headers: {
        "Authorization": "Bearer " + authorized.data.access_token
      }

    })
    .then(function(response){
      console.log(response.data);
      let json = CircularJSON.stringify(response.data.tracks);
      res.send(json);
    })
    .catch(function(error){ 
      let json = CircularJSON.stringify(error);
      res.send(json);
    })
  }).catch(function(error) {
  });
});


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
  }).then(function(authorized) {
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
    .then(function(response){
      console.log(response.data);
      let pass = {
        tempo: response.data.tempo,
        energy: response.data.energy
      }
      console.log(pass);
      let json = CircularJSON.stringify(response.data);
      res.send(json);
    })
    .catch(function(error){ 
      let json = CircularJSON.stringify(error);
      res.send(json);
    })
  }).catch(function(error) {
  });
});





//Genius API call
app.get("/lyrics/:song/:artist", (req,res)=>{
  let searchSong = req.params.song;
  let searchArtist = req.params.artist;

  //axios authorization call
    axios({
      url: "http://api.genius.com/search?q=" + searchSong + " " + searchArtist,
      method: "get",
      params: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      headers: {
        "Authorization": "Bearer " + genius.token
      }
    })
    .then(function(response){
      let searchResults = response.data.response.hits;
      let found;
      for(i = 0; i < searchResults.length; i++)
      {
          //return the object where the title and artist match the search term's
          if(searchResults[i].result.title.toLowerCase().toString() === searchSong.toLowerCase().toString() && searchResults[i].result.primary_artist.name.toLowerCase() === searchArtist.toLowerCase())
          {
            found = searchResults[i].result; 
          }
      }

      //Kendrick Lamar Logic bomb: why doesn't "i" === "i"?
      let logic = (searchResults[0].result.title.toString() === searchSong.toString()) ? true : false;

      let show = {
        searched: searchSong,
        first: searchResults[0].result.title,
        logic: logic,
        found: found 
      }

      //If specific artist/song combination cannot be found in genius.com do something
      //Flesh out more to alter emotionReader client side
      if(!found || !found.url)
      {
        let placeholder = [
          {score: 0.7},
          {score: 0.7},
          {score: 0.7},
          {score: 0.7},
          {score: 0.7}
        ]

        console.log(show);
        res.send(placeholder);
      }
      //otherwise commence analysis
      else
      {
        axios.get(found.url)
        .then((response)=>{
          const fill = [];
          let $ = cheerio.load(response.data);

          //Hacky way of being thorough, can't properly eliminate [Chorus] and [Post-Chorus]for some reason
          //Also to not give Watson a tonne of white space
        let lyrics = $(".lyrics").text()
            .replace("[Verse 1]", "")
            .replace("[Verse 2]", "")
            .replace("[Verse 3]", "")
            .replace("[Chorus]", "")
            .replace("[Bridge]", "")
            .replace("[Post-Chorus]", "")
            .replace("[Coda]", "")
            .replace("[Hook]", "")
            .replace("[Outro]", "")
            .replace(/\s/g, " ");

        console.log("Here are the lyrics for: "+ searchSong, lyrics)
          //Watson Lyric Analysis
          axios.get("https://"+ watson.user +":"+ watson.pass +"@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=" + lyrics, {   
            header: "X-Watson-Learning-Opt-Out: true"      
          })
          .then( (response)=> {
            res.send(response.data.document_tone.tone_categories[0].tones);
          })
        .catch((error)=> {
          console.log(error);
        });
      })
    .catch((error)=>{
      console.log(error);
    })      
      }

  })
  .catch(function(error){ 
    let json = CircularJSON.stringify(error);
    console.log(error);
    res.send(json);
  })
})


//Listener
app.listen(8080, ()=> {
console.log('server running on 8080! Press Ctrl+C to kill ');
})
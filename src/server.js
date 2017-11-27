
const axios = require("axios");
const sampleJSON = require("./lyrics.json");
const CircularJSON = require("circular-json");
const cheerio = require("cheerio");
const config = require("./config"),
    watson = config.watson_api_key;
    spotify = config.spotify_api_key;
    genius = config.genius_api_key;
const express = require('express'),
    app = express();



app.use(function(req, res, next) {
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
      url: "https://api.spotify.com/v1/search?q=" + search + "&type=track",
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


    //if statement searchResults[i].result.primary_artist.name.toLowerCase() === searchArtist.toLowerCase()
    .then(function(response){
      let searchResults = response.data.response.hits;
      let found = {};
      for(i = 0; i < searchResults.length; i++)
      {
          //return the object where the title and artist match the search term's
          if(searchResults[i].result.title.toLowerCase().toString() === searchSong.toLowerCase().toString() && searchResults[i].result.primary_artist.name.toLowerCase() === searchArtist.toLowerCase())
          {
            found = searchResults[i].result; 
          }
      }
    
      //Logic bomb: why doesn't "i" === "i"?
      let logic = (searchResults[0].result.title.toString() === searchSong.toString()) ? true : false;

      //Get this on the chrome console
      let show = {
        searched: searchSong,
        first: searchResults[0].result.title,
        logic: logic,
        found: found 
      }
      
      console.log("Aiming for url", found.url);
      //must be case for found.url undefined

      //lyric scraping
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
        //Lyric Analysis
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
  })
  .catch(function(error){ 
    let json = CircularJSON.stringify(error);
    console.log(error);
    res.send(json);
  })

  //promises
})




//This will get replaced by Genius.com API call
// app.get("/tone/:index", (req, res)=>{
//     let index = parseInt(req.params.index);
//     let lyrics = "";

//     if(index === 0){
//       lyrics = sampleJSON.songs[0].text;
//     }  
//     if(index === 1){
//       lyrics = sampleJSON.songs[1].text;
//     }
//     if(index === 2){
//       lyrics = sampleJSON.songs[2].text;
//     }
//     if(index === 3){
//       lyrics = sampleJSON.songs[3].text;
//     }
//     if(index === 4){
//       lyrics = sampleJSON.songs[4].text;
//     }
//     if(index === 5){
//       lyrics = sampleJSON.songs[5].text;
//     }
//     if(index === 6){
//       lyrics = sampleJSON.songs[6].text;
//     }
//     if(index === 7){
//       lyrics = sampleJSON.songs[7].text;
//     }

//       axios.get("https://"+ watson.user +":"+ watson.pass +"@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=" + lyrics, {   
//         header: "X-Watson-Learning-Opt-Out: true"
    
//     })
//       .then( (response)=> {
//         //How to get the first item of the tone categories

//         //res.send(response.data.document_tone.tone_categories[0]);

//         //How to get the entire .json object
//         res.send(response.data.document_tone.tone_categories[0].tones);
//       //  res.send(response.data.document_tone.tone_categories)
//       })
//       .catch( (error)=> {
//         console.log(error);
//       });


// })

//Listener
app.listen(8080, ()=> {
console.log('server running on 8080! Press Ctrl+C to kill ');
})
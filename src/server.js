
const axios = require("axios");
const sampleJSON = require("./lyrics.json");
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



app.get("/search/:query", (req, res)=>{
  // let search = req.params.query;

  
  axios.post("https://accounts.spotify.com/api/token",    {

    params:{
      grant_type: "client_credentials"
    }
},
{
  headers : 
  {
      "Content-Type" : "application/x-www-form-urlencoded", // WTF!
      "Authorization" : "Basic " + new Buffer(spotify.user+":"+spotify.pass).toString('base64')
  }
})
  .then((response)=>{
    console.log(response);
    res.send(response);
  })
  .catch((err)=>{
    console.log(err);
    res.send(err);
  })
})






//This will get replaced by Genius.com API call
app.get("/tone/:index", (req, res)=>{
    let index = parseInt(req.params.index);
    let lyrics = "";

    if(index === 0){
      lyrics = sampleJSON.songs[0].text;
    }  
    if(index === 1){
      lyrics = sampleJSON.songs[1].text;
    }
    if(index === 2){
      lyrics = sampleJSON.songs[2].text;
    }
    if(index === 3){
      lyrics = sampleJSON.songs[3].text;
    }
    if(index === 4){
      lyrics = sampleJSON.songs[4].text;
    }
    if(index === 5){
      lyrics = sampleJSON.songs[5].text;
    }
    if(index === 6){
      lyrics = sampleJSON.songs[6].text;
    }
    if(index === 7){
      lyrics = sampleJSON.songs[7].text;
    }

      axios.get("https://"+ watson.user +":"+ watson.pass +"@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=" + lyrics, {   
        header: "X-Watson-Learning-Opt-Out: true"
    
    })
      .then(function (response) {
        //How to get the first item of the tone categories

        //res.send(response.data.document_tone.tone_categories[0]);

        //How to get the entire .json object
        res.send(response.data.document_tone.tone_categories[0].tones);
      //  res.send(response.data.document_tone.tone_categories)
      })
      .catch(function (error) {
        console.log(error);
      });


})

//Listener
app.listen(8080, ()=> {
console.log('server running on 8080! Press Ctrl+C to kill ');
})
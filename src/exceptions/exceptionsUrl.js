//If Genius search bar can't find song but they have the url for the song, directly give Watson API the url
 



module.exports =  function redirect(title, artist){
    let newURL;
    if(title === "bboom bboom" && artist === "momoland")
    {
        newURL = "https://genius.com/Momoland-bboom-bboom-lyrics";
    }
        
    return newURL;    
}
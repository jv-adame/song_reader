module.exports =  function redirect(title, artist){
    let newURL;
    if(title === "bboom bboom" && artist === "momoland")
    {
        newURL = "https://genius.com/Momoland-bboom-bboom-lyrics";
    }
        
    return newURL;    
}
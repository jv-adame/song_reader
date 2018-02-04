//Normalize accented letters from artist's names in Genius.com's search results to match Spotify's artist naming convention
//For example Jhené Aiko's entire discography is cannot be analyzed without this document
//No need to do this to song titles, "Where Are Ü Now (with Justin Bieber) - Jack Ü" is a cited and functional example
//Will expand as needed, hopefully it does not need to be extensive
module.exports =  function accent(name){
    let newName = name
        .replace(/[áà]/g, "a")
        .replace(/[ćĉčċçḉ]/g, "c")
        .replace(/[h̀]/g, "h")
        .replace(/[íì]/g, "i")
        .replace(/[ñ]/g, "n")
        .replace(/[óò]/g, "o")
        .replace(/[úù]/g, "u");

    return newName;    
}
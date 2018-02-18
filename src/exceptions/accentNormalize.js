//Normalize accented letters from artist's names in Genius.com's search results to match Spotify's artist naming convention
//For example Jhené Aiko's entire discography is cannot be analyzed without this document
//No need to do this to song titles, "Where Are Ü Now (with Justin Bieber) - Jack Ü" is a cited and functional example
//Will expand as needed, hopefully it does not need to be extensive
module.exports =  function accent(name){
    let newName = name
        .replace(/[áàÁÀ]/g, "a")
        .replace(/[ćĉčċçḉ]/g, "c")
        .replace(/[éèÉÈ]/g, "e")
        .replace(/[h̀]/g, "h")
        .replace(/[íìÍÌ]/g, "i")
        .replace(/[ñÑ]/g, "n")
        .replace(/[óòÓÒ]/g, "o")
        .replace(/[úùÚÙ]/g, "u");

    return newName;    
}
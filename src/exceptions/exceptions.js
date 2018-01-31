//Changes edge case Spotify titles to match their Genius.com counterparts

//First .replace():  Edge case for Helena (So Long & Good Night), categoried simply as Helena at Genius.com
//Second .replace(): Edge case for Andromeda - Gorillaz when titled Andromeda (DRAM Special)
//Third .replace():  Edge case for Waka Waka - Shakira with subtitle (The Official 2010 FIFA World Cup (TM) Song)
//Fourth .replace(): Edge case for Main Title Theme - Elmer Bernstein with subtitle (Ghostbusters)
//Fifth .replace(): Edge case for End Credits - Jurassic Park with /Soundtrack appended, categorized as "End Credits - Jurassic Park"
//Sixth .replace(): Edge case for Christmas Eve/Sarajevo (12/24) - Trans-Siberian Orchestra due to limits with forward slashes in queries
module.exports =  function refine(title){
    let newCredit = title
        .replace(/\(So.*\)/g, "")
        .replace(/\(DRAM.*\)/g, "")
        .replace(/\(The Official.*\)/g, "")
        .replace(/(Ghostbusters)/g, "")
        .replace(/\/Soundtrack/g, "")
        .replace("Christmas Eve  Sarajevo", "Christmas Eve Sarajevo  12 24 ");
        
    return newCredit;    
}
    

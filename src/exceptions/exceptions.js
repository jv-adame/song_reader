//Changes edge case Spotify titles to match their Genius.com counterparts

//First .replace():  Edge case for Helena (So Long & Good Night), categoried simply as Helena at Genius.com
//Second .replace(): Edge case for Andromeda - Gorillaz when titled Andromeda (DRAM Special)
//Third .replace():  Edge case for Waka Waka - Shakira with subtitle (The Official 2010 FIFA World Cup (TM) Song)
//Fourth .replace(): Edge case for Main Title Theme - Elmer Bernstein with subtitle (Ghostbusters)
//Fifth .replace(): Edge case for End Credits - Jurassic Park with /Soundtrack appended.  Documented as "End Credits - Jurassic Park"
module.exports =  function refine(title){
    let newCredit = title
        .replace(/\(So.*\)/g, "")
        .replace(/\(DRAM.*\)/g, "")
        .replace(/\(The Official.*\)/g, "")
        .replace(/(Ghostbusters)/g, "")
        .replace(/\/Soundtrack/g, "");
        
    return newCredit;    
}
    

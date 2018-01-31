//Changes edge case Spotify titles to match their Genius.com counterparts

//First .replace():  Edge case for Helena (So Long & Good Night), categoried simply as Helena at Genius.com
//Second .replace(): Edge case for Andromeda - Gorillaz when titled Andromeda (DRAM Special)
//Third .replace():  Edge case for Waka Waka - Shakira with subtitle (The Official 2010 FIFA World Cup (TM) Song)
//Fourth .replace(): Edge case for Main Title Theme - Elmer Bernstein with subtitle (Ghostbusters)
//Fifth .replace(): Edge case for End Credits - Jurassic Park with /Soundtrack appended, categorized as "End Credits - Jurassic Park"
//Sixth .replace(): Edge case for Christmas Eve/Sarajevo (12/24) - Trans-Siberian Orchestra due to limits with forward slashes in queries
//Seventh .replace(): Edge case for Captain Underpants Theme Song - "Weird Al" Yankovic, categorized simply as "Captain Underpants"
//Eighth .replace(): Edge case for "Party In the CIA" - "Weird Al" Yankovic, categorized as "Party In the C.I.A."
//Ninth .replace(): Edge case for "100s and Hope" - Xavier Wulf, categorized as "100s & Hope"
module.exports =  function refine(title){
    let newCredit = title
        .replace(/\(So.*\)/g, "")
        .replace(/\(DRAM.*\)/g, "")
        .replace(/\(The Official.*\)/g, "")
        .replace(/(Ghostbusters)/g, "")
        .replace(/\/Soundtrack/g, "")
        .replace("Christmas Eve  Sarajevo", "Christmas Eve Sarajevo  12 24 ")
        .replace("Captain Underpants Theme Song", "Captain Underpants")
        .replace("Party In the CIA", "Party in the C.I.A.")
        .replace("100s and Hope", "100s & Hope");
        
    return newCredit;    
}
    

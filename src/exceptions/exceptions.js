
//First .replace():  Edge case for Helena (So Long & Good Night), categoried simply as Helena at Genius.com

module.exports =  function refine(title){
    let newCredit = title
        .replace(/\(So.*\)/g, "");

    return newCredit;    
}
    

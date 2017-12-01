import React, {Component} from 'react';

//Spotify API implementation
//https://developer.spotify.com/technologies/widgets/spotify-play-button/
//Song playing will have onClick={()=>this.props.setTone(arr[i].index)}
//id play-button
class searchList extends Component{
    constructor(){
        super();

        this.clickHandler = this.clickHandler.bind(this);
    }
    
    // componentDidMount(){
            

            
    //       //  document.getElementById("play-button").addEventListener("click", this.clickHandler);  
            

    // }
    componentDidUpdate(){

        if(document.getElementById("play-button"))
        {
            alert("good morrow");
        }
        else{
            alert("good day");
        }
        // console.log(document.getElementById("play-button").innerHTML);

    }

    // componentWillUnmount(){
    //     document.getElementById("fun").removeEventListener("click", this.clickHandler);
    // }
    clickHandler(event){
        alert("hello");
    }

    render(){

        let songData = this.props.searchResults.map((el,index,array)=>{
            return (
            <div className="musicBox flexContainer">
                <div className="flexContainer">
                    <div className="flexColumn">        
                        <iframe src={"https://open.spotify.com/embed?uri=" + this.props.searchResults[index].uri}
                            frameorder="0" allowtransparency="true" height="80px" width="100%"></iframe>    
                        <button onClick={()=>this.props.inputTone(this.props.searchResults[index].name, this.props.searchResults[index].artists, this.props.searchResults[index].id)}>submit</button>
                    </div>
                </div>
            </div>
        )});
        return(

            <div>
            {songData}
            </div>
        )
    }
}

export default searchList;
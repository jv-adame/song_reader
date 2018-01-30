import React, {Component} from 'react';
import watson from "../images/watson.png";

class searchList extends Component{

    render(){

        let songData = this.props.searchResults.map((el,index,array)=>{

            return (
            <div className=" flexContainer">
                <div className="flexContainer musicBox">                          
                        <iframe ref={"music" + index} src={"https://open.spotify.com/embed?uri=" + this.props.searchResults[index].uri}
                            frameorder="0" allowtransparency="true" height="80px" width="100%"></iframe> 
                        <div className="watsonContainer">   
                            <img className="imgClick iconImg" src={watson} alt="genius" onClick={()=>this.props.inputTone(this.props.searchResults[index].name, this.props.searchResults[index].artists, this.props.searchResults[index].id)}/>
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
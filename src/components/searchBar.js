import React, {Component} from 'react';
import searchIcon from "../images/search_icon.png"

class SearchBar extends React.Component{
        
        noRefreshEVER=(event)=>{
            event.preventDefault();
        }
    
        render(){
            return(
                <div className="flexContainer searchContainer iconTray">
                    <div>
                    <img className="imgClick iconImg" src={searchIcon} alt="search" onClick={()=> this.props.search(this.refs.searchInput.value)}/>
                    </div>

                    <form className="searchForm" onSubmit={this.noRefreshEVER}>
                        <p>Search for an Artist or Song</p>
                        <button style={{display:"none"}} onClick={()=> this.props.search(this.refs.searchInput.value)}>Search</button> 
                        <input className="searchBar" ref="searchInput" type="text" placeholder=" Start Typing"/>
                    </form>
                </div>
            )
        }
    }
export default SearchBar
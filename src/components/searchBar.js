import React, {Component} from 'react';

class SearchBar extends React.Component{
    
        
        noRefreshEVER=(event)=>{
            event.preventDefault();

        }
    
        render(){
            return(
                <form onSubmit={this.noRefreshEVER}>
                    <input className="searchBar" ref="searchInput" type="text" />
                    <button className="searchButton" onClick={()=> this.props.search(this.refs.searchInput.value)}>Search</button> 
                </form>

            )
        }
    }
export default SearchBar
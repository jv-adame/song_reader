import React, {Component} from 'react';


class SearchBar extends React.Component{
        
        noRefreshEVER=(event)=>{
            event.preventDefault();
        }
    
        render(){
            return(
                <div>
                    <form className="searchForm" onSubmit={this.noRefreshEVER}>
                        <input className="searchBar" ref="searchInput" type="text" />
                        <button className="searchButton" onClick={()=> this.props.search(this.refs.searchInput.value)}>Search</button> 
                        <img src="../images/search_icon.png"/>
                    </form>
                </div>
            )
        }
    }
export default SearchBar